# Modul 0 — Standort & Einzelbaum-Erfassung

> **Sampling-Konzept:** Kapitel 1 (Allgemeine Standortinformationen) + Kapitel 2 (Einzelbaum-Informationen)
> **Termin:** 1 (Ende April)
> **Dauer:** Standort 30 min + Bäume 60 min

---

## Schritt 1: Standort-Formular

### Felder

| Feld | ID | Typ | Werte / Format | Pflicht | Bemerkung |
|------|----|-----|----------------|---------|-----------|
| Plot-ID | `plot_id` | Text | Freitext, z.B. `SH_01` | ✅ | Eindeutige Kennung |
| Aufnehmer | `aufnehmer` | Text | Name | ✅ | |
| Datum Termin 1 | `datum_t1` | Datum | `YYYY-MM-DD` | ✅ | |
| Datum Termin 2 | `datum_t2` | Datum | `YYYY-MM-DD` | ✅ | Planung |
| GPS Standort | — | GPS-Widget | WGS84 + LV95 + Genauigkeit | ✅ | Zentrale Koordinate des Plots |
| `koordinate_lat` | auto | Decimal | GPS WGS84 Latitude | auto | |
| `koordinate_lon` | auto | Decimal | GPS WGS84 Longitude | auto | |
| `koordinate_e_lv95` | auto | Decimal | LV95 Ost, berechnet | auto | |
| `koordinate_n_lv95` | auto | Decimal | LV95 Nord, berechnet | auto | |
| Höhe ü.M. | `hoehe_mue` | Integer | Meter | ✅ | |
| Exposition | `exposition` | Select | N, NO, O, SO, S, SW, W, NW, eben | ✅ | |
| Baumartenmischung | `baumarten_mischung` | Text | z.B. «Waldföhre 90%, Buche 10%» | ✅ | Gemäss Kap. 1 |
| Bodenvegetation | `bodenvegetation` | Text | z.B. «Brombeeren, Moos» | ✅ | |
| Bodentyp | `bodentyp` | Text | z.B. «Braunerde» | ✅ | |
| Waldgesellschaftstyp | `waldgesellschaft` | Text | Freitext | ✅ | |
| Bemerkungen | `bemerkungen_standort` | Textarea | Freitext | ❌ | |

### GPS-Widget Standort

```
📍 GPS: 47.6821° N | 8.6341° E
   LV95: E 692'345 | N 1'280'123
   Genauigkeit: ±4m
   [GPS holen]
```

Zeigt WGS84, LV95 (berechnet) und Genauigkeit (±m) an. Button wechselt nach Erfassung zu «GPS aktualisieren».

---

## Schritt 2: Einzelbaum-Erfassung

### Vorgaben (Kap. 2)

- **20 Waldföhren BHD >20 cm** + **20 Waldföhren BHD <20 cm**
- Minimum 5 Bäume pro Klasse (Verjüngung kann gebietsweise rar sein)
- Maximum 20 pro Klasse
- Durchnummerierung: `BHD>20_1`, `BHD>20_2`, ... / `BHD<20_1`, `BHD<20_2`, ...
- Bäume nach Messung mit Kreide oder Bändeli markieren (Hinweis in App anzeigen)

### Fortschrittsanzeige

```
Bäume BHD >20 cm: ████████░░░░  8 / 20
Bäume BHD <20 cm: ██░░░░░░░░░░  2 / 20
```

### Button: «+ Baum erfassen»

Zwei separate Buttons:
- `+ Baum (BHD >20 cm) erfassen`
- `+ Baum (BHD <20 cm) erfassen`

Maximum-Prüfung: Ab 20 Bäume pro Klasse wird der Button deaktiviert.

### Felder pro Baum

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Baum-ID | `baum_id` | Text | Auto: `BHD>20_1`, `BHD<20_3` etc. | auto | Generiert bei Erstellung |
| BHD-Klasse | `bhd_klasse` | Info | `>20cm` oder `<20cm` | auto | Fest bei Erstellung |
| BHD | `bhd_cm` | Decimal | cm, Schritt 0.1 | ✅ | Kluppe |
| GPS Baum | — | GPS-Widget | WGS84 + LV95 + Genauigkeit | ✅ | **Pro Baum eigenes GPS** |
| `lat` | auto | Decimal | WGS84 | auto | |
| `lon` | auto | Decimal | WGS84 | auto | |
| `e_lv95` | auto | Decimal | berechnet | auto | |
| `n_lv95` | auto | Decimal | berechnet | auto | |
| Kronenverlichtung | `kronenverlichtung_pct` | Slider | 0–100%, Schritte 5% | ✅ | Nach SANASILVA |
| Bemerkungen | `bemerkungen_baum` | Textarea | Freitext | ❌ | |

### GPS-Widget pro Baum

Identisch wie Standort-GPS: WGS84, LV95, Genauigkeit (±m). Button «GPS holen».

### Kronenverlichtung-Slider

```
Kronenverlichtung (SANASILVA)
[  0%  ][=========●==========][ 100% ]
              45 %
```

- 0% = voll gesund
- 100% = tot
- Schritte von 5%
- Grosser, touch-freundlicher Slider (≥ 48px Höhe)
- Aktueller Wert wird prominent angezeigt

### Info-Hinweis in der Baumerfassung

> 💡 Bäume nach der Messung mit Kreide oder Bändeli markieren, damit sie bei Termin 2 wiedergefunden werden.

### Baum-Karte (Einzelbaum-Ansicht)

Pro erfasstem Baum wird eine kompakte Karte angezeigt:

```
┌─────────────────────────────────────┐
│ BHD>20_3                  [Entfernen]│
│ BHD: 34.5 cm                        │
│ 📍 47.6822° N | 8.6342° E  ±3m      │
│    LV95: E 692'346 | N 1'280'124    │
│ Kronenverlichtung: ████░░ 35%       │
│ Bemerkungen: Neigung nach Süd       │
└─────────────────────────────────────┘
```

---

## LocalStorage

```javascript
// Standort
foehren_app_standort → {
  plot_id: "SH_01",
  aufnehmer: "M. Muster",
  datum_t1: "2026-04-28",
  datum_t2: "2026-05-26",
  koordinate_lat: 47.6821,
  koordinate_lon: 8.6341,
  koordinate_e_lv95: 692345.12,
  koordinate_n_lv95: 1280123.45,
  hoehe_mue: 520,
  exposition: "SO",
  baumarten_mischung: "Waldföhre 85%, Buche 15%",
  bodenvegetation: "Brombeeren, Moos",
  bodentyp: "Braunerde",
  waldgesellschaft: "Typischer Föhrenwald",
  bemerkungen_standort: ""
}

// Bäume
foehren_app_baeume → [
  {
    baum_id: "BHD>20_1",
    bhd_klasse: ">20cm",
    bhd_cm: 34.5,
    lat: 47.6822,
    lon: 8.6342,
    e_lv95: 692346.00,
    n_lv95: 1280124.00,
    kronenverlichtung_pct: 35,
    bemerkungen_baum: ""
  },
  ...
]
```

---

*Quelle: Sampling-Konzept Kap. 1 + 2*
