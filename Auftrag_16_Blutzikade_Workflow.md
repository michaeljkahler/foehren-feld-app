# Auftrag 16 — Blutzikade-Workflow: Baumzahlen, Mehrfachauswahl, Belegproben, Export

> **Version:** v2.3.0
> **Datum:** 2026-04-20
> **Grundlage:** Rückmeldung MJ + Simon Blaser (WSL)
> **Dateien:** `foehren-feld-app.html` (DE) + `foehren-feld-app-fr.html` (FR) + `sw.js`

---

## Kontext

Der Blutzikade-Workflow wird praxistauglich gemacht. Ziel: jeden Baum nur einmal angehen. Die Änderungen betreffen Baumzahlen (5 bei T1, 20 bei T2), Schadbild-Mehrfachauswahl, Belegproben-Validierung und die Export-Zuverlässigkeit.

---

## Änderung A — T1: Kleine Bäume (BHD < 20 cm) auf 5 limitieren

### A1. addTree(): Limit anpassen

**Datei:** `foehren-feld-app.html`
**Ort:** `addTree()` Funktion, ca. Zeile 1820.

Bedingung ändern von:
```javascript
if (bhd_trees.length >= 20) {
```
zu:
```javascript
const max_small = (klasse === '<20cm' && currentTermin === 1) ? 5 : 20;
if (bhd_trees.length >= max_small) {
  alert(klasse === '<20cm' && currentTermin === 1
    ? 'Maximum 5 Fallenbäume bei Termin 1. Weitere Bäume bei Termin 2 erfassen.'
    : 'Maximum 20 Bäume pro Klasse erreicht');
  return;
}
```

### A2. renderTrees(): Progress-Bar T1 anpassen

**Ort:** `renderTrees()` Funktion, ca. Zeile 1876-1888.

T1-Progress-Bar für kleine Bäume: "x / 5" statt "x / 20".

```javascript
if (currentTermin === 1) {
  const small_max = 5;
  const small_pct_val = (small_trees.length / small_max) * 100;
  document.getElementById(smallPctId).style.width = Math.min(small_pct_val, 100) + '%';
  document.getElementById(smallPctId).textContent = `${small_trees.length} / ${small_max}`;
  document.getElementById('btn-add-small').disabled = small_trees.length >= small_max;
} else {
  // T2: 20 total
  document.getElementById(smallPctId).style.width = small_pct + '%';
  document.getElementById(smallPctId).textContent = `${small_trees.length} / 20`;
}
```

### A3. T1-Hinweistext

Im T1-Reiter (`section-termin1`) den Infobox-Text ergänzen:

> "Kleine Bäume (BHD < 20 cm): Nur die 5 Fallenbäume erfassen (Klebefalle + Spinner). Weitere 15 Bäume werden bei Termin 2 ergänzt."

**FR:** "Petits arbres (DHP < 20 cm) : Ne relever que les 5 arbres à pièges (piège collant + processionnaire). Les 15 arbres supplémentaires seront ajoutés au terme 2."

---

## Änderung B — T2: 15 zusätzliche kleine Bäume + Spinner

### B1. "Baum hinzufügen"-Button in T2

**Ort:** `section-termin2` HTML, ca. Zeile 1204 (vor `trees-container-t2`).

Neuen Button einfügen:
```html
<div class="btn-group" style="margin-bottom: 1rem;">
  <button class="btn" id="btn-add-small-t2" onclick="addTree('small')">+ BHD <20 cm (Saugschäden)</button>
</div>
```

**Kein Button für grosse Bäume bei T2** — die sind alle aus T1 übernommen.

### B2. renderTrees(): T2-Button disable-Logik

```javascript
if (currentTermin === 2) {
  const btnT2 = document.getElementById('btn-add-small-t2');
  if (btnT2) btnT2.disabled = small_trees.length >= 20;
}
```

### B3. showTreeEdit(): T2-Modal für NEUE kleine Bäume

Neue T2-Bäume (ohne Klebefalle aus T1) brauchen:
- GPS + BHD (editierbar, da neu)
- **Spinner** (Gespinstnester Ja/Nein + Anzahl) — NEU für T2-Bäume
- Saugschäden (Schadbild + Triebe + Belegprobe)
- Bemerkungen

**Logik:** Spinner-Sektion anzeigen, wenn:
```javascript
// Alt (nur T1):
${currentTermin === 1 ? `<!-- Spinner -->` : ''}

// Neu (T1 ODER T2 wenn Baum noch keinen Spinner-Eintrag hat und neu bei T2):
const isNewT2Tree = currentTermin === 2 && !tree._from_t1;
${(currentTermin === 1 || (currentTermin === 2 && tree.bhd_klasse === '<20cm')) ? `<!-- Spinner -->` : ''}
```

**Wichtig:** Spinner wird bei T2 auch für die 5 T1-Fallenbäume angezeigt, falls sie dort noch nicht erfasst wurden. Aber Hauptzielgruppe sind die 15 neuen T2-Bäume.

**Vereinfachung:** Spinner-Sektion für ALLE kleinen Bäume bei T2 anzeigen (die 5 T1-Bäume haben es schon, können es aber aktualisieren; die 15 neuen erfassen es erstmalig).

### B4. showTreeEdit(): BHD + GPS für neue T2-Bäume editierbar

Aktuell: BHD + GPS sind bei T2 readonly. Neue T2-Bäume müssen diese Felder aber noch erfassen.

**Erkennung neuer T2-Bäume:** Ein Baum, der bei T2 hinzugefügt wurde, hat noch kein GPS (`tree.lat === null`). Alternativ: Neues Feld `tree.termin_erstellt` beim Anlegen setzen.

```javascript
// In addTree(), nach tree-Objekt erstellen:
tree.termin_erstellt = currentTermin;  // 1 oder 2
```

Im Modal:
```javascript
const isReadonly = currentTermin === 2 && tree.termin_erstellt !== 2;
// BHD: readonly nur wenn T2 UND Baum stammt aus T1
${isReadonly ? 'readonly style="background:#f0f0f0;"' : ''}
// GPS: "aus T1 übernommen" nur wenn isReadonly
```

### B5. T2 kleine Bäume: Status-Icons erweitern

**Ort:** `renderTrees()`, T2 small tree icons (ca. Zeile 1914-1916).

```javascript
// Bisher:
statusIcons = `🪤... 🔬...`;

// Neu: + Spinner-Icon
const hasSpinnerT2 = (app.data.spinner || []).some(s => s.baum_id === tree.baum_id);
statusIcons = `<span title="Spinner">${hasSpinnerT2 ? '🐛✅' : '🐛⬜'}</span> ` +
  (hasFalle ? `<span title="Fallenabbau">${'🪤✅'}</span> ` : '') +
  `<span title="Saugschäden">${hasSaugschaeden ? '🔬✅' : '🔬⬜'}</span>`;
```

---

## Änderung C — Schadbild-Karussell: Mehrfachauswahl

### C1. selectSchadbild(): Toggle statt Einzelauswahl

**Ort:** `selectSchadbild()` Funktion, ca. Zeile 2382-2399.

Komplett ersetzen:
```javascript
function selectSchadbild(card, value) {
  // Toggle: Karte an/aus
  const isSelected = card.style.border.includes('#28a745');
  if (isSelected) {
    card.style.border = '3px solid var(--color-border)';
    card.style.background = 'white';
  } else {
    card.style.border = '3px solid #28a745';
    card.style.background = '#d4edda';
  }

  // Alle aktuell selektierten Karten sammeln
  const cards = card.parentElement.querySelectorAll('.schadbild-card');
  const selected = [];
  cards.forEach(c => {
    if (c.style.border.includes('#28a745')) {
      selected.push(c.dataset.schadbild);
    }
  });

  // Hidden field: kommasepariert
  document.getElementById('edit-schadbild').value = selected.join(',');

  // Status-Anzeige aktualisieren
  const labels = {
    blutzikade:'Blutzikade', rostpilz:'Rostpilz', kiefernschuette:'Kiefernschütte',
    scheidenruessler:'Scheidenrüssler', blattkaefer:'Blattkäfer', rotband:'Rotband', unklar:'Unklar'
  };
  const status = document.getElementById('schadbild-status');
  if (selected.length > 0) {
    status.style.background = '#d4edda';
    status.innerHTML = '✅ Bestimmt: <strong>' + selected.map(s => labels[s] || s).join(', ') + '</strong>';
  } else {
    status.style.background = '#fff3cd';
    status.innerHTML = '⚠️ Bitte Schadbild auswählen';
  }
}
```

### C2. Karussell-Template: Mehrfach-Highlighting

**Ort:** Schadbild-Karten im Template (ca. Zeile 2169).

Aktuell prüft `schaeden_data.schadbild_bestimmung === s.id` (exakter String-Match).
Neu: Prüfen ob `s.id` im kommaseparierten String enthalten ist.

```javascript
const selectedSchadbilder = (schaeden_data.schadbild_bestimmung || '').split(',');
// Im Template pro Karte:
const isSelected = selectedSchadbilder.includes(s.id);
// border: isSelected ? '#28a745' : 'var(--color-border)'
// background: isSelected ? '#d4edda' : 'white'
```

### C3. Datenmodell

`schadbild_bestimmung` bleibt ein String, aber enthält nun kommaseparierte Werte:
- Vorher: `"blutzikade"`
- Nachher: `"blutzikade,rostpilz"` oder `"blutzikade"`

Rückwärtskompatibel: bestehende Einzelwerte funktionieren weiterhin.

### C4. Status-Anzeige im Template

**Ort:** `schadbild-status` div (ca. Zeile 2176-2178).

Anpassen für Mehrfach-Anzeige:
```javascript
${selectedSchadbilder.filter(s => s).length > 0
  ? '✅ Bestimmt: <strong>' + selectedSchadbilder.filter(s => s).map(s => labels[s] || s).join(', ') + '</strong>'
  : '⚠️ Bitte Schadbild auswählen'}
```

---

## Änderung D — Hilfetext: Fokus Blutzikade

### D1. Instruktionstext im Modal

**Ort:** Ca. Zeile 2154-2155. Ersetzen:

Alt:
> "Welches Schadbild passt am besten? Bild antippen und bestätigen."

Neu:
> "**Fokus Blutzikade:** Primär nach Saugschäden der Blutzikade suchen. Falls weitere Schadbilder erkennbar sind, können mehrere Karten ausgewählt werden (Mehrfachauswahl)."

**FR:**
> "**Focus cicadelle :** Rechercher en priorité les dégâts de succion de la cicadelle. Si d'autres symptômes sont visibles, plusieurs cartes peuvent être sélectionnées (sélection multiple)."

### D2. Trieb-Instruktionstext

**Ort:** Ca. Zeile 2180-2181. Ersetzen:

Alt:
> "5 sonnenexponierte Triebe untersuchen — Anteil befallener Nadeln in % schätzen."

Neu:
> "5 sonnenexponierte Triebe untersuchen — nur **Blutzikade-Saugschäden** beurteilen. Anteil der befallenen Nadeln (%) pro Trieb schätzen."

**FR:**
> "Examiner 5 pousses exposées au soleil — évaluer uniquement les **dégâts de succion de la cicadelle**. Estimer le pourcentage d'aiguilles atteintes par pousse."

---

## Änderung E — Belegprobe: Min 3, Max 5, Max 1 pro Baum

### E1. Hilfetext im Modal

**Ort:** Vor dem Belegprobe-Toggle (ca. Zeile 2194). Neuen Hilfetext einfügen:

```html
<div class="info-box" style="margin-top: 0.75rem; margin-bottom: 0.5rem; font-size: 0.8rem;">
  📋 <strong>Belegproben:</strong> Min. 3, max. 5 Proben total. Max. 1 pro Baum.
  Je eine Probe pro Sack, idealerweise mit Schäden.
  Falls keine Schäden sichtbar: trotzdem 3–5 Äste sammeln und kühlen.
</div>
```

**FR:**
```html
<div class="info-box" style="margin-top: 0.75rem; margin-bottom: 0.5rem; font-size: 0.8rem;">
  📋 <strong>Échantillons :</strong> Min. 3, max. 5 échantillons au total. Max. 1 par arbre.
  Un échantillon par sac, de préférence avec des dégâts.
  Si aucun dégât visible : collecter quand même 3–5 rameaux et réfrigérer.
</div>
```

### E2. Toggle-Validierung im Modal

**Ort:** Im onclick des "Ja"-Buttons (ca. Zeile 2199).

Vor dem Setzen auf `true` prüfen:
```javascript
onclick="(() => {
  const currentCount = (app.data.blutzikade.schaeden || [])
    .filter(s => s.belegprobe_gesammelt && s.baum_id !== '${baum_id}').length;
  if (currentCount >= 5) {
    alert('Maximum 5 Belegproben bereits erreicht.');
    return;
  }
  document.getElementById('edit-belegprobe').value='true';
  this.classList.add('active');
  this.previousElementSibling.classList.remove('active');
})()"
```

### E3. Anzeige aktueller Proben-Stand im Modal

Unter dem Toggle eine Live-Anzeige einfügen:
```html
<div id="belegprobe-counter" style="font-size: 0.8rem; color: var(--color-muted); margin-top: 0.25rem;">
  Belegproben: ${belegprobe_count} / 5 ${belegprobe_count < 3 ? '⚠️ Minimum 3' : '✅'}
</div>
```

Dabei: `belegprobe_count` beim Rendern des Modals berechnen:
```javascript
const belegprobe_count = (app.data.blutzikade.schaeden || []).filter(s => s.belegprobe_gesammelt).length;
```

---

## Änderung F — Resultate-Dashboard: Belegproben x/5

### F1. Saugschäden-Anzeige erweitern

**Ort:** `renderResultateDashboard()`, Blutzikade-Karte (ca. Zeile 2568-2573).

Alt:
```javascript
<div>Ø ${c2_avg.toFixed(1)}% | Proben: ${belegproben}</div>
```

Neu:
```javascript
<div>Ø ${c2_avg.toFixed(1)}%</div>
<div style="margin-top: 0.25rem; ${belegproben < 3 ? 'color: #dc3545; font-weight: bold;' : 'color: #28a745;'}">
  ${belegproben < 3 ? '⚠️' : '✅'} Belegproben: ${belegproben} / 5
  ${belegproben < 3 ? ' — Minimum 3 benötigt!' : ''}
</div>
```

### F2. Saugschäden-Detail-Zusammenfassung

**Ort:** `renderSaugschadenZusammenfassungResultate()` (ca. Zeile 3320-3350).

Belegproben-Zeile erweitern: Welche Bäume haben Proben?
```javascript
const proben_baeume = schaeden.filter(s => s.belegprobe_gesammelt).map(s => s.baum_id);
html += `<div>Belegproben: ${proben_baeume.length} / 5 (${proben_baeume.join(', ') || 'keine'})</div>`;
if (proben_baeume.length < 3) {
  html += `<div style="color: #dc3545; font-weight: bold;">⚠️ Minimum 3 Belegproben benötigt!</div>`;
}
```

---

## Änderung G — CSV-Export: 3 einzelne Download-Buttons

### G1. exportCSV() aufteilen

**Ort:** `exportCSV()` Funktion (ca. Zeile 3416-3529).

Die eine `exportCSV()` Funktion in 3 einzelne Funktionen aufteilen:
```javascript
function exportCSV_Standort() { ... downloadCSV(standort_csv, filename); }
function exportCSV_Baeume() { ... downloadCSV(baum_csv, filename); }
function exportCSV_Fallen() { ... downloadCSV(fallen_csv, filename); }
```

### G2. Export-Reiter: 3 Buttons statt 1

**Ort:** `section-export` HTML (ca. Zeile 1240-1260).

Alt:
```html
<button onclick="exportCSV()">📄 CSV exportieren (3 Dateien)</button>
```

Neu:
```html
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <button class="btn btn-full" onclick="exportCSV_Standort()">📄 CSV Standort-Daten</button>
  <button class="btn btn-full" onclick="exportCSV_Baeume()">📄 CSV Baum-Daten</button>
  <button class="btn btn-full" onclick="exportCSV_Fallen()">📄 CSV Klebefallen-Daten</button>
</div>
```

### G3. Alte exportCSV() beibehalten als Fallback

Optional: Die alte `exportCSV()` als Convenience-Wrapper behalten, die alle 3 mit Delay aufruft:
```javascript
async function exportCSV() {
  exportCSV_Standort();
  await new Promise(r => setTimeout(r, 300));
  exportCSV_Baeume();
  await new Promise(r => setTimeout(r, 300));
  exportCSV_Fallen();
}
```

---

## Änderung H — Service Worker

### H1. Cache-Version erhöhen

**Datei:** `sw.js`
```javascript
const CACHE_NAME = 'foehren-app-v2.3.0';
```

Keine neuen Assets nötig.

---

## Zusammenfassung der betroffenen Stellen

| Datei | Bereich | Änderung |
|-------|---------|----------|
| `.html` | `addTree()` (~Z.1820) | T1 kleine Bäume: Limit 5 |
| `.html` | `renderTrees()` (~Z.1876) | Progress-Bar "x/5" bei T1, Icons T2 +Spinner |
| `.html` | `section-termin1` HTML (~Z.1145) | Hinweis: "nur 5 Fallenbäume" |
| `.html` | `section-termin2` HTML (~Z.1204) | Button "+ BHD <20 cm" |
| `.html` | `addTree()` | `termin_erstellt` Feld setzen |
| `.html` | `showTreeEdit()` (~Z.1939) | Spinner auch bei T2 kleine Bäume; BHD/GPS editierbar für neue T2-Bäume |
| `.html` | `selectSchadbild()` (~Z.2382) | Toggle-Logik statt Einzelauswahl |
| `.html` | Karussell-Template (~Z.2160) | Mehrfach-Highlighting |
| `.html` | Hilfetext (~Z.2154) | "Fokus Blutzikade, Mehrfachauswahl" |
| `.html` | Trieb-Text (~Z.2180) | "nur Blutzikade-Saugschäden" |
| `.html` | Belegprobe Toggle (~Z.2194) | Max-5-Validierung + Hilfetext + Counter |
| `.html` | Resultate (~Z.2568) | "Belegproben x/5" + Warnung < 3 |
| `.html` | `exportCSV()` (~Z.3416) | Aufteilen in 3 Funktionen |
| `.html` | Export-HTML (~Z.1240) | 3 einzelne Download-Buttons |
| `-fr.html` | Alle obigen Stellen | FR-Übersetzungen |
| `sw.js` | Cache-Version | v2.1.0 → v2.3.0 |

---

## Nicht betroffen

- `saveTreeEdit()`: Minimal-Anpassung (schadbild_bestimmung ist bereits String, kommasepariert ist kompatibel)
- `backupToJSON()` / `loadJSON()`: Keine Änderung (exportiert gesamtes app.data)
- Referenzbilder: Keine neuen Bilder
- `manifest.json`: Keine Änderung
- GeoJSON-Export: `schadbild_bestimmung` bleibt String-Feld (kommasepariert ist OK)

---

## Workflow-Übersicht nach Änderung

### Termin 1 (April)
| Baumtyp | Anzahl | Felder |
|---------|--------|--------|
| BHD ≥ 20 cm | bis 20 | GPS, BHD, KV (SANASILVA), Diplodia (erste 10), Spinner |
| BHD < 20 cm | **5** (Fallenbäume) | GPS, BHD, Spinner, Klebefalle-Installation |

### Termin 2 (Mai)
| Baumtyp | Anzahl | Felder |
|---------|--------|--------|
| BHD ≥ 20 cm | aus T1 | BHD/GPS readonly, KV aktualisieren, Diplodia aktualisieren |
| BHD < 20 cm (T1) | 5 | BHD/GPS readonly, Spinner (aktualisieren), Klebefalle-Abbau, Saugschäden |
| BHD < 20 cm (**neu T2**) | **+15** | GPS, BHD, **Spinner**, Saugschäden (Schadbild + Triebe + Belegprobe) |

**Ziel: Jeden Baum nur einmal angehen.**

---

*Ende Auftrag 16 — 2026-04-20*
