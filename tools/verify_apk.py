"""Verify the compiled APK against canonical sources, identity and pinned signer."""
import json
from pathlib import Path
import re
import subprocess
import xml.etree.ElementTree as ET
from zipfile import ZipFile


def verify_apk(apk, root, version, code, build_tools, signed=True):
    root, apk = Path(root), Path(apk)
    config = json.loads((root/'project.json').read_text())
    manifest = ET.parse(root/'android/AndroidManifest.xml').getroot()
    ns = '{http://schemas.android.com/apk/res/android}'
    badging = subprocess.check_output([str(build_tools/'aapt2'), 'dump', 'badging', str(apk)], text=True)
    package = re.search(r"package: name='([^']+)' versionCode='([^']+)' versionName='([^']+)'", badging)
    expected = (manifest.attrib['package'], str(code), version)
    if not package or package.groups() != expected:
        raise ValueError('APK identity/version does not match the project.')
    sdk = manifest.find('uses-sdk')
    for field, tag in [('minSdkVersion', 'minSdkVersion'), ('targetSdkVersion', 'targetSdkVersion')]:
        if f"{tag}:'{sdk.attrib[ns+field]}'" not in badging:
            raise ValueError('APK SDK contract changed: ' + field)
    expected_permissions = {n.attrib[ns+'name'] for n in manifest.findall('uses-permission')}
    actual_permissions = set(re.findall(r"uses-permission: name='([^']+)'", badging))
    if actual_permissions != expected_permissions:
        raise ValueError('APK permissions do not match the manifest.')
    db = json.loads((root/'dinosaurs.json').read_text())
    names = ['index.html', 'style.css', 'app.js', 'dinosaurs.json'] + [a['image']['src'] for a in db['dinosaurs']]
    with ZipFile(apk) as archive:
        if archive.testzip() is not None or 'classes.dex' not in archive.namelist():
            raise ValueError('Damaged APK or missing native bytecode.')
        assets = {p for p in archive.namelist() if p.startswith('assets/') and not p.endswith('/')}
        if assets != {'assets/'+name for name in names}:
            raise ValueError('APK asset allowlist differs from the database.')
        for name in names:
            expected_bytes = (root/name).read_bytes()
            if name == 'index.html':
                expected_bytes, changed = re.subn(rb'Uk\xc3\xa1zkov\xc3\xa1 verze \xc2\xb7 [0-9.]+', f'Android · {version} · build {code}'.encode(), expected_bytes)
                if changed != 1:
                    raise ValueError('Missing canonical version footer.')
            if archive.read('assets/'+name) != expected_bytes:
                raise ValueError('APK asset differs from source: ' + name)
    subprocess.run([str(build_tools/'zipalign'), '-c', '-p', '4', str(apk)], check=True)
    if signed:
        report = subprocess.check_output([str(build_tools/'apksigner'), 'verify', '--verbose', '--print-certs', str(apk)], text=True)
        certificates = re.findall(r'Signer #\d+ certificate SHA-256 digest: ([a-f0-9]+)', report)
        if certificates != [config['android']['certificateSha256']]:
            raise ValueError('Wrong signing certificate: this APK cannot update the installed release.')
        if 'Verified using v2 scheme (APK Signature Scheme v2): true' not in report:
            raise ValueError('APK Signature Scheme v2 verification failed.')
    print(f'APK verified: {len(db["dinosaurs"])} animals, exact source assets, identity {expected[0]}, build {code}, ' + ('original signer.' if signed else 'unsigned compilation check.'))
