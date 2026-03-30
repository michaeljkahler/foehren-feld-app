# Modul B — Föhrenprozessionsspinner

> **Sampling-Konzept:** Kapitel 4 (Föhrenprozessionsspinner)
> **Termin:** 2 (Ende Mai)
> **Dauer:** ca. 60 min

---

## Sicherheitsmodal (PFLICHT)

Vor dem Start von Modul B **muss** ein modales Overlay erscheinen, das aktiv bestätigt werden muss. Ohne Bestätigung ist kein Zugang zum Modul möglich.

```
╔══════════════════════════════════════════════╗
║  ⚠️  SICHERHEITSHINWEIS                      ║
║  Föhrenprozessionsspinner                    ║
║                                              ║
║  Die Raupen bilden ab dem 3. Larvenstadium   ║
║  BRENNHAARE, die starke Entzündungen von     ║
║  Augenschleimhäuten und Atemwegen sowie      ║
║  Allergien auslösen können.                  ║
║                                              ║
║  • Raupen NICHT berühren                     ║
║  • Gespinstnester NICHT berühren             ║
║  • Auch ältere, verlassene Nester            ║
║    sind gefährlich                           ║
║  • Lange Hosen tragen                        ║
║                                              ║
║  [ Ich habe verstanden — Weiter ]            ║
╚══════════════════════════════════════════════╝
```

- Modal erscheint **jedes Mal** wenn Modul B geöffnet wird (sessionStorage, nicht localStorage — bei Browser-Neustart erneut anzeigen)
- Hintergrund abgedunkelt, kein Schliessen per Klick ausserhalb
- Button muss aktiv geklickt werden

---

## Aufnahme: Gespinstnester (Kap. 4A)

### Vorgaben

- **ALLE Bäume** beider BHD-Klassen werden kontrolliert
- BHD >20 cm: Baumkronen mit **Fernglas** absuchen
- BHD <20 cm: Untersuchung **ohne Fernglas**
- Pro Baum: **Anzahl Gespinstnester** notieren (0, 1, 2, 3, ...)

### Darstellung

Die App zeigt **alle erfassten Bäume** aus Modul 0 als Liste. Pro Baum:

```
┌─────────────────────────────────────┐
│ BHD>20_3  (Methode: Fernglas)       │
│                                     │
│ Anzahl Gespinstnester: [____]       │
│                                     │
│ Status: ✅ Frei / ⚠️ Befallen       │
└─────────────────────────────────────┘
```

### Felder pro Baum

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Baum-Referenz | `baum_ref` | Info | z.B. `BHD>20_3` | auto | Aus Modul 0 |
| BHD-Klasse | `bhd_klasse` | Info | `>20cm` / `<20cm` | auto | |
| Methode | `methode` | Info | BHD>20: «Fernglas» / BHD<20: «ohne Hilfsmittel» | auto | Anzeige neben Baum-ID |
| Anzahl Nester | `anzahl_nester` | Integer | 0, 1, 2, 3, ... | ✅ | Standardwert: 0 |
| Befallen | `befallen` | Boolean | auto: `anzahl_nester ≥ 1` | auto | |

---

## Auswertung (Kap. 4B, automatisch)

### Berechnungen (pro Plot)

```
anteil_befallene_baeume_pct = (Anzahl Bäume mit ≥1 Nest) / (Gesamtzahl Bäume) × 100
mittlere_nester_pro_baum    = (Summe aller Nester) / (Gesamtzahl Bäume)
```

### Summary-Card

```
╔════════════════════════════════════════╗
║  ✅ PROZESSIONSSPINNER — Auswertung    ║
║                                        ║
║  Kontrollierte Bäume:    32            ║
║    davon BHD >20:        18 (Fernglas) ║
║    davon BHD <20:        14 (ohne)     ║
║  Befallene Bäume:        8 (25.0%)     ║
║  Ø Nester pro Baum:      0.72          ║
║  Max. Nester (Einzelb.): 5             ║
╚════════════════════════════════════════╝
```

---

## LocalStorage

```javascript
foehren_app_spinner → [
  {
    baum_id: "BHD>20_1",
    bhd_klasse: ">20cm",
    methode: "Fernglas",
    anzahl_nester: 2,
    befallen: true
  },
  {
    baum_id: "BHD<20_1",
    bhd_klasse: "<20cm",
    methode: "ohne Hilfsmittel",
    anzahl_nester: 0,
    befallen: false
  },
  ...
]
```

---

*Quelle: Sampling-Konzept Kap. 4A, 4B + Sicherheitshinweis*
