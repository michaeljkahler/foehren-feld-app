# Auftrag 14 — Termin-basierte Reiter + Bugfixes + Schadbild-Erweiterung

> **Version:** v2.1.0
> **Datum:** 2026-04-08
> **Ziel:** 5 Reiter nach Feld-Workflow: Standort → Termin 1 → Termin 2 → Resultate → Export. Bugfixes im Resultate-Dashboard. Schadbild-Karussell um 3 Bilder erweitern. Speicher-Bestätigung pro Block.

---

## 1. Übersicht

### Ist (v2.0) → Soll (v2.1)

```
v2.0: 🗺️ Standort → 🌲 Bäume → 📊 Resultate → 📤 Export
      + Termin-Toggle oben (T1/T2 Knöpfe)

v2.1: 🗺️ Standort → 🌲 Termin 1 → 🌿 Termin 2 → 📊 Resultate → 📤 Export
      Kein Termin-Toggle mehr — der Reiter IST der Termin
```

### Prinzip

| Reiter | Inhalt | Kontext |
|--------|--------|---------|
| 🗺️ Standort | Plot-Info, GPS, Vegetation, Polytrap, Zapfen, Methodenkritik | Terminneutral, einmalig |
| 🌲 Termin 1 | Baumliste → Modal mit T1-Feldern | April-Aufnahme |
| 🌿 Termin 2 | Gleiche Baumliste → Modal mit T2-Feldern | Mai-Aufnahme |
| 📊 Resultate | Dashboard mit allen Zusammenfassungen | Terminneutral |
| 📤 Export | CSV, GeoJSON, JSON-Backup | Terminneutral |

---

## 2. Reiter-Details

### 🗺️ Standort (terminneutral)

Wie v2.0, keine Änderung am Inhalt:

```
📋 Aufnahme-Info (Plot-ID, Aufnehmer, Datum T1/T2)
📍 GPS & Lage
🌿 Bestandesbeschreibung
🪤 Insektenfalle / Polytrap
🍄 Diplodia — Zapfensammlung
📝 Methodenkritik
```

**NEU: Speicher-Buttons** — Jeder `<details>`-Block bekommt am Ende einen visuellen Speicher-Button:
```html
<button class="btn btn-save" onclick="confirmSave(this)">💾 Speichern</button>
```
Nach Klick → Button wird grün: `✅ Gespeichert`
(Daten werden weiterhin auto-gespeichert via onChange, der Button ist rein visuelles Feedback.)

### 🌲 Termin 1 (April)

Baumliste mit Status-Icons. Modal zeigt **nur T1-Felder**:

#### Grosser Baum (≥20cm) — T1-Modal:
```
📏 BHD + 📍 GPS
🌳 Kronenverlichtung (SANASILVA)
🍄 Diplodia (erste 10 Bäume)
🐛 Spinner — Gespinstnester
💬 Bemerkungen
```

#### Kleiner Baum (<20cm) — T1-Modal:
```
📏 BHD + 📍 GPS
🐛 Spinner — Nester (ohne Hilfsmittel)
🪤 Klebefalle → Toggle Ja/Nein
    wenn Ja: Abstand Boden, Exposition, Datum Installation
💬 Bemerkungen
```

**Keine Saugschäden, kein Schadbild-Karussell, kein Fallenabbau bei T1.**

#### Status-Icons Baumliste (T1):
- Grosse Bäume: 📍 🍄 🐛
- Kleine Bäume: 📍 🐛 🪤

### 🌿 Termin 2 (Mai)

**Gleiche Baumliste**, gleiches Baum-Modal — aber nur T2-Felder:

#### Grosser Baum (≥20cm) — T2-Modal:
```
📏 BHD (readonly) + 📍 GPS (readonly)
🌳 Kronenverlichtung aktualisieren
🍄 Diplodia aktualisieren (falls bereits erfasst)
💬 Bemerkungen
```

**Kein Spinner bei T2** — T1-Daten sind final.

#### Kleiner Baum (<20cm) — T2-Modal:
```
📏 BHD (readonly) + 📍 GPS (readonly)
🪤 Klebefalle Abbau (nur wenn bei T1 Falle = Ja)
    Datum Abbau, Anzahl Zikaden, Verdachtsprobe WSS
    → auto: Expositionsdauer, Nachweis
🪤 Saugschäden — Schadbild-Karussell (7 Bilder)
    + 5 Triebe × % befallene Nadeln
    + Belegprobe Ja/Nein
💬 Bemerkungen
```

**Kein Spinner bei T2. Kein Klebefalle-Installation (das war T1).**

#### Status-Icons Baumliste (T2):
- Grosse Bäume: 🌳 (KV aktualisiert?)
- Kleine Bäume: 🪤 (Fallenabbau) 🪤 (Saugschäden)

#### Standort-Zusammenfassung oben im T2-Reiter:
Kompakte, nicht-editierbare Zusammenfassung der Standortdaten:
```
📍 SH_01 | 47.6823° N | 8.6343° E | 780 m ü.M.
🌲 12 grosse + 8 kleine Bäume | 🪤 5 Fallen installiert (T1)
```

---

## 3. Termin-Toggle entfernen

Der aktuelle Termin-Toggle (zwei Buttons oben im Header) wird entfernt. Stattdessen:

```javascript
// Global variable wird vom aktiven Reiter gesetzt:
// Termin 1-Reiter → currentTermin = 1
// Termin 2-Reiter → currentTermin = 2
// Standort/Resultate/Export → currentTermin bleibt unverändert
```

In `switchSection()`:
```javascript
if (sectionId === 'section-termin1') {
  currentTermin = 1;
  renderTrees();
}
if (sectionId === 'section-termin2') {
  currentTermin = 2;
  renderTrees();
}
```

---

## 4. Bugfix: Resultate-Dashboard

### Bug 1: GPS wird als "Nicht erfasst" angezeigt

**Ursache:** Dashboard prüft `standort.lat` — korrekt ist `standort.koordinate_lat`.

**Fix:**
```javascript
// ALT:
const hasGPS = standort.lat && standort.lon;
// NEU:
const hasGPS = standort.koordinate_lat && standort.koordinate_lon;
```

Ebenso in der Anzeige:
```javascript
// ALT:
standort.lat.toFixed(4)
// NEU:
standort.koordinate_lat.toFixed(4)
```

### Bug 2: Bestandestyp wird als "—" angezeigt

**Ursache:** Dashboard prüft `standort.bestandestyp` — dieses Feld existiert nicht.

**Fix:**
```javascript
// ALT:
standort.bestandestyp || '—'
// NEU:
standort.waldgesellschaft || '—'
```

Und bei `standortComplete`:
```javascript
// ALT:
const standortComplete = hasGPS && hasExpo && hasVH && standort.bestandestyp;
// NEU:
const standortComplete = hasGPS && hasExpo && hasVH && standort.waldgesellschaft;
```

---

## 5. Schadbild-Karussell erweitern (3 → 7 Bilder)

### Aktuelle 4 Karten (3 Bilder + Unklar):
1. 🪤 Blutzikade — Saugschäden
2. 🍂 Rostpilz — Coleosporium
3. 🍂 Kiefernschütte — Lophodermium
4. ❓ Unklar

### Neue 7 Karten (6 Bilder + Unklar):
1. 🪤 Blutzikade — Saugschäden (Haematoloma dorsata)
2. 🍂 Rostpilz — Coleosporium senecionis
3. 🍂 Kiefernschütte — Lophodermium
4. **🐛 Scheidenrüssler — Brachonyx pineti** ← NEU
5. **🪲 Blattkäfer — Luperus pinicola** ← NEU
6. **🔴 Rotband — Dothistroma/Lecanosticta** ← NEU
7. ❓ Unklar

### Quellbilder (aus Foehrennadeln_Bilder/):
| Nr. | Quelldatei | Zieldatei | Resize |
|-----|-----------|-----------|--------|
| 4 | `07_Kiefernscheidenruessler_Brachonix_pineti.jpeg` | `ref_scheidenruessler.jpeg` | 400px, ~25KB |
| 5 | `08_Kiefernblattkaefer_Luperus_pinicola_1.jpeg` | `ref_blattkaefer.jpeg` | 400px, ~25KB |
| 6 | `10_Rotband_Braunfleckenkrankheit_Dothistroma_Lecanosticta.tiff` | `ref_rotband.jpeg` | 400px, ~25KB |

### Datenmodell:
`schadbild_bestimmung` bekommt 3 neue Werte:
- `scheidenruessler`
- `blattkaefer`
- `rotband`

CSV- und GeoJSON-Export bleiben unverändert (Spalte existiert, neue Werte fliessen automatisch).

### Service Worker:
3 neue Bilder in `sw.js` ASSETS-Array + Cache-Version hochsetzen.

### Ziel:
Studierende können häufige Falsch-Positiv-Kandidaten besser von echten Blutzikade-Saugschäden unterscheiden.

---

## 6. Speicher-Bestätigung pro Block

### Konzept:
Jeder `<details>`-Block im Standort-Reiter bekommt am Ende einen Button:

```html
<button class="btn btn-save" onclick="confirmSave(this)">💾 Speichern</button>
```

### Verhalten:
```javascript
function confirmSave(btn) {
  storage.save(app.data);
  btn.textContent = '✅ Gespeichert';
  btn.style.background = '#d4edda';
  btn.style.color = '#155724';
  setTimeout(() => {
    btn.textContent = '💾 Speichern';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}
```

### Wo überall:
- 📋 Aufnahme-Info
- 📍 GPS & Lage
- 🌿 Bestandesbeschreibung
- 🪤 Polytrap
- 🍄 Zapfensammlung
- 📝 Methodenkritik

Die Daten werden weiterhin auto-gespeichert (onChange). Der Button ist **visuelles Feedback** für die Nutzer.

---

## 7. Arbeitsschritte

1. **Navigation:** 4 → 5 Buttons (Standort, Termin 1, Termin 2, Resultate, Export)
2. **Termin-Toggle** im Header entfernen (Buttons T1/T2)
3. **section-baeume** aufteilen in `section-termin1` + `section-termin2`
4. **switchSection()**: currentTermin per Reiter setzen
5. **showTreeEdit()**: Bestehende Termin-Logik funktioniert weiterhin (prüft `currentTermin`)
6. **renderTrees()**: Icons je nach currentTermin anpassen
7. **T2-Reiter**: Kompakte Standort-Zusammenfassung oben einfügen
8. **Bugfix Resultate**: `koordinate_lat`, `waldgesellschaft`
9. **Schadbild-Karussell**: 3 neue Bilder resizen + ins Karussell + SW-Cache
10. **Speicher-Buttons**: `confirmSave()` Funktion + Buttons in alle Standort-Blöcke
11. **FR-Version**: Alle Änderungen spiegeln
12. **Verifikation**

---

## 8. Datenmodell-Kompatibilität

Keine Breaking Changes:
- `currentTermin` wird weiterhin als 1 oder 2 gesetzt
- `app.data` Struktur bleibt identisch
- Bestehende JSON-Backups bleiben voll kompatibel
- `schadbild_bestimmung` akzeptiert die 3 neuen Werte ohne Schemaänderung

---

*Ende Auftrag_14_Termin_Reiter.md — 2026-04-08*
