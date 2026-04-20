# Auftrag 15 — Deckungsgrad Gräser/Kräuter + T2-Vereinfachung grosse Bäume

> **Version:** v2.2.0
> **Datum:** 2026-04-13
> **Grundlage:** Mail Simon Blaser (WSL) vom 10./11.04.2026
> **Dateien:** `foehren-feld-app.html` (DE) + `foehren-feld-app-fr.html` (FR)

---

## Kontext

Simon Blaser (WSL) wünscht zwei Anpassungen:

1. **Neues Standortfeld:** Geschätzter Deckungsgrad (%) von Gräsern und Kräutern an der Gesamtbodenbedeckung — als summarische Schätzung für die Fläche BHD < 20 cm. Gräser und Kräuter werden NICHT getrennt. Hintergrund: Larven der Kiefernblutzikade entwickeln sich an diesen Pflanzen.

2. **T2-Vereinfachung grosse Bäume (≥ 20 cm):** Bei Termin 2 müssen grosse Bäume NICHT nochmals geprüft werden. Kronenverlichtung und Diplodia-Kronenbefall entfallen im T2-Modal für grosse Bäume.

---

## Änderung A — Neues Standortfeld: Deckungsgrad Gräser/Kräuter

### A1. HTML: Neues Feld im Standort-Reiter

**Datei:** `foehren-feld-app.html`
**Ort:** Im `<details>` Block "🌲 Bestandesbeschreibung" (ca. Zeile 790), NACH dem Bodenvegetation-Container, VOR dem Waldgesellschaft-Feld.

Neues `<div class="form-group">` einfügen:

```html
<div class="form-group">
  <label>Deckungsgrad Gräser & Kräuter — Verjüngungsfläche BHD &lt;20 cm (%)</label>
  <p style="font-size: 0.8rem; color: var(--color-muted); margin: -0.25rem 0 0.5rem;">
    Geschätzter Anteil von Gräsern und Kräutern an der Gesamtbodenbedeckung im Bereich der kleinen Föhren.
  </p>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <input type="range" class="slider" id="deckungsgrad_graeser_kraeuter" 
           min="0" max="100" step="5" value="0"
           oninput="document.getElementById('deckungsgrad_graeser_kraeuter_val').textContent = this.value + '%'">
    <span id="deckungsgrad_graeser_kraeuter_val" style="font-weight: bold; min-width: 3rem;">0%</span>
  </div>
</div>
```

**FR-Version:** `foehren-feld-app-fr.html`, gleiche Stelle.
- Label: `Taux de recouvrement graminées & herbacées — surface de régénération DHP <20 cm (%)`
- Hilfetext: `Part estimée des graminées et herbacées dans la couverture totale du sol dans la zone des petits pins.`

### A2. JavaScript: Feld in initStandort() registrieren

**Ort:** `initStandort()` Funktion, Array `fields` (ca. Zeile 1408).

`'deckungsgrad_graeser_kraeuter'` zum Array hinzufügen. Damit wird:
- Beim Laden der Wert aus `app.data.standort` ins Feld geschrieben
- Beim `change`-Event automatisch in `app.data.standort` gespeichert

**Zusätzlich:** Nach der fields-Schleife den Slider-Wert-Sync initialisieren:
```javascript
const dgSlider = document.getElementById('deckungsgrad_graeser_kraeuter');
if (dgSlider) {
  document.getElementById('deckungsgrad_graeser_kraeuter_val').textContent = dgSlider.value + '%';
}
```

### A3. Resultate-Dashboard: Deckungsgrad anzeigen

**Ort:** `updateResultate()` Funktion, im Standort-Abschnitt (ca. Zeile 2456-2460).

Neue Zeile nach "Tote Föhren" einfügen:
```javascript
<div>Deckungsgrad Gräser/Kräuter (Verjüngung): ${standort.deckungsgrad_graeser_kraeuter || 0}%</div>
```

**FR:** `Recouvrement graminées/herbacées (régénération): ${standort.deckungsgrad_graeser_kraeuter || 0}%`

### A4. CSV-Export: Neues Feld exportieren

**Ort:** `exportCSV()` Funktion, Standort-CSV.

Feld `'deckungsgrad_graeser_kraeuter'` zu `standort_headers` und `standort_vals` Arrays hinzufügen (ca. Zeile 3389-3410).

### A5. GeoJSON-Export: Neues Feld exportieren

**Ort:** `exportGeoJSON()` Funktion, Standort-Feature properties (ca. Zeile 3536).

Neue Property: `deckungsgrad_graeser_kraeuter: standort.deckungsgrad_graeser_kraeuter || 0`

### A6. JSON-Backup: Keine Änderung nötig

Das JSON-Backup exportiert `app.data` komplett — das neue Feld wird automatisch mitgesichert.

---

## Änderung B — T2-Vereinfachung: Keine Kronenverlichtung + Diplodia bei Termin 2

### B1. showTreeEdit(): Kronenverlichtung nur bei T1

**Ort:** `showTreeEdit()` Funktion, Kronenverlichtung-Block (ca. Zeile 1978).

Bedingung ändern von:
```javascript
${tree.bhd_klasse === '>20cm' ? `
```
zu:
```javascript
${tree.bhd_klasse === '>20cm' && currentTermin === 1 ? `
```

Damit wird der SANASILVA-Slider bei Termin 2 nicht mehr angezeigt.

### B2. showTreeEdit(): Diplodia nur bei T1

**Ort:** `showTreeEdit()` Funktion, Diplodia-Block (ca. Zeile 1996).

Bedingung ändern von:
```javascript
${show_diplodia ? `
```
zu:
```javascript
${show_diplodia && currentTermin === 1 ? `
```

Und die Fallback-Meldung "Diplodia-Limit erreicht" ebenfalls einschränken:
```javascript
` : (tree.bhd_klasse === '>20cm' && currentTermin === 1 ? `
```

### B3. showTreeEdit(): Info-Hinweis bei T2 für grosse Bäume

Optional: Im T2-Modal für grosse Bäume einen Hinweis anzeigen, dass die Daten aus T1 übernommen werden:

```javascript
${tree.bhd_klasse === '>20cm' && currentTermin === 2 ? `
<div class="info-box" style="margin-top: 1rem;">
  ℹ️ Kronenverlichtung und Diplodia wurden bei Termin 1 erfasst und werden nicht aktualisiert.
</div>
` : ''}
```

**FR:** `ℹ️ La défoliation et Diplodia ont été relevés au terme 1 et ne sont pas mis à jour.`

### B4. saveTreeEdit(): Keine Änderung nötig

Die Save-Logik prüft bereits, ob die DOM-Elemente existieren (`if (kv_elem)`, `if (ast1_el)`). Da die Felder im T2-Modal nicht gerendert werden, werden sie automatisch nicht überschrieben.

### B5. T2-Baumliste: Icons anpassen

**Ort:** `renderTrees()` Funktion — Status-Icons für grosse Bäume bei T2.

Bei T2 sollten grosse Bäume KEINE 🍄- und 🌳-Icons mehr zeigen (da nichts zu tun ist), sondern nur einen ✅-Hinweis "T1-Daten übernommen" oder ein reduziertes Icon-Set.

**Vorschlag:** Grosser Baum bei T2 zeigt:
- ✅ statt 🌳 (KV) — "Aus T1 übernommen"
- Kein 🍄 (Diplodia) — nicht relevant bei T2

### B6. Resultate-Dashboard: Beschriftung anpassen

Im Resultate-Dashboard bei Kronenverlichtung/Diplodia klarstellen, dass es sich um T1-Daten handelt:
- `Kronenverlichtung (T1)` statt `Kronenverlichtung`
- `Diplodia Kronenbefall (T1)` statt `Diplodia Kronenbefall`

---

## Änderung C — Service Worker aktualisieren

### C1. Cache-Version erhöhen

**Datei:** `sw.js`
```javascript
const CACHE_NAME = 'foehren-app-v2.2.0';
```

Keine neuen Assets nötig (kein neues Bild o.ä.).

---

## Zusammenfassung der betroffenen Stellen

| Datei | Bereich | Änderung |
|-------|---------|----------|
| `foehren-feld-app.html` | Standort HTML (~Z.790) | Neues Feld Deckungsgrad |
| `foehren-feld-app.html` | `initStandort()` (~Z.1408) | Feld registrieren |
| `foehren-feld-app.html` | `showTreeEdit()` (~Z.1978) | KV nur bei T1 |
| `foehren-feld-app.html` | `showTreeEdit()` (~Z.1996) | Diplodia nur bei T1 |
| `foehren-feld-app.html` | `showTreeEdit()` (neu) | Info-Hinweis T2 grosse Bäume |
| `foehren-feld-app.html` | `renderTrees()` | T2-Icons grosse Bäume anpassen |
| `foehren-feld-app.html` | `updateResultate()` (~Z.2456) | Deckungsgrad anzeigen + T1-Labels |
| `foehren-feld-app.html` | `exportCSV()` (~Z.3389) | Deckungsgrad in CSV |
| `foehren-feld-app.html` | `exportGeoJSON()` (~Z.3536) | Deckungsgrad in GeoJSON |
| `foehren-feld-app-fr.html` | Alle obigen Stellen | Identische Änderungen, FR-Texte |
| `sw.js` | Cache-Version | v2.1.0 → v2.2.0 |

---

## Nicht betroffen

- `saveTreeEdit()`: Keine Änderung nötig (DOM-Prüfung reicht)
- `backupToJSON()` / `loadJSON()`: Keine Änderung nötig (exportiert gesamtes app.data)
- Referenzbilder: Keine neuen Bilder nötig
- `manifest.json`: Keine Änderung nötig

---

*Ende Auftrag 15 — 2026-04-13*
