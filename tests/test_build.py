import json
from pathlib import Path
import shutil
import tempfile
import unittest
import xml.etree.ElementTree as ET

import build_android as build


class BuildTests(unittest.TestCase):
    def test_version_order_and_invalid_inputs(self):
        self.assertEqual(build.version_floor('0.8.0'), 80000)
        self.assertEqual(build.version_floor('0.8.0.1'), 80001)
        self.assertGreater(build.version_floor('0.8.1'), 80001)
        for version in ['0.8.100', '-1.0', '0.8.0-extra', '1', '0.0.0', '9999.1']:
            with self.subTest(version=version), self.assertRaises(ValueError):
                build.version_floor(version)

    def test_metadata_and_html_contract(self):
        config, db, images = build.validate_inputs()
        self.assertEqual(config['versionCode'], 80001)
        self.assertEqual(len(images), len(db['dinosaurs']))
        page = (build.ROOT/'index.html').read_text()
        with self.assertRaisesRegex(ValueError, 'Incomplete'):
            build.validate_markup(page.split('</body>')[0])
        with self.assertRaisesRegex(ValueError, 'Duplicate IDs'):
            build.validate_markup(page.replace('</body>', '<div id="gallery"></div></body>'))
        rendered = build.render_page(page, '0.8.0', 80001)
        self.assertIn('Android · 0.8.0 · build 80001', rendered)
        self.assertEqual(rendered.replace('Android · 0.8.0 · build 80001', 'Ukázková verze · 0.8.0'), page)

    def test_native_manifest_contract(self):
        baseline = json.loads((build.ROOT/'tests/fixtures/verified-0.8.0.json').read_text())
        def normalized(node):
            return {'tag':node.tag, 'attributes':dict(sorted(node.attrib.items())), 'children':[normalized(c) for c in node]}
        self.assertEqual(normalized(ET.parse(build.ROOT/'android/AndroidManifest.xml').getroot()), baseline['manifest'])

    def test_duplicate_json_keys_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            file = Path(d)/'data.json'
            file.write_text('{"schemaVersion":1,"schemaVersion":2}')
            with self.assertRaisesRegex(ValueError, 'Duplicate JSON key'):
                build.strict_json(file)

    def test_backwards_version_code_rejected_before_sdk(self):
        with self.assertRaisesRegex(ValueError, 'must not go backwards'):
            build.main(['--check','--version-code','80000'])
        with self.assertRaisesRegex(ValueError, 'project.json'):
            build.main(['--check','--version','0.5.0'])

    def test_asset_failures_stop_before_packaging(self):
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            for name in [*build.WEB_FILES, 'project.json', 'android/AndroidManifest.xml', build.JAVA_PATH]:
                target = root/name
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(build.ROOT/name, target)
            db = json.loads((root/'dinosaurs.json').read_text())
            db['dinosaurs'] = db['dinosaurs'][:1]
            name = db['dinosaurs'][0]['image']['src']
            target = root/name
            target.parent.mkdir(parents=True)
            shutil.copyfile(build.ROOT/name, target)
            (root/'dinosaurs.json').write_text(json.dumps(db))
            build.validate_inputs(root)
            extra = root/'images/app.js'
            extra.write_text('obsolete copy')
            with self.assertRaisesRegex(ValueError, 'only referenced artwork'):
                build.validate_inputs(root)
            extra.unlink()
            image = target.read_bytes()
            target.write_bytes(image[:-10])
            with self.assertRaisesRegex(ValueError, 'truncated WebP'):
                build.validate_inputs(root)
            target.write_bytes(image)
            db['dinosaurs'][0]['image']['src'] = 'images/../project.json'
            (root/'dinosaurs.json').write_text(json.dumps(db))
            with self.assertRaisesRegex(ValueError, 'Invalid atlas image path'):
                build.validate_inputs(root)


if __name__ == '__main__':
    unittest.main()
