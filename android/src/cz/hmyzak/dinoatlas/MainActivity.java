package cz.hmyzak.dinoatlas;

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
