# Auftrag 13 — Vereinfachung auf 4 Reiter

> **Version:** v2.0.0
> **Datum:** 2026-04-08
> **Ziel:** App von 6 auf 4 Reiter reduzieren. Alles Baumspezifische ins Baum-Modal, alles Standortbezogene in den Standort-Reiter. Minimaler Seitenwechsel im Feld.

---

## 1. Übersicht: Ist → Soll

### Ist-Zustand (6 Reiter)

```
🗺️ Standort → 🍄 Diplodia → 🐛 Spinner → 🪤 Blutzikade → 📊 Resultate → 📤 Export
```

### Soll-Zustand (4 Reiter)

```
🗺️ Standort → 🌲 Bäume → 📊 Resultate → 📤 Export
```

---

## 2. Reiter-Aufbau im Detail

### 🗺️ Reiter 1: Standort

Alles was **einmal pro Plot** erfasst wird, kommt hier rein.

```
🗺️ Standort
├── 📋 Aufnahme-Info (wie bisher)
│   ├── Plot-ID, Aufnehmer, Datum T1/T2
│   └── ...
│
├── 📍 GPS & Lage (wie bisher)
│   ├── GPS-Knopf, Höhe, Exposition
│   └── ...
│
├── 🌿 Bestandesbeschreibung (wie bisher)
│   ├── Baumartenmischung, Bodenvegetation, Waldgesellschaft
│   ├── Tote Föhren, Bodengruendigkeit
│   └── ...
│
├── 🪤 Insektenfalle / Polytrap              ← NEU (verschoben aus Blutzikade C1b)
│   ├── Status: [Installiert ○ / Geleert & entfernt ○]
│   ├── Datum Installation: [____]            (T1)
│   ├── Proben-ID: [____]                    (z.B. PT-SH01-2026)
│   ├── Datum Abbau: [____]                  (nur T2, wenn Status = geleert)
│   └── Bemerkungen: [____]
│
├── 🍄 Diplodia — Zapfensammlung             ← NEU (verschoben aus Diplodia A1)
│   ├── Anzahl gesammelte Zapfen: [___]      (Ziel: 20)
│   ├── Sack-Bezeichnung: [____]
│   └── Bemerkungen: [____]
│
└── 📝 Methodenkritik                        ← NEU (verschoben aus Diplodia A3)
    └── Freitext: [________________________]
```

**Termin-Sichtbarkeit:**
- Polytrap: Grundfelder bei T1, Abbau-Felder zusätzlich bei T2
- Zapfen + Methodenkritik: Immer sichtbar (T1+T2)

---

### 🌲 Reiter 2: Bäume

Die Baumliste (wie bisher) mit Einzelbaum-Modal. **Alles Baumspezifische** wird direkt im Modal erfasst — kein Seitenwechsel nötig.

#### Baumliste

```
🌲 Bäume (12 gross / 8 klein)
┌──────────────────────────────────────────┐
│ B01 >20cm  📍✅  🍄✅  🐛⬜          [✏️] │
│ B02 >20cm  📍✅  🍄✅  🐛✅          [✏️] │
│ ...                                      │
│ B13 <20cm  📍✅  🪤✅  🪤⬜          [✏️] │
│ B14 <20cm  📍⬜  🪤⬜  🪤⬜          [✏️] │
└──────────────────────────────────────────┘

Legende Icons:
  📍 = GPS    🍄 = Diplodia    🐛 = Spinner    🪤 = Klebefalle/Saugschäden
  ✅ = erfasst    ⬜ = offen
```

#### Baum-Modal: Grosser Baum (BHD ≥20cm)

```
┌─────────── Baum B01 (>20cm) ───────────┐
│                                         │
│ 📏 BHD: [___] cm   Klasse: >20cm       │
│ 📍 GPS: [Erfassen]  ±5m                │
│                                         │
│ ── 🌳 Kronenverlichtung (T1+T2) ────── │
│ SANASILVA: [====●=======] 25%          │
│ [📷 Referenzbild antippen]              │
│                                         │
│ ── 🍄 Diplodia (T1+T2, erste 10) ──── │
│ Ast 1: Triebe [__] / infiziert [__]    │
│ Ast 2: Triebe [__] / infiziert [__]    │
│ Ast 3: Triebe [__] / infiziert [__]    │
│ → Befallsintensität: 33% (moderat)     │
│                                         │
│ ── 🐛 Spinner (nur T1) ─────────────── │
│ Anzahl Nester: [___]                    │
│                                         │
│ 💬 Bemerkungen: [____________________] │
│                                         │
│ [💾 Speichern]  [Abbrechen]            │
└─────────────────────────────────────────┘
```

**Bedingungen grosse Bäume:**
- Kronenverlichtung: Immer (T1+T2)
- Diplodia: Nur erste 10 grosse Bäume (oder bereits erfasste)
- Spinner: **Nur T1** (Daten sind final, kein Überschreiben bei T2)

#### Baum-Modal: Kleiner Baum (BHD <20cm)

```
┌─────────── Baum B13 (<20cm) ──────────────┐
│                                            │
│ 📏 BHD: [___] cm   Klasse: <20cm          │
│ 📍 GPS: [Erfassen]  ±3m                   │
│                                            │
│ ── 🐛 Spinner (nur T1) ────────────────── │
│ Anzahl Nester: [___]                       │
│                                            │
│ ── 🪤 Klebefalle (T1+T2) ──────────────── │  ← NEU
│ Falle installiert: [Nein ○ / Ja ○]        │
│   ┌─ wenn Ja: ─────────────────────────┐  │
│   │ Abstand Boden: [___] cm            │  │
│   │ Exposition: [SO ▾]                  │  │
│   │ Datum Installation: [2026-04-28]    │  │
│   │                                     │  │
│   │ ── nur T2: ──────────────────────── │  │
│   │ Datum Abbau: [2026-05-26]           │  │
│   │ Anzahl Zikaden: [___]              │  │
│   │ → Nachweis: ✅ (auto)              │  │
│   │ → Expositionsdauer: 28 Tage (auto) │  │
│   │ Verdachtsprobe WSS: [Nein/Ja]      │  │
│   └─────────────────────────────────────┘  │
│                                            │
│ ── 🪤 Saugschäden (nur T2) ────────────── │
│ [Schadbild-Karussell: 🪤|🍂|🍂|❓]       │
│ Trieb 1: [====●========] 25%              │
│ Trieb 2: [●============]  0%              │
│ Trieb 3: [======●======] 35%              │
│ Trieb 4: [●============]  0%              │
│ Trieb 5: [==●==========] 10%              │
│ Belegprobe: [Nein ○ / Ja ○]               │
│                                            │
│ 💬 Bemerkungen: [________________________] │
│                                            │
│ [💾 Speichern]  [Abbrechen]               │
└────────────────────────────────────────────┘
```

**Bedingungen kleine Bäume:**
- Spinner: **Nur T1** (wie grosse Bäume, Daten final)
- Klebefalle: T1 = Installation, T2 = Abbau + Zikadenzählung
- Saugschäden + Schadbild-Karussell: **Nur T2**
- Belegprobe: Nur T2, max 1× pro Standort

**Klebefallen-Limit:** Max. 5 Fallen pro Standort. Wenn bereits 5 Bäume eine Falle haben, wird der Toggle bei weiteren Bäumen gesperrt mit Hinweis "Maximum 5 Fallen erreicht".

**Klebefallen-GPS:** Wird automatisch vom Baum-GPS übernommen (Falle hängt am Baum).

**Klebefallen-ID:** Automatisch generiert aus Baum-ID (z.B. Baum B13 → Falle F-B13).

---

### 📊 Reiter 3: Resultate

Übersichts-Dashboard mit **allen** Zusammenfassungen. Kein Editieren hier — nur Lesen.

```
📊 Resultate
├── Gesamtfortschritt: [████████░░] 78%
│
├── 📍 Standort
│   ├── Plot: SH_01 | Aufnehmer: MJ
│   ├── Polytrap: ✅ Installiert (PT-SH01-2026)
│   └── Zapfen: ✅ 20 gesammelt
│
├── 🌲 Bäume
│   ├── Gross (>20cm): 12 | GPS: 12/12
│   ├── Klein (<20cm): 8 | GPS: 7/8
│   └── Tote Föhren: 2
│
├── 🍄 Diplodia — Kronenbefall              ← verschoben aus Diplodia-Reiter
│   ├── Erfasst: 10/10 Bäume
│   ├── Ø Befallsintensität: 28%
│   ├── Kategorien: 3× nicht, 4× schwach, 2× mittel, 1× stark
│   └── [Karten pro Baum mit ✏️ Button]
│
├── 🐛 Spinner                              ← verschoben aus Spinner-Reiter
│   ├── Erfasst: 20/20 Bäume (T1-Daten)
│   ├── Befallen: 3 Bäume (15%)
│   ├── Ø Nester: 0.4
│   └── [Karten pro Baum mit ✏️ Button]
│
├── 🪤 Klebefallen                          ← NEU: Fallen-Übersicht
│   ├── Installiert: 5/5
│   ├── Abgebaut: 3/5 (nur T2)
│   ├── Zikaden-Nachweis: 2/5 Fallen
│   └── [Karten pro Falle]
│
├── 🪤 Saugschäden                          ← verschoben aus Blutzikade-Reiter
│   ├── Erfasst: 8/8 Bäume
│   ├── Befallen: 5 Bäume (62.5%)
│   ├── Ø Befallene Nadeln: 18.5%
│   ├── Schadbild: 3× Blutzikade, 1× Rostpilz, 1× Unklar
│   └── [Karten pro Baum mit ✏️ Button]
│
└── ✅ Export-Bereitschaft
    ├── T1: ✅ Bereit (Standort + Bäume + Diplodia + Spinner + Fallen)
    └── T2: ⚠️ 2 Bäume ohne Saugschäden
```

---

### 📤 Reiter 4: Export

Wie bisher: CSV, GeoJSON, JSON-Backup/Restore.

---

## 3. Datenmodell-Änderungen

### Klebefallen: Von fixer F1–F5 zu baumgebunden

**Alt:**
```javascript
blutzikade.fallen = [
  { falle_id: 'F1', baum_ref: 'B13', lat: ..., lon: ..., ... },
  { falle_id: 'F2', baum_ref: 'B14', ... },
  // immer 5 Einträge
]
```

**Neu:**
```javascript
blutzikade.fallen = [
  { falle_id: 'F-B13', baum_ref: 'B13', hat_falle: true,
    abstand_boden_cm: 120, exposition_falle: 'SO',
    datum_installation: '2026-04-28',
    // T2-Felder:
    datum_abbau: '2026-05-26', anzahl_zikaden: 3,
    nachweis_zikade: true, verdachtsprobe_wss: false,
    expositionsdauer_tage: 28
  },
  // dynamisch, max 5
]
```

GPS-Felder (`lat`, `lon`, `e_lv95`, `n_lv95`) werden bei saveTreeEdit() automatisch vom Baum kopiert.

### Saugschäden-Probennahme: Vereinfacht

**Entfällt als eigener Block:**
- `saugschaeden_probe.aeste_anzahl` → entfällt
- `saugschaeden_probe.sack_id` → entfällt
- `saugschaeden_probe.bemerkung` → entfällt

**Bleibt im Baum-Modal:**
- `schaeden[].belegprobe_gesammelt` (Ja/Nein Toggle)
- `schaeden[].belegprobe_baum_id` (auto)

### Polytrap: Bleibt gleich

Verschiebt nur von Blutzikade-Sektion in Standort-Sektion. Datenstruktur `blutzikade.polytrap` bleibt unverändert.

### Diplodia Zapfen + Methodenkritik: Bleibt gleich

Verschiebt nur von Diplodia-Sektion in Standort-Sektion. Datenstruktur `diplodia.zapfen` und `diplodia.methodenkritik` bleibt unverändert.

---

## 4. Navigation-Änderungen

### Alt (6 Buttons)

```html
🗺️ Standort | 🍄 Diplodia | 🐛 Spinner | 🪤 Blutzikade | 📊 Resultate | 📤 Export
```

### Neu (4 Buttons)

```html
🗺️ Standort | 🌲 Bäume | 📊 Resultate | 📤 Export
```

**Termin-Sichtbarkeit der Buttons:**
- 🗺️ Standort: T1 + T2
- 🌲 Bäume: T1 + T2
- 📊 Resultate: T1 + T2
- 📤 Export: T1 + T2

(Alle Buttons immer sichtbar — Termin-Logik steuert nur die Felder *innerhalb* der Modals)

---

## 5. Zu entfernende Elemente

| Element | Was passiert |
|---------|-------------|
| `<section id="section-diplodia">` | Entfernen (Zusammenfassung → Resultate, Zapfen → Standort) |
| `<section id="section-spinner">` | Entfernen (Zusammenfassung → Resultate) |
| `<section id="section-blutzikade">` | Entfernen (Klebefallen → Baum-Modal, Polytrap → Standort, Saugschäden → Resultate) |
| Nav-Button Diplodia | Entfernen |
| Nav-Button Spinner | Entfernen |
| Nav-Button Blutzikade | Entfernen |
| C1/C1b/C2/C2b Page-Logik | Entfernen (`updateC2C2bPages()` etc.) |
| Saugschäden-Probennahme Block | Entfernen (Sack-ID, Äste-Anzahl) |
| `initC1()`, `initC2b()`, `initC1b()` | Entfernen (Logik geht in showTreeEdit + Standort) |

---

## 6. Export-Anpassungen

### CSV: Fallen-Datei

Bleibt als eigene Datei `foehren_*_fallen.csv`. Header und Daten bleiben gleich, aber `falle_id` wird jetzt z.B. `F-B13` statt `F1`.

### GeoJSON: Fallen-Features

Bleiben als eigene Point-Features. GPS kommt vom Baum.

### Neue CSV-Spalte im Baum-CSV

```
hat_klebefalle    (ja/nein)
```

---

## 7. Spinner-Sicherheitsmodal

Das bestehende Sicherheitsmodal (Prozessionsspinner — Gefahr durch Brennhaare) wird beibehalten. Es erscheint beim **ersten Öffnen eines Baum-Modals bei T1** wenn noch kein Spinner erfasst wurde. Alternativ: Einmal-Bestätigung beim Start von Termin 1, gespeichert in `app.data.meta.spinner_safety_confirmed`.

---

## 8. Zusammenfassung der Arbeitsschritte

1. Navigation: 6 → 4 Buttons
2. Standort-Sektion: Polytrap + Zapfen + Methodenkritik einfügen
3. Baum-Modal erweitern: Klebefalle-Toggle + Felder (T1 Installation, T2 Abbau)
4. Baum-Modal: Spinner auch für kleine Bäume (T1)
5. Resultate erweitern: Diplodia/Spinner/Fallen/Saugschäden-Zusammenfassungen
6. Alte Sektionen + Nav-Buttons entfernen
7. switchSection() anpassen
8. saveTreeEdit() erweitern: Klebefallen-Daten speichern
9. Export prüfen: CSV + GeoJSON Fallen-Export anpassen
10. FR-Version: Alle Änderungen spiegeln
11. Verifikation + QS-Iterationen

---

*Ende Auftrag_13_Reiter_Vereinfachung.md — 2026-04-08*
