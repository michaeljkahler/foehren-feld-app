# Modul C — Kiefernblutzikade

> **Sampling-Konzept:** Kapitel 5 (Kiefernblutzikade)
> **Termin:** C1 = Termin 1 (Installation), C2 + C2b = Termin 2 (Saugschäden + Abbau)

---

## Übersicht

Modul C ist über **beide Termine** verteilt:

```
TERMIN 1:
  Schritt C1: Klebefallen Installation (20 min)

TERMIN 2:
  Schritt C2:  Saugschäden an BHD <20 cm Bäumen (60 min)
  Schritt C2b: Klebefallen Abbau & Auswertung (30 min)
  → Summary-Card
```

---

## Schritt C1: Klebefallen Installation (Termin 1)

### Vorgaben (Kap. 5C)

- **5 gelbe Klebefallen** (Typ Andermatt Giallo) pro Standort
- An **5 jungen Waldföhren (BHD <20 cm)**
- Bäume möglichst **sonnenexponiert** und in der **Nähe von Wiesen** oder grasbewachsenem Waldboden
- Fallen auf der **sonnenexponierten Seite** der Bäume installieren
- Fixierung mit **Kabelbinder** an einem Trieb
- Fallen so platzieren, dass sie bei Windeinwirkung nicht an anderen Trieben kleben bleiben

### Info-Box in App

> 🪤 5 gelbe Klebefallen (Andermatt Giallo) an sonnenexponierten Jungbäumen (BHD <20 cm) nahe Wiesen installieren. Fallen auf der Sonnenseite fixieren (Kabelbinder). Darauf achten, dass Fallen bei Wind nicht an anderen Trieben kleben bleiben.

### Felder pro Falle (5 Fallen)

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Fallen-ID | `falle_id` | Text | Auto: `F1`–`F5` | auto | |
| Baum-Referenz | `baum_ref` | Select | Aus BHD <20 cm Bäumen | ✅ | Dropdown |
| GPS Falle | — | GPS-Widget | WGS84 + LV95 + Genauigkeit | ✅ | **Pro Falle eigenes GPS** |
| `lat` | auto | Decimal | WGS84 | auto | |
| `lon` | auto | Decimal | WGS84 | auto | |
| `e_lv95` | auto | Decimal | berechnet | auto | |
| `n_lv95` | auto | Decimal | berechnet | auto | |
| Abstand zum Boden | `abstand_boden_cm` | Integer | cm | ✅ | |
| Exposition Falle | `exposition_falle` | Select | N, NO, O, SO, S, SW, W, NW | ✅ | Sonnenexponierte Seite |
| Datum Installation | `datum_installation` | Datum | `YYYY-MM-DD` | ✅ | |

### Darstellung pro Falle

```
┌─────────────────────────────────────┐
│ Falle F3                            │
│                                     │
│ Baum: [BHD<20_4 ▾]                 │
│ 📍 47.6823° N | 8.6343° E  ±5m     │
│    LV95: E 692'347 | N 1'280'125   │
│ Abstand zum Boden: [120] cm        │
│ Exposition: [SO ▾]                  │
│ Datum Installation: [2026-04-28]    │
└─────────────────────────────────────┘
```

### Summary C1

```
╔════════════════════════════════════════╗
║  ✅ KLEBEFALLEN — Installation         ║
║  Installierte Fallen:    5 / 5        ║
╚════════════════════════════════════════╝
```

---

## Schritt C2: Saugschäden (Termin 2)

### Vorgaben (Kap. 5A)

- Nur **junge Waldföhren (BHD <20 cm)**
- Pro Baum: **5 zufällig gewählte, sonnenexponierte Triebe**
- Pro Trieb: **Anteil (%) der befallenen Nadeln** schätzen (0–100%, Schritte 5%)
- Saugschäden: typisch ringförmige, horizontal verlaufende Nadelverfärbungen (gelb–braun)
- Besonders eindeutig: Sequenzen mit mehreren ringförmigen Saugstellen entlang der Nadel
- Saugschäden hauptsächlich an **älteren Nadeljahrgängen**
- **1 symptomatischer Trieb** pro Standort als Nachweis-Beleg schneiden

### Info-Box in App

> 🔍 Nur BHD <20 cm Bäume! Pro Baum 5 sonnenexponierte Triebe untersuchen. Saugschäden = ringförmige, gelb-braune Nadelverfärbungen (ältere Nadeljahrgänge). Möglichst Jungbäume entlang von Waldrändern beproben. 1 symptomatischen Trieb pro Standort als Beleg schneiden.

### Felder pro Baum

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Baum-Referenz | `baum_ref` | Info | z.B. `BHD<20_3` | auto | Nur BHD <20 |
| Trieb 1: Befallene Nadeln | `trieb1_befallene_nadeln_pct` | Slider | 0–100%, Schritte 5% | ✅ | |
| Trieb 2: Befallene Nadeln | `trieb2_befallene_nadeln_pct` | Slider | 0–100%, Schritte 5% | ✅ | |
| Trieb 3: Befallene Nadeln | `trieb3_befallene_nadeln_pct` | Slider | 0–100%, Schritte 5% | ✅ | |
| Trieb 4: Befallene Nadeln | `trieb4_befallene_nadeln_pct` | Slider | 0–100%, Schritte 5% | ✅ | |
| Trieb 5: Befallene Nadeln | `trieb5_befallene_nadeln_pct` | Slider | 0–100%, Schritte 5% | ✅ | |
| Belegprobe gesammelt | `belegprobe_gesammelt` | Toggle | ja / nein | ✅ | 1× pro Standort |
| Belegprobe von Baum | `belegprobe_baum_id` | Info | auto: `baum_ref` wenn belegprobe=ja | auto | **Für GIS-Integration** |
| Baum befallen | `befallen_baum` | Boolean | auto: ≥1 Trieb >0% | auto | |
| Mittl. befallene Triebe | `mittl_befallene_triebe_pct` | Decimal | auto | auto | |

### Darstellung pro Baum

```
┌─────────────────────────────────────┐
│ BHD<20_3                            │
│                                     │
│ Trieb 1: [====●========] 25%       │
│ Trieb 2: [●============]  0%       │
│ Trieb 3: [======●======] 35%       │
│ Trieb 4: [●============]  0%       │
│ Trieb 5: [==●==========] 10%       │
│                                     │
│ Belegprobe: [Nein] [Ja]            │
│                                     │
│ Status: ⚠️ Befallen (3/5 Triebe)    │
└─────────────────────────────────────┘
```

### Berechnungen (automatisch)

```
// Pro Baum
befallen_baum = true wenn ≥1 Trieb > 0%
befallene_triebe_count = Anzahl Triebe mit >0%
mittl_befallene_nadeln_pct = Mittelwert aller 5 Triebe

// Pro Standort (Kap. 5B)
anteil_befallene_baeume_pct = (befallene Bäume / Gesamtbäume BHD<20) × 100
anteil_befallene_triebe_pro_baum = (befallene Triebe / 5) × 100 (pro Baum)
anteil_befallene_nadeln_pro_trieb = Wert des einzelnen Triebs
```

---

## Schritt C2b: Klebefallen Abbau (Termin 2)

### Vorgaben (Kap. 5C + 5D)

- Fallen abhängen, in **Cellophanfolie** einwickeln
- In **Zip-Säcke** packen, im **Kühlschrank** lagern
- Bestimmung an HAFL (Stereolupe): Adulte Kiefernblutzikaden ca. 7mm, rot-schwarze Färbung
- Fallen mit Verdachtsproben zur Validierung an **WSS** übergeben

### Felder pro Falle (5 Fallen, aus C1 vorbelegt)

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Fallen-ID | `falle_id` | Info | `F1`–`F5` | auto | Aus C1 |
| Baum-Referenz | `baum_ref` | Info | Aus C1 | auto | |
| Datum Abbau | `datum_abbau` | Datum | `YYYY-MM-DD` | ✅ | |
| Anzahl Zikaden | `anzahl_zikaden` | Integer | 0, 1, 2, ... | ✅ | **Zählung, nicht nur ja/nein** |
| Nachweis Zikade | `nachweis_zikade` | Boolean | auto: `anzahl_zikaden ≥ 1` | auto | |
| Verdachtsprobe WSS | `verdachtsprobe_wss` | Toggle | ja / nein | ✅ | Zur Validierung an WSS |
| Expositionsdauer | `expositionsdauer_tage` | Integer | auto: `datum_abbau - datum_installation` | auto | |

### Darstellung pro Falle

```
┌─────────────────────────────────────┐
│ Falle F3 — BHD<20_4                 │
│                                     │
│ Datum Abbau: [2026-05-26]           │
│ Anzahl Zikaden: [____]              │
│ Verdachtsprobe WSS: [Nein] [Ja]    │
│                                     │
│ ┌─ Info ──────────────────────────┐ │
│ │ Installation: 2026-04-28        │ │
│ │ Expositionsdauer: 28 Tage       │ │
│ │ Nachweis: ✅ Ja (3 Zikaden)     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Auswertung Fallenüberwachung (Kap. 5D, automatisch)

### Berechnungen

```
// Pro Standort
anteil_fallen_mit_nachweis_pct = (Fallen mit ≥1 Zikade / 5) × 100
taegliche_fangrate_pro_falle   = anzahl_zikaden / expositionsdauer_tage
gemittelte_taegliche_fangrate  = Mittelwert aller täglichen Fangraten
```

---

## Summary-Card (nach Abschluss Modul C, Termin 2)

```
╔════════════════════════════════════════╗
║  ✅ KIEFERNBLUTZIKADE — Auswertung     ║
║                                        ║
║  SAUGSCHÄDEN:                          ║
║  Kontrollierte Bäume:    14            ║
║  Befallene Bäume:        8 (57.1%)     ║
║  Ø Befallene Nadeln:     18.5%         ║
║  Belegprobe gesammelt:   ✅ Ja          ║
║                                        ║
║  KLEBEFALLEN:                          ║
║  Fallen mit Nachweis:    3 / 5 (60%)   ║
║  Ø Tägliche Fangrate:   0.14          ║
║  Verdachtsproben WSS:    2             ║
║  Ø Expositionsdauer:     28 Tage       ║
╚════════════════════════════════════════╝
```

---

## LocalStorage

```javascript
foehren_app_blutzikade → {
  schaeden: [
    {
      baum_id: "BHD<20_1",
      trieb1_befallene_nadeln_pct: 25,
      trieb2_befallene_nadeln_pct: 0,
      trieb3_befallene_nadeln_pct: 35,
      trieb4_befallene_nadeln_pct: 0,
      trieb5_befallene_nadeln_pct: 10,
      belegprobe_gesammelt: false,
      belegprobe_baum_id: null,
      befallen_baum: true,
      mittl_befallene_triebe_pct: 14.0
    },
    ...
  ],
  fallen: [
    {
      falle_id: "F1",
      baum_ref: "BHD<20_4",
      lat: 47.6823, lon: 8.6343,
      e_lv95: 692347.00, n_lv95: 1280125.00,
      abstand_boden_cm: 120,
      exposition_falle: "SO",
      datum_installation: "2026-04-28",
      datum_abbau: "2026-05-26",
      anzahl_zikaden: 3,
      nachweis_zikade: true,
      verdachtsprobe_wss: true,
      expositionsdauer_tage: 28
    },
    ...
  ]
}
```

---

*Quelle: Sampling-Konzept Kap. 5A, 5B, 5C, 5D*
