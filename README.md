# MS Metallbau – Menger & Strotmann GbR

Statische Website (HTML/CSS/JS, kein Build). Hosting über GitHub Pages.

## Lokal ansehen
Doppelklick auf `index.html` oder: `python -m http.server` und http://localhost:8000 öffnen.

## Pflege
- Texte/Bilder direkt in den `.html`-Dateien bzw. `assets/img/` ersetzen.
- Platzhalter sind mit `[...]` oder `PLATZHALTER` markiert (E-Mail, Instagram, Telefon, Adresse, Nachnamen, Impressum/Datenschutz).
- Kontakt-E-Mail an einer Stelle im JS pflegen: `TO` in `assets/js/script.js` sowie die `mailto:`-Links auf `kontakt.html`.

## Tests (nur Entwicklung)
End-to-End-Tests mit Playwright prüfen Dropdown-Verhalten (Desktop-Hover + Mobil-Toggle + Escape), Zentrierung, Theme-Toggle, Lightbox und Formular-Validierung. Gehören **nicht** zur ausgelieferten Seite.

```bash
npm install            # einmalig
npx playwright install chromium   # einmalig
npm test               # Tests ausführen
```

## GitHub Pages
1. Repo auf GitHub pushen.
2. Settings → Pages → Source: Branch `main`, Ordner `/ (root)`.
3. Nach ein paar Minuten unter der angezeigten URL erreichbar.

### Eigene Domain (optional, später)
Datei `CNAME` mit einer Zeile `ms-metallbau-gbr.de` im Root anlegen und DNS beim Registrar auf GitHub Pages zeigen lassen.
