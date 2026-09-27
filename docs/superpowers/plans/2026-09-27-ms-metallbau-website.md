# MS Metallbau Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine schlichte, zeitlose, statische Website für die MS Metallbau – Menger & Strotmann GbR, die über GitHub Pages ohne Build-Kette gehostet werden kann.

**Architecture:** Reines statisches HTML pro Seite, ein gemeinsames Stylesheet (`assets/css/style.css`) mit CSS-Variablen für Hell-/Dunkel-Theme, eine gemeinsame `assets/js/script.js` (Theme-Toggle, mobiles Menü, Parallax, Scroll-Fade-ins, Lightbox, mailto-Formular). Kein Framework, keine externen Bibliotheken, Schriften lokal eingebunden.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Grid/Flex), Vanilla JavaScript (ES6, IntersectionObserver), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-27-ms-metallbau-website-design.md`

## Verification Approach

Es gibt bewusst keinen Test-Runner. „Test"-Schritte sind manuelle Browser-Prüfungen: Datei per Doppelklick (oder über einen lokalen Server `python -m http.server`) öffnen und das beschriebene Verhalten beobachten. Wo möglich, wird das erwartete Ergebnis exakt benannt (sichtbares Element, Konsolen-Fehlerfreiheit, Verhalten bei Toggle/Resize).

## Global Constraints

- **Kein Build-Prozess, keine externen Bibliotheken, keine externen Requests** (Schriften lokal via `@font-face`).
- **Farbschema:** ausschließlich Schwarz/Grau/Weiß, keine Akzentfarbe. Hell: BG `#ffffff`, Text `#111111`. Dunkel: BG `#111111`, Text helles Grau-Weiß.
- **Theme-Default:** System (`prefers-color-scheme`); Toggle-Auswahl in `localStorage` (Key: `ms-theme`, Werte `light`/`dark`); kein Flash beim Laden.
- **Sprache:** Deutsch. Alle Inhalte sind realistische Platzhaltertexte, klar ersetzbar.
- **Pfade:** relativ, damit lokal (Doppelklick) und unter GitHub Pages lauffähig. Unterseiten in `leistungen/` verweisen mit `../` auf Assets.
- **Slogans wörtlich:** „Metall in seiner schönsten Form" (Hero-Serife) und „Präzision. Stabilität. Design." (Werte-Dreiklang, gesperrte Großbuchstaben).
- **Firmenname wörtlich:** „MS Metallbau – Menger & Strotmann GbR". Geschäftsführer: Kai & Leon (Nachnamen-Zuordnung als Platzhalter `[Nachname]`).
- **Barrierefreiheit:** alle Bewegungseffekte (Parallax, Fade-in) bei `prefers-reduced-motion: reduce` deaktiviert; Menü/Lightbox/Toggle tastaturbedienbar.
- **Platzhalter klar markieren:** Instagram-URL `https://instagram.com/PLATZHALTER`, E-Mail `info@ms-metallbau-gbr.de` (Platzhalter), Telefon/Adresse als `[Telefonnummer]`/`[Straße Nr., PLZ Ort]`.

## Review Focus

- **mailto ohne Mailclient:** Wenn kein Standard-Mailprogramm eingerichtet ist, passiert nach „Absenden" scheinbar nichts. Das Formular muss die Ziel-E-Mail sichtbar als Fallback anzeigen (Task 8).
- **JS deaktiviert:** Grundinhalte und Kontaktweg müssen ohne JavaScript nutzbar bleiben; Formular zeigt die E-Mail-Adresse als Text (Task 8), Navigation bleibt als Linkliste bedienbar (Task 2).
- **Theme-Flash beim Laden:** Ohne früh gesetztes Theme blitzt Hell vor Dunkel auf. Inline-Skript im `<head>` vor jedem sichtbaren Element setzt `data-theme` (Task 1/2).
- **`localStorage` nicht verfügbar** (Privatmodus/Blockierung): Theme-Toggle darf nicht mit Fehler abbrechen; in `try/catch` kapseln, auf System-Default zurückfallen (Task 2).
- **Sehr lange Formular-Nachricht / Sonderzeichen:** mailto-Body muss korrekt `encodeURIComponent`-kodiert werden, sonst bricht der Link (Task 8).

---

## File Structure

```
/
├── index.html
├── ueber-uns.html
├── kontakt.html
├── impressum.html
├── datenschutz.html
├── leistungen/
│   ├── gelaender.html
│   ├── treppen.html
│   ├── podeste-balkone.html
│   ├── handlaeufe.html
│   └── sonderkonstruktionen.html
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── fonts/            (leer; @font-face mit System-Fallback bis echte Dateien da sind)
│   ├── logo/logo.jpeg    (vorhandenes Logo hierher kopiert)
│   └── img/              (Platzhalterbilder + README mit Zielmotiven)
├── .nojekyll
└── README.md
```

Verantwortlichkeiten:
- `style.css` — komplettes Design (Tokens, Themes, Typografie, Layout, Komponenten, Responsive).
- `script.js` — alle Interaktionen. Ein bewusst kleines, modular strukturiertes File (Funktionen `initTheme`, `initMenu`, `initParallax`, `initReveal`, `initLightbox`, `initContactForm`).
- Jede `.html` — eigener `<main>`-Inhalt; identisches Header-/Footer-Markup (Canonical-Vorlage aus Task 2).

---

## Task 1: Scaffolding, Design-Tokens & Basis-CSS

**Files:**
- Create: `.nojekyll`
- Create: `README.md`
- Create: `assets/css/style.css`
- Create: `assets/logo/logo.jpeg` (Kopie von `Logo Neu.jpeg`)
- Create: `assets/img/README.md`

**Interfaces:**
- Produces: CSS-Custom-Properties und Theme-Mechanik über `:root` und `[data-theme="dark"]`; Utility-/Layout-Klassen `.container`, `.section`, `.label`, `.btn`, `.eyebrow`. Font-Familien `--font-serif`, `--font-sans`.

- [ ] **Step 1: Projektdateien anlegen**

`.nojekyll` (leer). `README.md`:

```markdown
# MS Metallbau – Menger & Strotmann GbR

Statische Website (HTML/CSS/JS, kein Build). Hosting über GitHub Pages.

## Lokal ansehen
Doppelklick auf `index.html` oder: `python -m http.server` und http://localhost:8000 öffnen.

## Pflege
- Texte/Bilder direkt in den `.html`-Dateien bzw. `assets/img/` ersetzen.
- Platzhalter sind mit `[...]` oder `PLATZHALTER` markiert (E-Mail, Instagram, Telefon, Adresse, Nachnamen, Impressum/Datenschutz).
```

`assets/img/README.md`:

```markdown
# Bilder
Platzhalter ersetzen. Geplante Motive (Dateiname → Motiv):
pruss-halverde.jpg, keeve-dickenberg.jpg, gerhardt-halverde.jpg,
bergfeld-ibbenbueren.jpg, heskamp-hopsten.jpg, kai-zuhause.jpg, wessels-rheine.jpg
Empfehlung: JPG, längste Kante ~1600px, Galerie-Thumbs ~800px.
```

- [ ] **Step 2: Logo kopieren**

```bash
cp "Logo Neu.jpeg" assets/logo/logo.jpeg
```

- [ ] **Step 3: `style.css` — Tokens, Themes, Reset, Typografie**

```css
/* ===== Fonts (lokal; Fallback bis echte Dateien in assets/fonts/ liegen) ===== */
/* Wenn echte Fontdateien vorhanden sind, @font-face unten einkommentieren/ergänzen. */
:root {
  --font-serif: "Cormorant Garamond", "Cormorant", Georgia, "Times New Roman", serif;
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;

  --bg: #ffffff;
  --bg-alt: #f4f4f4;
  --text: #111111;
  --text-muted: #6b6b6b;
  --line: #e2e2e2;
  --inverse-bg: #111111;
  --inverse-text: #f4f4f4;

  --maxw: 1140px;
  --space: clamp(3rem, 8vw, 7rem);
  --radius: 0;
}
[data-theme="dark"] {
  --bg: #111111;
  --bg-alt: #1a1a1a;
  --text: #f4f4f4;
  --text-muted: #9a9a9a;
  --line: #2c2c2c;
  --inverse-bg: #f4f4f4;
  --inverse-text: #111111;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  transition: background-color .3s ease, color .3s ease;
}
img { max-width: 100%; display: block; }
a { color: inherit; }

h1, h2, h3 { font-family: var(--font-serif); font-weight: 500; line-height: 1.1; margin: 0 0 .5em; }
h1 { font-size: clamp(2.6rem, 7vw, 5rem); }
h2 { font-size: clamp(2rem, 4.5vw, 3rem); }
h3 { font-size: clamp(1.4rem, 3vw, 1.9rem); }
p { margin: 0 0 1.1em; max-width: 62ch; }

.container { width: min(100% - 2.5rem, var(--maxw)); margin-inline: auto; }
.section { padding-block: var(--space); }
.section--alt { background: var(--bg-alt); }
.eyebrow, .label {
  font-size: .78rem; text-transform: uppercase; letter-spacing: .28em;
  color: var(--text-muted); font-weight: 500;
}
.btn {
  display: inline-block; font-size: .8rem; text-transform: uppercase; letter-spacing: .2em;
  padding: .95rem 2rem; border: 1px solid var(--text); color: var(--text);
  text-decoration: none; background: transparent; cursor: pointer;
  transition: background-color .25s ease, color .25s ease;
}
.btn:hover, .btn:focus-visible { background: var(--text); color: var(--bg); }
:focus-visible { outline: 2px solid var(--text); outline-offset: 3px; }
```

- [ ] **Step 4: Prüfen (Browser)**

Erstelle temporär `index.html` mit `<link rel="stylesheet" href="assets/css/style.css">` und einem `<h1>Test</h1><p class="eyebrow">Label</p>`. Öffne im Browser.
Erwartet: Serifen-Überschrift, weißer Hintergrund, gesperrtes Kleinlabel. In DevTools `document.documentElement.setAttribute('data-theme','dark')` eingeben → Seite wird dunkel. Danach temporären `<h1>`-Inhalt wieder entfernen (Task 3 baut die echte index).

- [ ] **Step 5: Commit**

```bash
git add .nojekyll README.md assets/
git commit -m "feat: Projekt-Scaffolding, Design-Tokens und Basis-CSS"
```

---

## Task 2: Gemeinsames Header/Footer + Kern-JS (Theme, Menü)

Baut die Canonical-Vorlage für Kopf und Fuß sowie die JS-Grundfunktionen. Umgesetzt und geprüft an einer minimalen `index.html`-Hülle (Inhalt folgt in Task 3).

**Files:**
- Create: `assets/js/script.js`
- Create: `index.html` (nur Grundgerüst: `<head>`, Header, leerer `<main>`, Footer, Script-Einbindung)

**Interfaces:**
- Produces:
  - **Canonical Head-Snippet** (inkl. No-Flash-Theme-Skript) — von allen Seiten kopiert.
  - **Canonical Header-Markup** (`<header class="site-header">` mit `.brand`, `<nav>`, `.nav-toggle`, `.theme-toggle`, Dropdown `.has-dropdown`).
  - **Canonical Footer-Markup** (`<footer class="site-footer">`).
  - JS-Funktionen `initTheme()`, `initMenu()` und ein `DOMContentLoaded`-Bootstrap, das alle `init*`-Funktionen aufruft (guarded, falls Elemente fehlen).
- Hinweis für Unterseiten (`leistungen/*`): Asset-Pfade mit `../` und Navigations-Links relativ anpassen (in Task 6/7 dokumentiert).

- [ ] **Step 1: `script.js` mit Theme + Menü**

```js
/* ===== Theme ===== */
function initTheme() {
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  function current() { return document.documentElement.getAttribute('data-theme') || 'light'; }
  toggle.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ms-theme', next); } catch (e) {}
    toggle.setAttribute('aria-pressed', String(next === 'dark'));
  });
}

/* ===== Mobiles Menü + Dropdown ===== */
function initMenu() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // Dropdown auch per Klick (mobil) bedienbar
  document.querySelectorAll('.has-dropdown > .dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.parentElement;
      var open = li.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMenu();
  if (typeof initParallax === 'function') initParallax();
  if (typeof initReveal === 'function') initReveal();
  if (typeof initLightbox === 'function') initLightbox();
  if (typeof initContactForm === 'function') initContactForm();
});
```

- [ ] **Step 2: CSS für Header/Footer/Menü in `style.css` ergänzen**

```css
/* ===== Header ===== */
.site-header {
  position: sticky; top: 0; z-index: 50;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.site-header .container { display: flex; align-items: center; justify-content: space-between; min-height: 72px; }
.brand img { height: 40px; width: auto; }
.brand { text-decoration: none; }
#primary-nav ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; align-items: center; }
#primary-nav a, .dropdown-toggle {
  text-decoration: none; font-size: .8rem; text-transform: uppercase; letter-spacing: .16em;
  background: none; border: 0; color: inherit; cursor: pointer; font-family: var(--font-sans);
}
#primary-nav a:hover { text-decoration: underline; text-underline-offset: 6px; }
.has-dropdown { position: relative; }
.has-dropdown .dropdown {
  list-style: none; margin: 0; padding: .5rem 0; position: absolute; top: 100%; left: 0;
  background: var(--bg); border: 1px solid var(--line); min-width: 240px; display: none; flex-direction: column; gap: 0;
}
.has-dropdown:hover .dropdown, .has-dropdown.is-open .dropdown { display: flex; }
.has-dropdown .dropdown li { padding: 0; }
.has-dropdown .dropdown a { display: block; padding: .6rem 1.25rem; }
.header-actions { display: flex; align-items: center; gap: 1rem; }
.theme-toggle, .nav-toggle {
  background: none; border: 1px solid var(--line); color: inherit; width: 40px; height: 40px;
  display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
}
.theme-toggle .icon-moon { display: none; }
[data-theme="dark"] .theme-toggle .icon-sun { display: none; }
[data-theme="dark"] .theme-toggle .icon-moon { display: inline; }
.nav-toggle { display: none; }

/* ===== Footer ===== */
.site-footer { background: var(--inverse-bg); color: var(--inverse-text); padding-block: 3.5rem; }
.site-footer .container { display: grid; gap: 1.5rem; text-align: center; }
.site-footer .footer-slogan { font-family: var(--font-sans); text-transform: uppercase; letter-spacing: .3em; font-size: .8rem; }
.site-footer nav { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
.site-footer a { color: inherit; text-decoration: none; font-size: .85rem; }
.site-footer a:hover { text-decoration: underline; text-underline-offset: 4px; }
.site-footer small { color: color-mix(in srgb, var(--inverse-text) 60%, transparent); }

/* ===== Responsive Navigation ===== */
@media (max-width: 860px) {
  .nav-toggle { display: inline-flex; }
  #primary-nav {
    position: fixed; inset: 72px 0 auto 0; background: var(--bg); border-bottom: 1px solid var(--line);
    transform: translateY(-120%); transition: transform .3s ease; padding: 1.5rem 0;
  }
  #primary-nav.is-open { transform: translateY(0); }
  #primary-nav ul { flex-direction: column; gap: 0; }
  #primary-nav > ul > li { border-top: 1px solid var(--line); }
  #primary-nav a, .dropdown-toggle { display: block; padding: 1rem 1.25rem; width: 100%; text-align: left; }
  .has-dropdown .dropdown { position: static; border: 0; padding: 0; display: none; }
  .has-dropdown.is-open .dropdown { display: flex; }
  .has-dropdown .dropdown a { padding-left: 2.5rem; }
}
```

- [ ] **Step 3: `index.html`-Grundgerüst mit Canonical Head/Header/Footer**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MS Metallbau – Menger & Strotmann GbR</title>
  <meta name="description" content="MS Metallbau – Menger & Strotmann GbR: Geländer, Treppen, Balkone, Handläufe und Sonderkonstruktionen aus Stahl und Edelstahl. Metall in seiner schönsten Form.">
  <link rel="stylesheet" href="assets/css/style.css">
  <!-- No-Flash-Theme: MUSS vor sichtbarem Inhalt stehen -->
  <script>
    (function () {
      try {
        var t = localStorage.getItem('ms-theme');
        if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', t);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a class="brand" href="index.html"><img src="assets/logo/logo.jpeg" alt="MS Metallbau – Menger & Strotmann GbR"></a>
      <div class="header-actions">
        <nav id="primary-nav" aria-label="Hauptnavigation">
          <ul>
            <li><a href="index.html">Start</a></li>
            <li><a href="ueber-uns.html">Über uns</a></li>
            <li class="has-dropdown">
              <button class="dropdown-toggle" aria-expanded="false">Leistungen ▾</button>
              <ul class="dropdown">
                <li><a href="leistungen/gelaender.html">Geländer</a></li>
                <li><a href="leistungen/treppen.html">Treppen</a></li>
                <li><a href="leistungen/podeste-balkone.html">Podeste &amp; Balkone</a></li>
                <li><a href="leistungen/handlaeufe.html">Handläufe</a></li>
                <li><a href="leistungen/sonderkonstruktionen.html">Sonderkonstruktionen</a></li>
              </ul>
            </li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </nav>
        <button class="theme-toggle" aria-label="Farbschema umschalten" aria-pressed="false">
          <span class="icon-sun" aria-hidden="true">☀</span><span class="icon-moon" aria-hidden="true">☾</span>
        </button>
        <button class="nav-toggle" aria-label="Menü öffnen" aria-controls="primary-nav" aria-expanded="false">☰</button>
      </div>
    </div>
  </header>

  <main>
    <!-- Task 3 füllt den Inhalt -->
  </main>

  <footer class="site-footer">
    <div class="container">
      <p class="footer-slogan">Präzision. Stabilität. Design.</p>
      <nav aria-label="Rechtliches und Social">
        <a href="https://instagram.com/PLATZHALTER" target="_blank" rel="noopener">Instagram</a>
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
      </nav>
      <small>© <span id="year">2026</span> MS Metallbau – Menger &amp; Strotmann GbR</small>
    </div>
  </footer>

  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
  <script src="assets/js/script.js"></script>
</body>
</html>
```

- [ ] **Step 4: Prüfen (Browser)**

Öffne `index.html`. Erwartet:
1. Kein Hell-Flash bei Systemeinstellung „dunkel" (Seite startet direkt dunkel).
2. Klick auf Theme-Toggle wechselt hell/dunkel; Reload behält die Wahl (localStorage).
3. Fenster auf < 860px verkleinern → Hamburger erscheint, Klick öffnet Menü, „Leistungen ▾" klappt Untermenü auf, Escape/Außenklick schließt.
4. DevTools-Konsole: keine Fehler.
5. Test ohne JS (DevTools → JS deaktivieren): Navigationslinks bleiben als Liste klickbar.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/js/script.js assets/css/style.css
git commit -m "feat: gemeinsames Header/Footer, Theme-Toggle und mobiles Menü"
```

---

## Task 3: Startseite (index.html) Inhalt

**Files:**
- Modify: `index.html` (`<main>` befüllen)
- Modify: `assets/css/style.css` (Hero, Werte-Dreiklang, Kacheln, CTA)

**Interfaces:**
- Consumes: Head/Header/Footer aus Task 2.
- Produces: CSS-Klassen `.hero`, `.parallax`, `.values`, `.tiles`, `.tile`, `.cta` (von späteren Seiten wiederverwendet).

- [ ] **Step 1: `<main>`-Inhalt der Startseite einsetzen**

```html
<section class="hero parallax" data-parallax>
  <div class="hero__bg" style="background-image:url('assets/img/hero.jpg')"></div>
  <div class="hero__inner container">
    <p class="eyebrow">MS Metallbau · Menger &amp; Strotmann GbR</p>
    <h1>Metall in seiner<br>schönsten Form</h1>
    <a class="btn" href="kontakt.html">Projekt anfragen</a>
  </div>
</section>

<section class="section values">
  <div class="container">
    <p class="values__line">Präzision. Stabilität. Design.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container reveal">
    <p class="eyebrow">Über uns</p>
    <h2>Zwei Handwerker, ein Anspruch</h2>
    <p>Hinter MS Metallbau stehen Kai [Nachname] und Leon [Nachname] – zwei Metallbauer aus Leidenschaft. [Platzhalter: 2–3 Sätze zur gemeinsamen Geschichte, Werkstatt und Region. Was euch ausmacht: saubere Verarbeitung, ehrliche Beratung, termintreue Umsetzung.]</p>
    <a class="btn" href="ueber-uns.html">Mehr über uns</a>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="eyebrow">Leistungen</p>
    <h2>Was wir für Sie fertigen</h2>
    <div class="tiles">
      <a class="tile" href="leistungen/gelaender.html"><span class="tile__img" style="background-image:url('assets/img/gelaender.jpg')"></span><span class="tile__label">Geländer</span></a>
      <a class="tile" href="leistungen/treppen.html"><span class="tile__img" style="background-image:url('assets/img/treppen.jpg')"></span><span class="tile__label">Treppen</span></a>
      <a class="tile" href="leistungen/podeste-balkone.html"><span class="tile__img" style="background-image:url('assets/img/podeste.jpg')"></span><span class="tile__label">Podeste &amp; Balkone</span></a>
      <a class="tile" href="leistungen/handlaeufe.html"><span class="tile__img" style="background-image:url('assets/img/handlaeufe.jpg')"></span><span class="tile__label">Handläufe</span></a>
      <a class="tile" href="leistungen/sonderkonstruktionen.html"><span class="tile__img" style="background-image:url('assets/img/sonder.jpg')"></span><span class="tile__label">Sonderkonstruktionen</span></a>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container reveal">
    <p class="eyebrow">Region &amp; Material</p>
    <h2>Für die Region gefertigt</h2>
    <p>Wir arbeiten für private und gewerbliche Kunden in Ibbenbüren, Hopsten, Rheine und Umgebung. Gefertigt wird in Stahl (verzinkt und pulverbeschichtet) sowie Edelstahl – langlebig, wartungsarm und passgenau.</p>
  </div>
</section>

<section class="section cta">
  <div class="container reveal" style="text-align:center">
    <h2>Ihr Projekt beginnt mit einem Gespräch</h2>
    <a class="btn" href="kontakt.html">Jetzt Kontakt aufnehmen</a>
  </div>
</section>
```

- [ ] **Step 2: CSS für Startseiten-Komponenten**

```css
/* Hero */
.hero { position: relative; min-height: 82vh; display: flex; align-items: flex-end; overflow: hidden; color: #fff; }
.hero__bg {
  position: absolute; inset: -10% 0; background-size: cover; background-position: center;
  background-color: #333; z-index: -1; will-change: transform;
}
.hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(transparent, rgba(0,0,0,.6)); z-index: -1; }
.hero__inner { padding-block: clamp(3rem, 8vw, 7rem); }
.hero h1 { color: #fff; }
.hero .eyebrow { color: rgba(255,255,255,.8); }

/* Werte-Dreiklang */
.values { text-align: center; }
.values__line { font-family: var(--font-sans); text-transform: uppercase; letter-spacing: .4em; font-size: clamp(.9rem, 2.5vw, 1.3rem); color: var(--text); margin: 0; }

/* Kacheln */
.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 2.5rem; }
.tile { position: relative; display: block; text-decoration: none; color: #fff; overflow: hidden; aspect-ratio: 4/3; }
.tile__img { position: absolute; inset: 0; background-size: cover; background-position: center; background-color: #444; transition: transform .5s ease; }
.tile:hover .tile__img, .tile:focus-visible .tile__img { transform: scale(1.06); }
.tile::after { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,.35); }
.tile__label { position: absolute; left: 1.25rem; bottom: 1.1rem; z-index: 1; text-transform: uppercase; letter-spacing: .18em; font-size: .9rem; }
```

- [ ] **Step 3: Prüfen (Browser)**

Öffne `index.html`. Erwartet: Hero mit Claim „Metall in seiner schönsten Form" und Button; Werte-Zeile mittig gesperrt; 5 Kacheln (graue Platzhalterflächen, da Bilder fehlen), Hover skaliert Kachelbild; alle Kachel-Links zeigen auf `leistungen/*` (klicken → 404 ist ok bis Task 6/7). Beide Themes prüfen.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "feat: Startseite mit Hero, Werte-Dreiklang, Leistungs-Kacheln und CTA"
```

---

## Task 4: Parallax & Scroll-Fade-in (JS + CSS)

**Files:**
- Modify: `assets/js/script.js` (Funktionen `initParallax`, `initReveal`)
- Modify: `assets/css/style.css` (`.reveal`, reduced-motion)

**Interfaces:**
- Consumes: Elemente `[data-parallax] .hero__bg` und `.reveal` aus den Seiten.
- Produces: `initParallax()`, `initReveal()` (werden vom Bootstrap in Task 2 aufgerufen).

- [ ] **Step 1: JS ergänzen**

```js
/* ===== Parallax (nur Desktop, respektiert reduced-motion) ===== */
function initParallax() {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = matchMedia('(max-width: 860px)').matches;
  if (reduce || small) return;
  var layers = document.querySelectorAll('[data-parallax] .hero__bg');
  if (!layers.length) return;
  var ticking = false;
  function update() {
    layers.forEach(function (el) {
      var rect = el.parentElement.getBoundingClientRect();
      var offset = rect.top * -0.15;
      el.style.transform = 'translateY(' + offset + 'px)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* ===== Scroll-Fade-in ===== */
function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { obs.observe(el); });
}
```

- [ ] **Step 2: CSS ergänzen**

```css
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 3: Prüfen (Browser)**

Öffne `index.html` am Desktop: beim Scrollen bewegt sich der Hero-Hintergrund langsamer; `.reveal`-Abschnitte blenden beim Scrollen ein. In DevTools „Emulate prefers-reduced-motion: reduce" → kein Parallax, Inhalte sofort sichtbar. Fenster < 860px → kein Parallax. Konsole fehlerfrei.

- [ ] **Step 4: Commit**

```bash
git add assets/js/script.js assets/css/style.css
git commit -m "feat: dezenter Parallax und Scroll-Fade-in (mit reduced-motion)"
```

---

## Task 5: Über-uns-Seite (ueber-uns.html)

**Files:**
- Create: `ueber-uns.html`
- Modify: `assets/css/style.css` (`.profile`, `.page-hero`)

**Interfaces:**
- Consumes: Canonical Head/Header/Footer (Task 2), `.section`, `.reveal`, `.btn`.
- Produces: `.page-hero` (schlanker Seitenkopf, von weiteren Unterseiten genutzt), `.profile`.

- [ ] **Step 1: Seite erstellen**

Kopiere das komplette Gerüst aus `index.html` (Head/Header/Footer). Setze `<title>Über uns – MS Metallbau</title>`, passende `meta description`, und diesen `<main>`:

```html
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Über uns</p>
    <h1>Menger &amp; Strotmann</h1>
    <p>Zwei Metallbauer, ein gemeinsamer Anspruch: Metall in seiner schönsten Form.</p>
  </div>
</section>

<section class="section">
  <div class="container profile reveal">
    <div class="profile__img" style="background-image:url('assets/img/kai-zuhause.jpg')" role="img" aria-label="Foto Kai [Nachname]"></div>
    <div class="profile__text">
      <p class="eyebrow">Geschäftsführer</p>
      <h2>Kai [Nachname]</h2>
      <p>[Platzhalter Biografie: Ausbildung, Meister/Qualifikationen, Schwerpunkte, Jahre Erfahrung. 3–5 Sätze.]</p>
      <ul>
        <li>[Qualifikation, z. B. Metallbaumeister]</li>
        <li>[Schwerpunkt, z. B. Konstruktion &amp; Planung]</li>
      </ul>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container profile profile--reverse reveal">
    <div class="profile__img" style="background-image:url('assets/img/leon.jpg')" role="img" aria-label="Foto Leon [Nachname]"></div>
    <div class="profile__text">
      <p class="eyebrow">Geschäftsführer</p>
      <h2>Leon [Nachname]</h2>
      <p>[Platzhalter Biografie: Ausbildung, Qualifikationen, Schwerpunkte. 3–5 Sätze.]</p>
      <ul>
        <li>[Qualifikation]</li>
        <li>[Schwerpunkt, z. B. Fertigung &amp; Montage]</li>
      </ul>
    </div>
  </div>
</section>

<section class="section cta">
  <div class="container reveal" style="text-align:center">
    <h2>Lernen wir uns kennen</h2>
    <a class="btn" href="kontakt.html">Kontakt aufnehmen</a>
  </div>
</section>
```

- [ ] **Step 2: CSS ergänzen**

```css
.page-hero { padding-block: clamp(3rem, 7vw, 6rem) 1rem; border-bottom: 1px solid var(--line); }
.page-hero h1 { margin-bottom: .2em; }
.profile { display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(1.5rem, 5vw, 4rem); align-items: center; }
.profile__img { background-size: cover; background-position: center; background-color: #444; aspect-ratio: 4/5; }
.profile--reverse .profile__img { order: 2; }
.profile__text ul { padding-left: 1.1rem; color: var(--text-muted); }
@media (max-width: 720px) {
  .profile, .profile--reverse { grid-template-columns: 1fr; }
  .profile--reverse .profile__img { order: 0; }
}
```

- [ ] **Step 3: Prüfen (Browser)**

Öffne `ueber-uns.html`: Seitenkopf, zwei Profil-Blöcke (Bild/Text im Wechsel, Platzhalterflächen), CTA. Header-Link „Über uns" ist aktiv erreichbar; Footer/Toggle/Menü funktionieren. Beide Themes, mobile Ansicht (Bilder stapeln). Konsole fehlerfrei.

- [ ] **Step 4: Commit**

```bash
git add ueber-uns.html assets/css/style.css
git commit -m "feat: Über-uns-Seite mit Profilen von Kai und Leon"
```

---

## Task 6: Erste Leistungsseite + Lightbox (leistungen/gelaender.html)

Etabliert die Leistungsseiten-Vorlage inkl. Galerie und Lightbox. Wichtig: Pfade mit `../`.

**Files:**
- Create: `leistungen/gelaender.html`
- Modify: `assets/js/script.js` (`initLightbox`)
- Modify: `assets/css/style.css` (`.gallery`, `.lightbox`, `.service-intro`)

**Interfaces:**
- Consumes: Canonical Head/Header/Footer mit **angepassten `../`-Pfaden**.
- Produces:
  - **Leistungsseiten-Vorlage** (Task 7 klont sie): `.page-hero`, `.service-intro`, `.gallery` mit `<button class="gallery__item" data-full="...">`.
  - `initLightbox()` — öffnet `data-full`-Bild groß mit Weiter/Zurück, Escape, Fokus-Management.

- [ ] **Step 1: Canonical-Pfade für Unterseiten dokumentieren**

In `leistungen/*.html` gegenüber der Root-Vorlage anpassen:
- CSS: `href="../assets/css/style.css"`, Logo: `src="../assets/logo/logo.jpeg"`, JS: `src="../assets/js/script.js"`
- Nav-Links: `href="../index.html"`, `href="../ueber-uns.html"`, `href="../kontakt.html"`, `href="../impressum.html"`, `href="../datenschutz.html"`
- Leistungs-Dropdown-Links ohne `../` (gleiche Ordnerebene): `href="gelaender.html"` usw.
- No-Flash-Theme-Skript im `<head>` unverändert übernehmen.
- Bild-Pfade: `../assets/img/...`

- [ ] **Step 2: `initLightbox` in `script.js`**

```js
/* ===== Lightbox ===== */
function initLightbox() {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  if (!items.length) return;
  var idx = 0, lastFocus = null;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML =
    '<button class="lightbox__close" aria-label="Schließen">×</button>' +
    '<button class="lightbox__nav lightbox__prev" aria-label="Vorheriges Bild">‹</button>' +
    '<img class="lightbox__img" alt="">' +
    '<button class="lightbox__nav lightbox__next" aria-label="Nächstes Bild">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector('.lightbox__img');

  function show(i) {
    idx = (i + items.length) % items.length;
    var src = items[idx].getAttribute('data-full');
    img.setAttribute('src', src);
    img.setAttribute('alt', items[idx].getAttribute('data-alt') || '');
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    box.querySelector('.lightbox__close').focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', function () { show(idx - 1); });
  box.querySelector('.lightbox__next').addEventListener('click', function () { show(idx + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
}
```

- [ ] **Step 3: CSS für Galerie + Lightbox**

```css
.service-intro { max-width: 70ch; }
.service-intro .material { color: var(--text-muted); font-size: .95rem; }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 2.5rem; }
.gallery__item { border: 0; padding: 0; cursor: pointer; background: #444; aspect-ratio: 4/3; overflow: hidden; }
.gallery__item img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.gallery__item:hover img, .gallery__item:focus-visible img { transform: scale(1.05); }

.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.92); display: none; align-items: center; justify-content: center; z-index: 100; }
.lightbox.is-open { display: flex; }
.lightbox__img { max-width: 90vw; max-height: 85vh; object-fit: contain; }
.lightbox__close, .lightbox__nav { position: absolute; background: none; border: 0; color: #fff; cursor: pointer; font-size: 2.5rem; padding: .5rem 1rem; }
.lightbox__close { top: 1rem; right: 1.5rem; }
.lightbox__prev { left: .5rem; top: 50%; transform: translateY(-50%); }
.lightbox__next { right: .5rem; top: 50%; transform: translateY(-50%); }
```

- [ ] **Step 4: `leistungen/gelaender.html` erstellen**

Gerüst mit `../`-Pfaden (Step 1). `<title>Geländer – MS Metallbau</title>` + description. `<main>`:

```html
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Leistungen</p>
    <h1>Geländer</h1>
  </div>
</section>

<section class="section">
  <div class="container service-intro reveal">
    <p>[Platzhalter: Geländer nach Maß für Treppen, Balkone und Außenanlagen – schlicht, sicher und langlebig. 2–4 Sätze zu Stil (modern/klassisch), Verglasung, Stab-/Lochblechfüllung etc.]</p>
    <p class="material"><strong>Material:</strong> Stahl (verzinkt &amp; pulverbeschichtet), Edelstahl.</p>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <p class="eyebrow">Galerie</p>
    <h2>Ausgewählte Arbeiten</h2>
    <div class="gallery">
      <button class="gallery__item" data-full="../assets/img/gelaender-1.jpg" data-alt="Geländer Projekt 1"><img src="../assets/img/gelaender-1.jpg" alt="Geländer Projekt 1"></button>
      <button class="gallery__item" data-full="../assets/img/gelaender-2.jpg" data-alt="Geländer Projekt 2"><img src="../assets/img/gelaender-2.jpg" alt="Geländer Projekt 2"></button>
      <button class="gallery__item" data-full="../assets/img/gelaender-3.jpg" data-alt="Geländer Projekt 3"><img src="../assets/img/gelaender-3.jpg" alt="Geländer Projekt 3"></button>
    </div>
  </div>
</section>

<section class="section cta">
  <div class="container reveal" style="text-align:center">
    <h2>Interesse an einem Geländer?</h2>
    <a class="btn" href="../kontakt.html">Anfrage senden</a>
  </div>
</section>
```

- [ ] **Step 5: Prüfen (Browser)**

Öffne `leistungen/gelaender.html`. Erwartet: CSS geladen (nicht ungestylt → `../`-Pfad korrekt); Header/Footer/Logo sichtbar; Navigation zurück zur Startseite funktioniert; Galerie zeigt 3 Kacheln; Klick öffnet Lightbox; Pfeile/Weiter-Zurück und Escape funktionieren; Tab-Fokus landet im Dialog. Beide Themes. Konsole fehlerfrei.

- [ ] **Step 6: Commit**

```bash
git add leistungen/gelaender.html assets/js/script.js assets/css/style.css
git commit -m "feat: Leistungsseite Geländer inkl. Galerie und Lightbox"
```

---

## Task 7: Übrige Leistungsseiten (4 Seiten)

**Files:**
- Create: `leistungen/treppen.html`
- Create: `leistungen/podeste-balkone.html`
- Create: `leistungen/handlaeufe.html`
- Create: `leistungen/sonderkonstruktionen.html`

**Interfaces:**
- Consumes: Leistungsseiten-Vorlage aus Task 6 (identisches Gerüst, `../`-Pfade, `.gallery`/Lightbox).

- [ ] **Step 1: Vier Seiten aus `gelaender.html` klonen und anpassen**

Für jede Seite: Kopie von `leistungen/gelaender.html`, dann Titel, H1, Intro-Text und Galerie-Bildnamen ersetzen. Werte je Seite:

- `treppen.html` — `<title>Treppen – MS Metallbau</title>`, H1 „Treppen", Intro-Platzhalter (Stahltreppen, Wangen-/Faltwerktreppen, innen/außen), Bilder `treppen-1.jpg … treppen-3.jpg`, CTA „Interesse an einer Treppe?".
- `podeste-balkone.html` — `<title>Podeste & Balkone – MS Metallbau</title>`, H1 „Podeste & Balkone", Intro (Balkonanlagen, Vorstellbalkone, Podeste), Bilder `podeste-1.jpg … podeste-3.jpg`, CTA „Interesse an Podest oder Balkon?".
- `handlaeufe.html` — `<title>Handläufe – MS Metallbau</title>`, H1 „Handläufe", Intro (Wand-/Freihandläufe, barrierefrei), Bilder `handlaeufe-1.jpg … handlaeufe-3.jpg`, CTA „Interesse an einem Handlauf?".
- `sonderkonstruktionen.html` — `<title>Sonderkonstruktionen – MS Metallbau</title>`, H1 „Sonderkonstruktionen", Intro (individuelle Stahlbau-/Sonderlösungen, Überdachungen, Tore, Vorrichtungen), Bilder `sonder-1.jpg … sonder-3.jpg`, CTA „Ihre Sonderlösung?".

Material-Zeile in allen: „Stahl (verzinkt & pulverbeschichtet), Edelstahl." (bei Sonderkonstruktionen ggf. „u. a.").

- [ ] **Step 2: Prüfen (Browser)**

Öffne jede der vier Seiten: korrektes CSS (`../`), passender Titel/H1, Galerie + Lightbox funktionieren, CTA-Link zu `../kontakt.html`, Dropdown-Navigation verlinkt alle 5 Leistungsseiten korrekt untereinander. Konsole fehlerfrei.

- [ ] **Step 3: Commit**

```bash
git add leistungen/
git commit -m "feat: Leistungsseiten Treppen, Podeste/Balkone, Handläufe, Sonderkonstruktionen"
```

---

## Task 8: Kontaktseite + mailto-Formular (kontakt.html)

**Files:**
- Create: `kontakt.html`
- Modify: `assets/js/script.js` (`initContactForm`)
- Modify: `assets/css/style.css` (`.form`, `.contact-grid`)

**Interfaces:**
- Consumes: Canonical Head/Header/Footer (Root-Pfade), `.section`, `.btn`.
- Produces: `initContactForm()` — validiert Pflichtfelder + E-Mail-Format, baut `mailto:`-Link mit `encodeURIComponent`, öffnet Mailprogramm, zeigt Hinweis. Fallback: sichtbare E-Mail-Adresse.

- [ ] **Step 1: Seite erstellen (Root-Gerüst)**

`<title>Kontakt – MS Metallbau</title>` + description. `<main>`:

```html
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Kontakt</p>
    <h1>Sprechen wir über Ihr Projekt</h1>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div class="reveal">
      <p class="eyebrow">Direkt erreichbar</p>
      <p>MS Metallbau – Menger &amp; Strotmann GbR<br>
      [Straße Nr.]<br>[PLZ Ort]</p>
      <p>Telefon: <a href="tel:+49000000000">[Telefonnummer]</a><br>
      E-Mail: <a href="mailto:info@ms-metallbau-gbr.de">info@ms-metallbau-gbr.de</a></p>
      <p><a href="https://instagram.com/PLATZHALTER" target="_blank" rel="noopener">Instagram: @PLATZHALTER</a></p>
    </div>

    <form class="form" id="contact-form" novalidate
          action="mailto:info@ms-metallbau-gbr.de" method="post" enctype="text/plain">
      <p class="form__note">Beim Absenden öffnet sich Ihr E-Mail-Programm mit der vorausgefüllten Nachricht. Alternativ schreiben Sie direkt an <a href="mailto:info@ms-metallbau-gbr.de">info@ms-metallbau-gbr.de</a>.</p>
      <label>Name*<input type="text" name="name" required></label>
      <label>E-Mail*<input type="email" name="email" required></label>
      <label>Telefon<input type="tel" name="telefon"></label>
      <label>Nachricht*<textarea name="nachricht" rows="6" required></textarea></label>
      <p class="form__error" id="form-error" role="alert" hidden></p>
      <button class="btn" type="submit">Nachricht senden</button>
    </form>
  </div>
</section>
```

- [ ] **Step 2: `initContactForm` in `script.js`**

```js
/* ===== Kontaktformular (mailto) ===== */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var errBox = document.getElementById('form-error');
  var TO = 'info@ms-metallbau-gbr.de'; // Platzhalter: echte Adresse eintragen

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var tel = form.telefon.value.trim();
    var msg = form.nachricht.value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !msg) {
      errBox.hidden = false;
      errBox.textContent = !name ? 'Bitte geben Sie Ihren Namen an.'
        : !emailOk ? 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
        : 'Bitte schreiben Sie eine Nachricht.';
      return;
    }
    errBox.hidden = true;

    var subject = 'Anfrage über die Website – ' + name;
    var body = 'Name: ' + name + '\nE-Mail: ' + email + '\nTelefon: ' + (tel || '-') + '\n\nNachricht:\n' + msg;
    window.location.href = 'mailto:' + TO +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
}
```

- [ ] **Step 3: CSS ergänzen**

```css
.contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(2rem, 6vw, 5rem); align-items: start; }
.form { display: grid; gap: 1.1rem; }
.form label { display: grid; gap: .4rem; font-size: .78rem; text-transform: uppercase; letter-spacing: .16em; color: var(--text-muted); }
.form input, .form textarea {
  font: inherit; text-transform: none; letter-spacing: normal; color: var(--text);
  background: var(--bg); border: 1px solid var(--line); padding: .8rem .9rem; border-radius: 0;
}
.form input:focus, .form textarea:focus { outline: 2px solid var(--text); outline-offset: 1px; }
.form__note { font-size: .9rem; color: var(--text-muted); }
.form__error { color: #b00020; font-size: .9rem; }
[data-theme="dark"] .form__error { color: #ff8a8a; }
@media (max-width: 720px) { .contact-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Prüfen (Browser)**

Öffne `kontakt.html`:
1. Leer absenden → Fehlermeldung „Bitte geben Sie Ihren Namen an."; ungültige E-Mail → entsprechende Meldung.
2. Gültig ausfüllen + absenden → Mailprogramm öffnet sich mit Betreff und vorausgefülltem Body (Sonderzeichen/Umlaute/lange Nachricht korrekt).
3. Fallback: sichtbare E-Mail-Adresse und Hinweis vorhanden.
4. JS deaktiviert: E-Mail-Adresse bleibt als Text/Link nutzbar.
5. Beide Themes, mobile Ansicht (Spalten stapeln).

- [ ] **Step 5: Commit**

```bash
git add kontakt.html assets/js/script.js assets/css/style.css
git commit -m "feat: Kontaktseite mit validiertem mailto-Formular"
```

---

## Task 9: Impressum & Datenschutz

**Files:**
- Create: `impressum.html`
- Create: `datenschutz.html`

**Interfaces:**
- Consumes: Canonical Head/Header/Footer (Root-Pfade), `.section`, `.page-hero`.
- Produces: `.legal` (schmaler Lesetext-Container).

- [ ] **Step 1: CSS ergänzen**

```css
.legal { max-width: 70ch; }
.legal h2 { margin-top: 2rem; }
.legal p, .legal address { color: var(--text); font-style: normal; }
```

- [ ] **Step 2: `impressum.html` erstellen**

`<title>Impressum – MS Metallbau</title>`. `<main>`:

```html
<section class="page-hero"><div class="container"><p class="eyebrow">Rechtliches</p><h1>Impressum</h1></div></section>
<section class="section"><div class="container legal">
  <h2>Angaben gemäß § 5 DDG</h2>
  <address>
    MS Metallbau – Menger &amp; Strotmann GbR<br>
    [Straße Nr.]<br>[PLZ Ort]
  </address>
  <h2>Vertreten durch</h2>
  <p>Kai [Nachname], Leon [Nachname]</p>
  <h2>Kontakt</h2>
  <p>Telefon: [Telefonnummer]<br>E-Mail: info@ms-metallbau-gbr.de</p>
  <h2>Umsatzsteuer-ID</h2>
  <p>[USt-IdNr. gemäß § 27 a UStG, falls vorhanden]</p>
  <h2>Verantwortlich für den Inhalt</h2>
  <p>Kai [Nachname], Leon [Nachname], Anschrift wie oben</p>
  <p><em>Platzhalter – bitte alle Angaben vor Veröffentlichung durch verbindliche Firmendaten ersetzen und rechtlich prüfen lassen.</em></p>
</div></section>
```

- [ ] **Step 3: `datenschutz.html` erstellen**

`<title>Datenschutz – MS Metallbau</title>`. `<main>`:

```html
<section class="page-hero"><div class="container"><p class="eyebrow">Rechtliches</p><h1>Datenschutzerklärung</h1></div></section>
<section class="section"><div class="container legal">
  <h2>Verantwortlicher</h2>
  <p>MS Metallbau – Menger &amp; Strotmann GbR, [Straße Nr.], [PLZ Ort], info@ms-metallbau-gbr.de</p>
  <h2>Hosting (GitHub Pages)</h2>
  <p>Diese Website wird bei GitHub Pages (GitHub Inc.) gehostet. Beim Aufruf werden technisch notwendige Server-Logdaten (z. B. IP-Adresse) durch den Hoster verarbeitet. [Platzhalter: ggf. auf GitHub-Datenschutz verweisen.]</p>
  <h2>Kontaktaufnahme</h2>
  <p>Das Kontaktformular öffnet Ihr eigenes E-Mail-Programm; die Übermittlung erfolgt per E-Mail an uns. Wir verarbeiten die von Ihnen gemachten Angaben (Name, E-Mail, Telefon, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b/f DSGVO).</p>
  <h2>Schriftarten</h2>
  <p>Schriftarten werden lokal von diesem Server geladen; es besteht keine Verbindung zu Servern Dritter (z. B. Google Fonts).</p>
  <h2>Ihre Rechte</h2>
  <p>Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit gemäß DSGVO. [Platzhalter: Kontaktweg für Betroffenenrechte, Hinweis auf Beschwerderecht bei der Aufsichtsbehörde.]</p>
  <p><em>Platzhalter – vor Veröffentlichung durch eine vollständige, geprüfte Datenschutzerklärung ersetzen.</em></p>
</div></section>
```

- [ ] **Step 4: Prüfen (Browser)**

Beide Seiten öffnen: Footer-Links „Impressum"/„Datenschutz" führen dorthin; Lesetext schmal; beide Themes; Konsole fehlerfrei.

- [ ] **Step 5: Commit**

```bash
git add impressum.html datenschutz.html assets/css/style.css
git commit -m "feat: Impressum- und Datenschutz-Seiten (Platzhalter)"
```

---

## Task 10: SEO/OG, Favicon & finaler QA-Durchgang

**Files:**
- Modify: alle `.html` (Open-Graph-Tags, favicon-Link)
- Create: `assets/img/og-default.jpg` (Platzhalter-Hinweis im img/README)
- Modify: `README.md` (GitHub-Pages-Anleitung + optional CNAME)

**Interfaces:**
- Consumes: alle bestehenden Seiten.

- [ ] **Step 1: Open-Graph + Favicon in jeden `<head>` einfügen**

Root-Seiten (Unterseiten mit `../`):

```html
<link rel="icon" href="assets/logo/logo.jpeg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="MS Metallbau – Menger & Strotmann GbR">
<meta property="og:title" content="MS Metallbau – Menger & Strotmann GbR">
<meta property="og:description" content="Metall in seiner schönsten Form – Geländer, Treppen, Balkone, Handläufe und Sonderkonstruktionen aus Stahl und Edelstahl.">
<meta property="og:image" content="assets/img/og-default.jpg">
```

Pro Seite `og:title`/`og:description` an den jeweiligen Seiteninhalt anpassen (gleiche Werte wie `<title>`/`meta description`).

- [ ] **Step 2: README um Deployment ergänzen**

```markdown
## GitHub Pages
1. Repo auf GitHub pushen.
2. Settings → Pages → Source: Branch `main`, Ordner `/ (root)`.
3. Nach ein paar Minuten unter der angezeigten URL erreichbar.

### Eigene Domain (optional, später)
Datei `CNAME` mit einer Zeile `ms-metallbau-gbr.de` im Root anlegen und DNS beim Registrar auf GitHub Pages zeigen lassen.
```

- [ ] **Step 3: Vollständiger QA-Durchgang (Browser)**

Prüfe jede der 10 Seiten und dokumentiere kurz (✓/Notiz):
- Alle internen Links funktionieren (Header, Footer, Kacheln, Dropdown, CTAs), keine 404.
- Theme-Toggle wirkt auf allen Seiten, Auswahl bleibt seitfest erhalten.
- Kein Theme-Flash bei „dunkel".
- mailto-Formular: Validierung + Mailöffnung.
- Galerie/Lightbox auf allen 5 Leistungsseiten.
- Responsive < 860px: Hamburger, gestapelte Layouts, kein horizontaler Scroll.
- `prefers-reduced-motion`: kein Parallax/Fade.
- DevTools-Konsole seitenübergreifend fehlerfrei.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: SEO/OG-Tags, Favicon, Deployment-Doku und finaler QA-Durchgang"
```

---

## Self-Review (durchgeführt)

- **Spec coverage:** Startseite (T3), Über uns (T5), 5 Leistungsseiten (T6/T7), Kontakt/mailto (T8), Impressum/Datenschutz (T9), Theme-Toggle+No-Flash (T1/T2), Parallax+Fade (T4), Lightbox-Galerie (T6), Schwarz/Grau/Weiß-Design & Typografie (T1), lokale Schriften (T1), Slogans (T3), Instagram (T2 Footer/T8), GitHub-Pages/`.nojekyll`/CNAME (T1/T10), SEO/OG (T10), Barrierefreiheit/reduced-motion (T2/T4/T6). Keine Lücke offen.
- **Placeholder scan:** Inhaltliche Platzhalter sind bewusst und klar markiert ([...]/PLATZHALTER); keine „TBD/TODO"-Plan-Lücken; jeder Code-Schritt enthält realen Code.
- **Type consistency:** Funktionsnamen `initTheme/initMenu/initParallax/initReveal/initLightbox/initContactForm` einheitlich zwischen Bootstrap (T2) und Definitionen (T2/T4/T6/T8). Klassen `.reveal`, `.gallery__item`, `.hero__bg`, `[data-parallax]` konsistent zwischen CSS, JS und Markup.
- **Review Focus:** mailto ohne Client (T8 Step 1/4 Fallback), JS aus (T2/T8), Theme-Flash (T2 Step 3/4), localStorage-try/catch (T2 Step 1 + No-Flash-Skript), Kodierung langer/Sonderzeichen-Nachricht (T8 Step 2/4) — alle einer Aufgabe mit Prüfschritt zugeordnet.
