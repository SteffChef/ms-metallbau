# Design-Spec: Website MS Metallbau – Menger & Strotmann GbR

**Datum:** 2026-09-27
**Status:** Zur Freigabe

## 1. Ziel & Kontext

Schlichte, zeitlose Online-Präsenz für die **MS Metallbau – Menger & Strotmann GbR**.
Die Seite soll Vertrauen schaffen, das handwerkliche Können zeigen und zu
Kontaktanfragen führen. Zielgruppe: private und gewerbliche Kunden aus der Region
(Ibbenbüren / Steinfurt / Umgebung), die Metallbauleistungen suchen.

**Erfolgskriterien**
- Besucher verstehen sofort, wer die Firma ist und was sie anbietet.
- Die fünf Leistungen sind klar auffindbar und je mit Bildern belegbar.
- Interessenten finden ohne Umwege den Weg zur Kontaktaufnahme.
- Der Betreiber kann Texte und Bilder später selbst pflegen — ohne Build-Kette.
- Direkt über GitHub Pages hostbar.

**Optische Leitlinie:** minimalistisch, viel Weißraum, Schwarz/Grau/Weiß,
zeitlos — passend zum Logo (elegante High-Contrast-Serife „MS", klare
gesperrte Sans „METALLBAU / MENGER & STROTMANN GBR").

**Slogans (fest einzubauen)**
- „Metall in seiner schönsten Form" — großer Hero-Claim (Serife)
- „Präzision. Stabilität. Design." — Werte-Dreiklang in gesperrten Großbuchstaben

## 2. Getroffene Entscheidungen

| Thema | Entscheidung |
|---|---|
| Bauweise | Reines statisches HTML/CSS/JS, pro Seite eine `.html`, **kein** Build-Prozess, **keine** externen Bibliotheken |
| Hosting | GitHub Pages (Dateien im Repo-Root), relative Pfade |
| Kontaktformular | **mailto** — JS baut aus den Feldern eine vorausgefüllte E-Mail und öffnet das Mailprogramm. Kein Backend, kein Drittanbieter |
| Leistungen | **5 eigene Subseiten** (Geländer, Treppen, Podeste/Balkone, Handläufe, Sonderkonstruktionen), verlinkt aus Nav-Dropdown und Startseiten-Kacheln |
| Texte | Realistische deutsche **Platzhaltertexte**, vom Betreiber später ersetzbar |
| Bilder | **Platzhalter** jetzt, echte Bilder später (Dateinamen nach Motiven vorbereitet) |
| Recht | **Impressum + Datenschutz** als eigene Seiten mit korrekter Struktur und Platzhaltern |
| Theme | Standard **automatisch nach Systemeinstellung**, Toggle vorhanden, Auswahl in `localStorage` gespeichert |
| Farbschema | Nur Schwarz/Grau/Weiß, **keine** Akzentfarbe |
| Effekte | Parallax bei großen Bild-Sektionen (dezent), Scroll-Fade-ins, eigene Lightbox — alle mit `prefers-reduced-motion` deaktivierbar |
| Social | Instagram-Link (Platzhalter-URL) |
| Schriften | Lokal mitgeliefert (keine externen Google-Anfragen → DSGVO-freundlich) |

**Platzhalter, die der Betreiber später einträgt:** Instagram-URL,
Kontakt-E-Mail (für mailto), Telefon, Adresse, Zuordnung Kai/Leon →
Menger/Strotmann, echte Biografien/Leistungstexte, echte Bilder,
Impressums- und Datenschutzangaben.

## 3. Seitenstruktur & Dateien

```
/
├── index.html                         Startseite
├── ueber-uns.html                     Über uns (Kai & Leon)
├── kontakt.html                       Kontaktformular + Kontaktdaten + Instagram
├── impressum.html                     Impressum (Platzhalter)
├── datenschutz.html                   Datenschutzerklärung (Platzhalter)
├── leistungen/
│   ├── gelaender.html
│   ├── treppen.html
│   ├── podeste-balkone.html
│   ├── handlaeufe.html
│   └── sonderkonstruktionen.html
├── assets/
│   ├── css/style.css                  ein Stylesheet für alles
│   ├── js/script.js                   Theme, Menü, Parallax, Lightbox, mailto
│   ├── fonts/                         lokale Schriftdateien
│   ├── logo/                          Logo (hell-/dunkel-tauglich)
│   └── img/                           Bilder (Platzhalter)
├── .nojekyll                          GitHub Pages: kein Jekyll-Build
└── CNAME                              optional, für ms-metallbau-gbr.de
```

**Navigation (auf jeder Seite identisch):**
Logo links · rechts: Start · Über uns · Leistungen ▾ (Dropdown mit den 5) ·
Kontakt · Theme-Toggle. Mobil: Hamburger-Menü, Dropdown auch mobil bedienbar.

**Footer (auf jeder Seite identisch):**
Slogan „Präzision. Stabilität. Design." · Instagram-Link · Impressum ·
Datenschutz · © MS Metallbau – Menger & Strotmann GbR.

**Hinweis Wartbarkeit:** Da rein statisch, stehen Nav/Footer in jeder Datei.
Bei ~10 Seiten überschaubar; Nav/Footer werden identisch und klar
abgegrenzt aufgebaut, damit Änderungen leicht nachziehbar sind.

## 4. Seiteninhalte

**index.html (Startseite)**
1. Hero: Logo/Claim „Metall in seiner schönsten Form" über großem Bild (Parallax)
2. Werte-Dreiklang „Präzision. Stabilität. Design." (gesperrte Großbuchstaben)
3. Kurzvorstellung der beiden Geschäftsführer (Kai & Leon) mit Link zu „Über uns"
4. Leistungs-Kacheln (5) → verlinken auf die Subseiten
5. Vertrauens-/Regions-Sektion (Einsatzgebiet, Materialien)
6. Call-to-Action → Kontakt

**ueber-uns.html** — Foto + kurze Biografie/Qualifikationen von Kai & Leon
(Stil-Vorbild: Stahl.Design.Kipp), gemeinsame Werte/Anspruch.

**Leistungsseiten (je 5)** — Kurzbeschreibung, Materialhinweis (Stahl verzinkt/
pulverbeschichtet, Edelstahl), Bildergalerie (Raster + Lightbox), CTA zum Kontakt.

**kontakt.html** — Kontaktformular (Name, E-Mail, Telefon optional, Nachricht),
Kontaktdaten, Instagram-Link, Hinweis zum Öffnen des Mailprogramms.

**impressum.html / datenschutz.html** — korrekte Struktur, Platzhalter für
echte Angaben; Datenschutz deckt mailto-Formular und lokale Schriften ab.

## 5. Visuelles Design

**Typografie**
- Überschriften: Didone-artige Serife (Cormorant Garamond), groß, luftig
- Fließtext/Navigation: klare Sans (Inter/systemnah)
- Labels/Buttons/Sektionstitel: Großbuchstaben, weites `letter-spacing`
- Schriften lokal eingebunden (`@font-face`), keine externen Requests

**Farben (CSS-Variablen, per `data-theme` umschaltbar)**
- Hell: Hintergrund `#ffffff`, Text `#111111`, Sekundär/Linien in Grautönen
- Dunkel: Hintergrund `#111111`, Text helles Grau-Weiß, Sekundär/Linien in Grautönen
- Keine Akzentfarbe; Interaktion über dezente Grau-/Unterstreichungs-Effekte

**Layout**
- Zentrierter Content mit max. Breite, großzügige Abstände, ruhiges Raster
- Feine Trennlinien statt Boxen/Schatten
- Voll responsiv (Mobile-first): Handy / Tablet / Desktop

## 6. Verhalten & Interaktion (`script.js`)

- **Theme:** Inline-Skript im `<head>` setzt Theme vor dem Rendern (kein Flash);
  Default = System (`prefers-color-scheme`); Toggle schreibt nach `localStorage`.
- **Mobiles Menü:** Hamburger öffnet/schließt Nav; Leistungen-Dropdown mobil bedienbar; per Tastatur bedienbar; schließt bei Escape/Außenklick.
- **Parallax:** langsameres Scrollen großer Bild-Sektionen; deaktiviert bei
  `prefers-reduced-motion` und auf Handys.
- **Scroll-Fade-ins:** via `IntersectionObserver`; respektiert `prefers-reduced-motion`.
- **Lightbox:** eigenes Skript; Klick auf Galeriebild öffnet groß mit Weiter/
  Zurück; Tastatur (Pfeile/Escape) + Fokus-Management.
- **Kontakt (mailto):** Pflichtfeld- und E-Mail-Validierung; baut
  `mailto:`-Link mit `subject`/`body` aus den Feldern; klarer Hinweis, dass sich
  das Mailprogramm öffnet.

Keine externen Bibliotheken; alles Vanilla JS, progressiv (Grundinhalte
funktionieren auch ohne JS; ohne JS zeigt das Formular die Ziel-Mailadresse).

## 7. Qualität & Abnahme

- **Responsiv** geprüft (Handy/Tablet/Desktop)
- **Barrierefreiheit:** Alt-Texte (Platzhalter), Tastaturbedienung (Menü,
  Lightbox, Toggle), ausreichende Kontraste, `prefers-reduced-motion`
- **Beide Themes** geprüft (hell/dunkel)
- **SEO-Basics:** `<title>` + Meta-Description je Seite, sprechende URLs,
  Open-Graph-Tags
- **Kein Build / keine Abhängigkeiten**; Schriften lokal
- **Abnahme-Durchgang:** jede Seite auf Links, Menü, Toggle, mailto und Galerie
  prüfen und kurz dokumentieren

## 8. Deployment

- Dateien im Repo-Root → GitHub Pages liefert direkt aus
- `.nojekyll` vorhanden (kein Jekyll-Build)
- Relative Pfade (funktioniert lokal per Doppelklick und unter GitHub Pages)
- `CNAME` optional für spätere eigene Domain `ms-metallbau-gbr.de`

## 9. Bewusst NICHT enthalten (YAGNI)

- Kein CMS, kein Framework, keine Build-Kette
- Kein Backend / keine serverseitige Formularverarbeitung
- Keine Akzentfarbe, keine Cookie-Banner-Tracking-Skripte, kein Newsletter
- Keine echten Inhalte/Bilder (folgen vom Betreiber)
