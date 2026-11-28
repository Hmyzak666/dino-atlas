# Sestavení Dino Atlasu na GitHubu z telefonu

Projekt má připravené workflow **Dino Atlas — kontroly a APK** (`android-apk.yml`). Podporuje ruční spuštění a výběr pracovní větve. Sestavení běží na GitHubu; Bazzite ani místní instalaci Android SDK k tomu nepotřebuješ.

Aktuální zdroje 1.1.0 (1010012) obsahují 266 zvířat a 266 obrázků. Sestavení lze nyní spustit. Zdrojová větev je `feature/paleozoic-1.0.0`; kvůli sestavení se nemusí slučovat do main.

1. V prohlížeči telefonu se přihlas na GitHub jako vlastník repozitáře.
2. Otevři https://github.com/Hmyzak666/dino-atlas/actions/workflows/android-apk.yml.
3. Zvol **Run workflow**.
4. V nabídce **Branch** vyber **feature/paleozoic-1.0.0** a potvrď **Run workflow**. Pokud tlačítko v mobilním zobrazení nevidíš, zkus v prohlížeči zobrazení pro počítač.
5. Otevři právě vytvořený běh. Nejprve proběhnou kontroly obsahu a mobilního rozhraní, potom kompilace a ověření APK.
6. Po úspěchu otevři v dolní části běhu **Artifacts** a stáhni `Dino-Atlas-Android-1.1.0-build...` (číslo se načítá z aktuálního project.json).
7. Rozbal stažený ZIP. Uvnitř je soubor APK, který lze nainstalovat do telefonu jako aktualizaci při shodném podpisu.

Nepoužívej historické workflow **Request signed Dino Atlas 1.0.0 phone-test APK**: má podmínky pro staré sestavení. Pro novou verzi slouží přímo **Dino Atlas — kontroly a APK**.

## Podepsané APK

Ruční sestavení používá již definované repozitářové secrets `ANDROID_KEYSTORE_BASE64` a `ANDROID_KEYSTORE_PASSWORD`. Musí obsahovat původní klíč aplikace. Workflow kontroluje přítomnost obou a build skript ověřuje výsledný certifikát proti project.json. Nejde o nový klíč a není potřeba jej stahovat do telefonu.

Aktuální hodnoty secrets se v tomto kroku nečetly ani neměnily; jejich dostupnost se potvrdí při spuštění. Pokud některý chybí, běh skončí vysvětlením před vytvořením podepsaného APK. Původní klíč se pak obnoví ze zálohy. Samotný návrat k sestavování na Bazzite by chybějící podpisový klíč nevyřešil.

## Co dělat při chybě

Otevři červený krok konkrétního nového běhu. Zobrazí se, zda selhal test, kompilace nebo podpis. Neslučuj kvůli tomu větev do main a neodinstalovávej stávající aplikaci. Nové sestavení vyžaduje nový Run workflow; opakování starého běhu používá jeho starý commit.

Sestavení pracovní větve se spouští ručně. U verze 1010012 prošly místní testy obsahu i mobilního rozhraní v Chromiu. GitHub Actions je zopakuje před kompilací.

Oficiální postup: https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow.
