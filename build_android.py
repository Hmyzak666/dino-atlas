#!/usr/bin/env python3
"""Build the small offline Android shell using the official Android SDK tools.

The web files at the repository root are the single source of atlas content.
No Gradle, network access or Android support libraries needed. A small local
JavaScript interface exposes only Czech text-to-speech and its stop control.
Signing keys are provided separately through environment variables, never Git.
"""
import argparse
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parent
APP_ID = 'cz.hmyzak.dinoatlas'
JAVA_SOURCE = r'''package cz.hmyzak.dinoatlas;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.WebChromeClient;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Locale;
import java.util.Set;
import org.json.JSONObject;

public final class MainActivity extends Activity {
    private static final String HOST = "appassets.androidplatform.net";
    private static final String START = "https://" + HOST + "/assets/index.html#atlas";
    private WebView atlas;
    private final Handler ui = new Handler(Looper.getMainLooper());
    private TextToSpeech reader;
    private boolean readerReady;
    private boolean readerStarting;
    private boolean destroyed;
    private String pendingText = "";
    private String activeRead = "";

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        final FrameLayout frame = new FrameLayout(this);
        frame.setBackgroundColor(Color.rgb(16, 34, 28));
        atlas = new WebView(this);
        atlas.setBackgroundColor(Color.rgb(247, 244, 236));
        frame.addView(atlas, new FrameLayout.LayoutParams(-1, -1));
        setContentView(frame);

        // Keep content outside system bars and cutouts, including Android 15+.
        if (Build.VERSION.SDK_INT >= 30) {
            getWindow().setDecorFitsSystemWindows(false);
        } else {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
        }
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        frame.setOnApplyWindowInsetsListener((view, insets) -> {
            if (Build.VERSION.SDK_INT >= 30) {
                Insets safe = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                view.setPadding(safe.left, safe.top, safe.right, safe.bottom);
            } else {
                view.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(),
                    insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            }
            return insets;
        });
        frame.requestApplyInsets();

        WebSettings settings = atlas.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setSupportMultipleWindows(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setUserAgentString(settings.getUserAgentString() + " DinoAtlas/__VERSION__");
        if (Build.VERSION.SDK_INT >= 33) settings.setAlgorithmicDarkeningAllowed(false);
        atlas.setWebChromeClient(new WebChromeClient());
        // Only packaged, escaped application content can reach this interface.
        // External resources and navigations are blocked below.
        atlas.addJavascriptInterface(new SpeechBridge(), "DinoSpeech");
        atlas.setWebViewClient(new WebViewClient() {
            @Override public void onPageStarted(WebView view, String url, Bitmap icon) {
                stopReading();
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (!isLocal(uri)) return response(403, "Forbidden", "Blocked resource");
                String path = uri.getPath().substring("/assets/".length());
                if (path.length() == 0 || path.contains("..") || path.contains("\\") || path.indexOf('\0') >= 0) {
                    return response(404, "Not Found", "Not found");
                }
                try {
                    InputStream stream = getAssets().open(path);
                    Map<String,String> headers = new HashMap<>();
                    headers.put("Cache-Control", "no-store");
                    headers.put("X-Content-Type-Options", "nosniff");
                    String mime = mimeType(path);
                    String charset = mime.startsWith("text/") || mime.equals("application/json")
                        || mime.equals("application/javascript") ? "UTF-8" : null;
                    return new WebResourceResponse(mime, charset, 200, "OK", headers, stream);
                } catch (IOException missing) {
                    return response(404, "Not Found", "Not found");
                }
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return !isLocal(request.getUrl());
            }
        });
        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT, new OnBackInvokedCallback() {
                    @Override public void onBackInvoked() { goBackOrFinish(); }
                });
        }
        if (state == null || atlas.restoreState(state) == null) atlas.loadUrl(START);
    }

    public final class SpeechBridge {
        @JavascriptInterface public void read(String text, String requestId) {
            ui.post(() -> readAloud(text, requestId));
        }
        @JavascriptInterface public void stop() {
            ui.post(() -> stopReading());
        }
    }

    private void speechEvent(String requestId, String state, String message) {
        if (destroyed || atlas == null || requestId.isEmpty()) return;
        String detail = "{requestId:" + JSONObject.quote(requestId)
            + ",state:" + JSONObject.quote(state) + ",message:" + JSONObject.quote(message) + "}";
        atlas.evaluateJavascript("window.dispatchEvent(new CustomEvent('dinoatlas-speech',{detail:"
            + detail + "}));", null);
    }

    private void readAloud(String text, String requestId) {
        if (destroyed || isFinishing() || atlas == null || atlas.getUrl() == null
            || !isLocal(Uri.parse(atlas.getUrl())) || requestId == null
            || !requestId.matches("read-[0-9]{1,12}")) return;
        stopReading();
        activeRead = requestId;
        if (text == null || text.trim().isEmpty()
            || text.length() > TextToSpeech.getMaxSpeechInputLength()) {
            speechFailed("Tuto část teď nelze přečíst. Zkus kratší část textu.");
            return;
        }
        pendingText = text;
        speechEvent(activeRead, "loading", "Připravuji české čtení…");
        if (readerReady) {
            speakPending();
        } else if (!readerStarting) {
            readerStarting = true;
            // Always post: a failed initialization may call back synchronously.
            try {
              reader = new TextToSpeech(getApplicationContext(), status -> ui.post(() -> {
                if (destroyed) return;
                readerStarting = false;
                readerReady = status == TextToSpeech.SUCCESS && reader != null;
                if (!readerReady) {
                    if (reader != null) reader.shutdown();
                    reader = null;
                    speechFailed("V telefonu není dostupné čtení nahlas. Zkontroluj nastavení převodu textu na řeč.");
                    return;
                }
                reader.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override public void onStart(String id) {
                        ui.post(() -> {
                            if (id.equals(activeRead)) speechEvent(id, "reading", "Čte se…");
                        });
                    }
                    @Override public void onDone(String id) {
                        ui.post(() -> {
                            if (id.equals(activeRead)) {
                                activeRead = "";
                                speechEvent(id, "done", "Dočteno.");
                            }
                        });
                    }
                    @Override public void onError(String id) {
                        ui.post(() -> {
                            if (id.equals(activeRead)) speechFailed("Čtení se nepodařilo. Zkontroluj český hlas v nastavení telefonu.");
                        });
                    }
                });
                speakPending();
              }));
            } catch (RuntimeException unavailable) {
                readerStarting = false;
                readerReady = false;
                reader = null;
                speechFailed("Čtení není dostupné. Zkontroluj nastavení převodu textu na řeč v telefonu.");
            }
        }
    }

    private void speakPending() {
        if (destroyed || !readerReady || reader == null || activeRead.isEmpty() || pendingText.isEmpty()) return;
        try {
            Locale czech = new Locale("cs", "CZ");
            if (reader.isLanguageAvailable(czech) < TextToSpeech.LANG_AVAILABLE) {
                speechFailed("Pro čtení chybí český hlas. Stáhni češtinu v nastavení převodu textu na řeč v telefonu.");
                return;
            }
            reader.setLanguage(czech);
            Voice chosen = null;
            Set<Voice> voices = reader.getVoices();
            if (voices != null) for (Voice voice : voices) {
                Set<String> features = voice.getFeatures();
                if (!"cs".equals(voice.getLocale().getLanguage()) || voice.isNetworkConnectionRequired()
                    || (features != null && features.contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED))) continue;
                if (chosen == null || voice.getQuality() > chosen.getQuality()
                    || (voice.getQuality() == chosen.getQuality() && voice.getName().compareTo(chosen.getName()) < 0)) chosen = voice;
            }
            if (chosen == null || reader.setVoice(chosen) != TextToSpeech.SUCCESS) {
                speechFailed("Chybí stažený český hlas pro čtení bez internetu. Doinstaluj ho v nastavení převodu textu na řeč.");
                return;
            }
            reader.setSpeechRate(0.92f);
            reader.setPitch(1.0f);
            String text = pendingText;
            pendingText = "";
            if (reader.speak(text, TextToSpeech.QUEUE_FLUSH, null, activeRead) == TextToSpeech.ERROR) {
                speechFailed("Čtení se nepodařilo spustit. Zkontroluj český hlas v nastavení telefonu.");
            }
        } catch (RuntimeException unavailable) {
            speechFailed("Čtení teď není dostupné. Zkontroluj nastavení českého hlasu v telefonu.");
        }
    }

    private void speechFailed(String message) {
        String id = activeRead;
        activeRead = "";
        pendingText = "";
        if (reader != null) reader.stop();
        speechEvent(id, "error", message);
    }

    private void stopReading() {
        String id = activeRead;
        activeRead = "";
        pendingText = "";
        if (reader != null) reader.stop();
        speechEvent(id, "idle", "Čtení zastaveno.");
    }

    private static boolean isLocal(Uri uri) {
        return "https".equals(uri.getScheme()) && HOST.equals(uri.getHost())
            && (uri.getPort() == -1 || uri.getPort() == 443)
            && uri.getPath() != null && uri.getPath().startsWith("/assets/");
    }
    private static String mimeType(String path) {
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".js")) return "application/javascript";
        if (path.endsWith(".json")) return "application/json";
        if (path.endsWith(".webp")) return "image/webp";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
        if (path.endsWith(".svg")) return "image/svg+xml";
        return "application/octet-stream";
    }
    private static WebResourceResponse response(int status, String reason, String text) {
        return new WebResourceResponse("text/plain", "UTF-8", status, reason, null,
            new ByteArrayInputStream(text.getBytes(StandardCharsets.UTF_8)));
    }
    private void goBackOrFinish() {
        if (atlas.canGoBack()) atlas.goBack(); else finish();
    }
    @Override public void onBackPressed() { goBackOrFinish(); }
    @Override protected void onSaveInstanceState(Bundle state) {
        atlas.saveState(state);
        super.onSaveInstanceState(state);
    }
    @Override protected void onPause() {
        stopReading();
        super.onPause();
    }
    @Override protected void onDestroy() {
        destroyed = true;
        ui.removeCallbacksAndMessages(null);
        pendingText = "";
        activeRead = "";
        if (reader != null) {
            reader.stop();
            reader.shutdown();
            reader = null;
        }
        if (atlas != null) {
            atlas.removeJavascriptInterface("DinoSpeech");
            ((FrameLayout)atlas.getParent()).removeView(atlas);
            atlas.stopLoading();
            atlas.destroy();
        }
        super.onDestroy();
    }
}
'''

ICON_PATH = 'M20,29 L34,29 C49,29 55,39 55,54 C55,69 49,79 34,79 L20,79 Z M29,38 L29,70 L34,70 C42,70 46,64 46,54 C46,44 42,38 34,38 Z M57,79 L73,29 L84,29 L100,79 L90,79 L87,68 L70,68 L67,79 Z M72,59 L84,59 L78,39 Z'

class AtlasMarkup(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.duplicate_ids = set()
        self.closed_tags = set()

    def handle_starttag(self, tag, attributes):
        for name, value in attributes:
            if name == 'id' and value:
                if value in self.ids:
                    self.duplicate_ids.add(value)
                self.ids.add(value)

    def handle_endtag(self, tag):
        self.closed_tags.add(tag)

def validate_markup(page):
    """Fail before packaging when a phone copy/paste has cut off the page."""
    parser = AtlasMarkup()
    parser.feed(page)
    parser.close()
    required = {
        'theme-color', 'theme-toggle', 'main', 'load-state', 'atlas-view',
        'atlas-title', 'search', 'period-filters', 'diet-filter',
        'favorites-filter', 'favorites-count', 'random-button', 'result-count',
        'gallery', 'empty-state', 'clear-filters', 'detail-view', 'quiz-view',
        'quiz-title', 'quiz-content', 'not-found', 'toast'
    }
    missing = sorted(required - parser.ids)
    if missing or not {'body', 'html'}.issubset(parser.closed_tags):
        detail = ', '.join(missing) if missing else 'ukončení stránky'
        raise SystemExit('Neúplný index.html: chybí ' + detail
                         + '. Nahraj celý původní soubor; sestavení bylo zastaveno.')
    if parser.duplicate_ids:
        raise SystemExit('Opakovaná ID v index.html: ' + ', '.join(sorted(parser.duplicate_ids)))

def run(arguments, **kwargs):
    subprocess.run([str(x) for x in arguments], check=True, **kwargs)

def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')

def version_floor(version):
    """Keep local APKs and GitHub builds ordered by their public version."""
    parts = [int(part) for part in version.split('.')]
    if any(part > 99 for part in parts[1:]):
        raise SystemExit('Minor, patch and revision versions must be at most 99.')
    parts += [0] * (4-len(parts))
    return parts[0]*1000000 + parts[1]*10000 + parts[2]*100 + parts[3]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--version', default='0.4.0')
    parser.add_argument('--version-code', type=int, default=1)
    args = parser.parse_args()
    if not re.fullmatch(r'[0-9]+(?:\.[0-9]+){1,3}', args.version) or args.version_code < 1:
        raise SystemExit('Invalid Android version.')
    args.version_code = max(args.version_code, version_floor(args.version))
    if not 1 <= args.version_code <= 2100000000:
        raise SystemExit('Invalid Android version.')
    sdk_text = os.environ.get('ANDROID_SDK_ROOT') or os.environ.get('ANDROID_HOME')
    if not sdk_text:
        raise SystemExit('Android SDK is missing. Run the Android APK workflow on GitHub.')
    sdk = Path(sdk_text)
    tools = sdk/'build-tools'/'35.0.1'
    platform = sdk/'platforms'/'android-35'/'android.jar'
    if not (tools/'aapt2').is_file() or not platform.is_file():
        raise SystemExit('Install platforms;android-35 and build-tools;35.0.1 first.')
    key_text = os.environ.get('DINO_KEYSTORE_PATH')
    if not key_text or not Path(key_text).is_file() or not os.environ.get('DINO_STORE_PASSWORD') or not os.environ.get('DINO_KEY_PASSWORD'):
        raise SystemExit('Private signing key is missing. Follow ANDROID.md; never commit the key to Git.')
    output = Path(os.environ.get('DINO_OUTPUT_DIR', str(ROOT/'build-android'))).resolve()
    output.mkdir(parents=True, exist_ok=True)
    work = output/'work'
    if work.exists(): shutil.rmtree(work)
    assets, res, classes, dex = (work/name for name in ('assets', 'res', 'classes', 'dex'))
    for folder in (assets, res, classes, dex): folder.mkdir(parents=True, exist_ok=True)

    validate_markup((ROOT/'index.html').read_text(encoding='utf-8'))
    db = json.loads((ROOT/'dinosaurs.json').read_text(encoding='utf-8'))
    for name in ('index.html','style.css','app.js','dinosaurs.json'):
        shutil.copy2(ROOT/name, assets/name)
    for dino in db['dinosaurs']:
        name = dino['image']['src']
        if not re.fullmatch(r'images/[a-z0-9-]+\.(?:webp|png|jpg|jpeg)', name):
            raise SystemExit('Invalid atlas image path.')
        destination = assets/name
        destination.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(ROOT/name, destination)
    # Shared web UI; only its packaged footer identifies this APK build.
    page = (assets/'index.html').read_text(encoding='utf-8')
    page, footer_count = re.subn(r'Ukázková verze · [0-9.]+',
                                f'Android · {args.version} · build {args.version_code}', page)
    if footer_count != 1:
        raise SystemExit('V index.html chybí jednoznačné označení verze aplikace.')
    (assets/'index.html').write_text(page,encoding='utf-8')

    manifest = f'''<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="{APP_ID}" android:versionCode="{args.version_code}" android:versionName="{args.version}">
  <uses-sdk android:minSdkVersion="26" android:targetSdkVersion="35"/>
  <queries><intent><action android:name="android.intent.action.TTS_SERVICE"/></intent></queries>
  <application android:label="Dino Atlas" android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher" android:theme="@style/AppTheme" android:allowBackup="false" android:supportsRtl="true" android:usesCleartextTraffic="false" android:enableOnBackInvokedCallback="true">
    <activity android:name=".MainActivity" android:exported="true" android:configChanges="orientation|screenSize|keyboardHidden|uiMode">
      <intent-filter><action android:name="android.intent.action.MAIN"/><category android:name="android.intent.category.LAUNCHER"/></intent-filter>
    </activity>
  </application>
</manifest>'''
    write(work/'AndroidManifest.xml', manifest)
    write(res/'values'/'styles.xml', '''<resources>
  <color name="icon_bg">#27533F</color>
  <style name="AppTheme" parent="android:style/Theme.Material.Light.NoActionBar">
    <item name="android:windowLightStatusBar">false</item>
    <item name="android:windowLightNavigationBar">false</item>
    <item name="android:forceDarkAllowed">false</item>
    <item name="android:windowActionModeOverlay">true</item>
    <item name="android:colorAccent">#27533F</item>
    <item name="android:windowBackground">#10221C</item>
  </style>
</resources>''')
    write(res/'drawable'/'icon_foreground.xml', f'''<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="120" android:viewportHeight="108">
  <path android:fillColor="#F7F4EC" android:fillType="evenOdd" android:pathData="{ICON_PATH}"/>
</vector>''')
    write(res/'mipmap-anydpi-v26'/'ic_launcher.xml', '''<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
  <background android:drawable="@color/icon_bg"/>
  <foreground android:drawable="@drawable/icon_foreground"/>
</adaptive-icon>''')
    source = work/'src'/'cz'/'hmyzak'/'dinoatlas'/'MainActivity.java'
    write(source, JAVA_SOURCE.replace('__VERSION__', args.version))
    run([tools/'aapt2','compile','--dir',res,'-o',work/'resources.zip'])
    unsigned = work/'atlas-unsigned.apk'
    run([tools/'aapt2','link','-o',unsigned,'-I',platform,'--manifest',work/'AndroidManifest.xml','-A',assets,work/'resources.zip'])
    compiler = [shutil.which('javac')] if shutil.which('javac') else ['java','-m','jdk.compiler/com.sun.tools.javac.Main']
    run([*compiler,'-encoding','UTF-8','-source','8','-target','8','-classpath',platform,'-d',classes,source])
    bytecode = sorted(classes.rglob('*.class'))
    run([tools/'d8','--lib',platform,'--min-api','26','--output',dex,*bytecode])
    with ZipFile(unsigned,'a',ZIP_DEFLATED) as archive:
        for file in sorted(dex.glob('*.dex')): archive.write(file,file.name)
    aligned = work/'atlas-aligned.apk'
    run([tools/'zipalign','-f','-p','4',unsigned,aligned])
    apk = output/f'Dino-Atlas-v{args.version}.apk'
    run([tools/'apksigner','sign','--ks',key_text,'--ks-key-alias','dinoatlas',
         '--ks-pass','env:DINO_STORE_PASSWORD','--key-pass','env:DINO_KEY_PASSWORD','--out',apk,aligned])
    run([tools/'apksigner','verify','--verbose',apk])
    run([tools/'zipalign','-c','-p','4',apk])
    with ZipFile(apk) as archive:
        assert archive.testzip() is None
        assert 'classes.dex' in archive.namelist()
        assert len([name for name in archive.namelist() if name.startswith('assets/images/')]) == len(db['dinosaurs'])
    print(f'APK ready: {apk} ({apk.stat().st_size} bytes)')

if __name__ == '__main__': main()
