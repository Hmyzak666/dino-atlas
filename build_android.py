#!/usr/bin/env python3
"""Build the offline app with the official Android SDK, without Gradle.

project.json owns release metadata; android/ owns the native shell.
Only the four root web files and database-referenced images enter the APK.
"""
import argparse
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent
ANDROID_NS = 'http://schemas.android.com/apk/res/android'
WEB_FILES = ('index.html', 'style.css', 'app.js', 'dinosaurs.json')
JAVA_PATH = 'android/src/cz/hmyzak/dinoatlas/MainActivity.java'


def strict_json(path):
    def unique(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError(f'Duplicate JSON key: {key}')
            result[key] = value
        return result
    return json.loads(Path(path).read_text(encoding='utf-8'), object_pairs_hook=unique)


def version_floor(version):
    if not isinstance(version, str) or not re.fullmatch(r'[0-9]+(?:\.[0-9]+){1,3}', version):
        raise ValueError('Invalid version; use two to four numeric parts.')
    parts = [int(part) for part in version.split('.')]
    if any(part > 99 for part in parts[1:]):
        raise ValueError('Minor, patch and revision versions must be at most 99.')
    parts += [0] * (4 - len(parts))
    result = parts[0]*1000000 + parts[1]*10000 + parts[2]*100 + parts[3]
    if not 1 <= result <= 2100000000:
        raise ValueError('Version code is outside the Android range.')
    return result


def load_project(root=ROOT):
    config = strict_json(root/'project.json')
    minimum = version_floor(config['version'])
    code = config['versionCode']
    if type(code) is not int or not minimum <= code <= 2100000000:
        raise ValueError('project.json versionCode must be an integer at or above its version floor.')
    android = config['android']
    if type(android['platform']) is not int or android['platform'] < 26:
        raise ValueError('Invalid Android platform.')
    if not re.fullmatch(r'[0-9]+\.[0-9]+\.[0-9]+', android['buildTools']):
        raise ValueError('Invalid Android build-tools version.')
    if not re.fullmatch(r'[a-f0-9]{64}', android['certificateSha256']):
        raise ValueError('A pinned signing certificate is required.')
    return config


class AtlasMarkup(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.duplicate_ids, self.closed_tags = set(), set(), set()

    def handle_starttag(self, tag, attributes):
        for name, value in attributes:
            if name == 'id' and value:
                if value in self.ids:
                    self.duplicate_ids.add(value)
                self.ids.add(value)

    def handle_endtag(self, tag):
        self.closed_tags.add(tag)


def validate_markup(page):
    parser = AtlasMarkup()
    parser.feed(page)
    parser.close()
    required = {'theme-color', 'theme-toggle', 'main', 'load-state', 'atlas-view',
                'atlas-title', 'search', 'period-filters', 'diet-filter',
                'favorites-filter', 'favorites-count', 'random-button', 'result-count',
                'gallery', 'empty-state', 'clear-filters', 'detail-view', 'quiz-view',
                'quiz-title', 'quiz-content', 'not-found', 'toast'}
    missing = sorted(required - parser.ids)
    if missing or not {'body', 'html'}.issubset(parser.closed_tags):
        raise ValueError('Incomplete index.html: ' + (', '.join(missing) or 'closing tags missing'))
    if parser.duplicate_ids:
        raise ValueError('Duplicate IDs in index.html: ' + ', '.join(sorted(parser.duplicate_ids)))


def render_page(page, version, code):
    result, count = re.subn(r'Ukázková verze · [0-9.]+', f'Android · {version} · build {code}', page)
    if count != 1:
        raise ValueError('index.html must contain one version footer.')
    return result


def validate_inputs(root=ROOT):
    config = load_project(root)
    page = (root/'index.html').read_text(encoding='utf-8')
    validate_markup(page)
    if re.findall(r'Ukázková verze · ([0-9.]+)', page) != [config['version']]:
        raise ValueError('The web footer and project.json release version disagree.')
    for name in WEB_FILES:
        if not (root/name).is_file():
            raise ValueError(f'Missing active source: {name}')
    db = strict_json(root/'dinosaurs.json')
    if db.get('schemaVersion') != 1 or not db.get('dinosaurs'):
        raise ValueError('Invalid animal database.')
    ids, images = set(), set()
    for animal in db['dinosaurs']:
        identifier, name = animal['id'], animal['image']['src']
        if identifier in ids or name in images:
            raise ValueError('Duplicate animal ID or image reference.')
        ids.add(identifier)
        if not re.fullmatch(r'images/[a-z0-9-]+\.(webp|png|jpg|jpeg)', name):
            raise ValueError('Invalid atlas image path: ' + name)
        file = root/name
        if not file.resolve().is_relative_to(root.resolve()) or not file.is_file():
            raise ValueError('Missing or external atlas image: ' + name)
        data = file.read_bytes()
        if file.suffix == '.webp':
            if len(data) < 20 or data[:4] != b'RIFF' or data[8:12] != b'WEBP' or int.from_bytes(data[4:8], 'little') + 8 != len(data):
                raise ValueError('Invalid or truncated WebP image: ' + name)
        elif file.suffix == '.png':
            if not data.startswith(b'\x89PNG\r\n\x1a\n'):
                raise ValueError('Invalid PNG image: ' + name)
        elif not (data.startswith(b'\xff\xd8') and data.endswith(b'\xff\xd9')):
            raise ValueError('Invalid JPEG image: ' + name)
        images.add(name)
    actual = {str(p.relative_to(root)) for p in (root/'images').rglob('*') if p.is_file()}
    if images != actual:
        raise ValueError('images/ must contain only referenced artwork: ' + ', '.join(sorted(actual ^ images)))
    manifest = ET.parse(root/'android/AndroidManifest.xml').getroot()
    java = (root/JAVA_PATH).read_text(encoding='utf-8')
    package = re.search(r'^package ([a-z0-9.]+);', java)
    if not package or package.group(1) != manifest.attrib['package'] or java.count('__VERSION__') != 1:
        raise ValueError('Android package or native version marker is inconsistent.')
    sdk = manifest.find('uses-sdk')
    if int(sdk.attrib[f'{{{ANDROID_NS}}}targetSdkVersion']) > config['android']['platform']:
        raise ValueError('Android platform is below targetSdkVersion.')
    return config, db, sorted(images)


def run(arguments, **kwargs):
    return subprocess.run([str(x) for x in arguments], check=True, **kwargs)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Validate inputs without an SDK or signing key.')
    parser.add_argument('--unsigned', action='store_true', help='Compile for CI without a signing key; not an installable release.')
    parser.add_argument('--version', help='Compatibility argument; must match project.json.')
    parser.add_argument('--version-code', type=int, help='Optional code override, never below the configured release.')
    args = parser.parse_args(argv)
    config, db, images = validate_inputs()
    if args.version and args.version != config['version']:
        raise ValueError('Change the release version in project.json and its web footer; --version cannot select a different release.')
    version = config['version']
    code = args.version_code if args.version_code is not None else max(config['versionCode'], version_floor(version))
    if type(code) is not int or not max(config['versionCode'], version_floor(version)) <= code <= 2100000000:
        raise ValueError('versionCode must not go backwards or fall below the version floor.')
    if args.check:
        print(f'Validated {version} ({code}): {len(db["dinosaurs"])} animals and {len(images)} images.')
        return
    sdk_text = os.environ.get('ANDROID_SDK_ROOT') or os.environ.get('ANDROID_HOME')
    if not sdk_text:
        raise ValueError('Set ANDROID_SDK_ROOT; see ANDROID.md.')
    sdk = Path(sdk_text)
    build_tools = sdk/'build-tools'/config['android']['buildTools']
    platform = sdk/'platforms'/f'android-{config["android"]["platform"]}'/'android.jar'
    for tool in ['aapt2', 'd8', 'zipalign', 'apksigner']:
        if not (build_tools/tool).is_file():
            raise ValueError(f'Missing Android SDK tool: {tool}')
    if not platform.is_file():
        raise ValueError('Missing Android SDK platform; see project.json and ANDROID.md.')
    key = os.environ.get('DINO_KEYSTORE_PATH')
    if not args.unsigned and (not key or not Path(key).is_file() or not os.environ.get('DINO_STORE_PASSWORD') or not os.environ.get('DINO_KEY_PASSWORD')):
        raise ValueError('Original release signing key is required. Never commit it to Git.')
    output = Path(os.environ.get('DINO_OUTPUT_DIR', str(ROOT/'build-android'))).resolve()
    output.mkdir(parents=True, exist_ok=True)
    suffix = '-unsigned' if args.unsigned else ''
    apk = output/f'Dino-Atlas-v{version}-build{code}{suffix}.apk'
    with tempfile.TemporaryDirectory(prefix='work-', dir=output) as tmp:
        work = Path(tmp)
        assets, classes, dex = (work/name for name in ['assets', 'classes', 'dex'])
        for path in [assets, classes, dex]:
            path.mkdir()
        for name in [*WEB_FILES, *images]:
            target = assets/name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(ROOT/name, target)
        (assets/'index.html').write_text(render_page((ROOT/'index.html').read_text(encoding='utf-8'), version, code), encoding='utf-8')
        manifest = ET.parse(ROOT/'android/AndroidManifest.xml')
        ET.register_namespace('android', ANDROID_NS)
        manifest.getroot().set(f'{{{ANDROID_NS}}}versionName', version)
        manifest.getroot().set(f'{{{ANDROID_NS}}}versionCode', str(code))
        manifest_path = work/'AndroidManifest.xml'
        manifest.write(manifest_path, encoding='utf-8', xml_declaration=True)
        res = work/'res'
        shutil.copytree(ROOT/'android/res', res)
        source = work/'src/cz/hmyzak/dinoatlas/MainActivity.java'
        source.parent.mkdir(parents=True)
        source.write_text((ROOT/JAVA_PATH).read_text(encoding='utf-8').replace('__VERSION__', version), encoding='utf-8')
        run([build_tools/'aapt2', 'compile', '--dir', res, '-o', work/'resources.zip'])
        raw = work/'unsigned.apk'
        run([build_tools/'aapt2', 'link', '-o', raw, '-I', platform, '--manifest', manifest_path, '-A', assets, work/'resources.zip'])
        compiler = [shutil.which('javac')] if shutil.which('javac') else ['java', '-m', 'jdk.compiler/com.sun.tools.javac.Main']
        run([*compiler, '-encoding', 'UTF-8', '-source', '8', '-target', '8', '-classpath', platform, '-d', classes, source])
        run([build_tools/'d8', '--lib', platform, '--min-api', '26', '--output', dex, *sorted(classes.rglob('*.class'))])
        with ZipFile(raw, 'a', ZIP_DEFLATED) as archive:
            for file in sorted(dex.glob('*.dex')):
                archive.write(file, file.name)
        aligned = work/'aligned.apk'
        run([build_tools/'zipalign', '-f', '-p', '4', raw, aligned])
        if args.unsigned:
            shutil.copyfile(aligned, apk)
        else:
            run([build_tools/'apksigner', 'sign', '--ks', key, '--ks-key-alias', config['android']['keyAlias'],
                 '--ks-pass', 'env:DINO_STORE_PASSWORD', '--key-pass', 'env:DINO_KEY_PASSWORD', '--out', apk, aligned])
        from tools.verify_apk import verify_apk
        try:
            verify_apk(apk, ROOT, version, code, build_tools, signed=not args.unsigned)
        except Exception:
            apk.unlink(missing_ok=True)
            raise
    print(f'APK ready: {apk} ({apk.stat().st_size} bytes)')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, KeyError) as error:
        raise SystemExit(str(error)) from error
