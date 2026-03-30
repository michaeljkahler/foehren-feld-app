# Modul A — Diplodia sapinea

> **Sampling-Konzept:** Kapitel 3 (Diplodia sapinea)
> **Termin:** 1 (Ende April)
> **Dauer:** ca. 60 min
> **Ziel:** Erhebung der Befallsintensität von *D. sapinea* pro Fläche

---

## Übersicht

Modul A hat **drei Aufnahme-Schritte** und eine **Summary**:

```
Schritt A1: Zapfenbefall (Feldnotiz)
Schritt A2: Kronenbefall (10 Bäume × 3 Äste)
Schritt A3: Methodenkritik (Freitext)
→ Summary-Card
```

---

## Schritt A1: Zapfenbefall (Feldnotiz)

### Vorgaben (Kap. 3A)

- Verteilt über den Bestand der Waldföhren **BHD >20 cm**
- Zufällig insgesamt **20 Zapfen** aufheben (**noch nicht abgebaut**)
- Zapfen in **Papiersack** mitnehmen
- Sack beschriften mit: Standort, Baumnummer, Datum, Name

> ℹ️ Die Laborauswertung (Fruchtkörper pro Schuppe) erfolgt nachträglich an der HAFL im Pilzpraktikum — wird **nicht** in der App erfasst.
> Die «Befallsintensität pro Fläche» (Kap. 3C: Mittelwert aus Kronen- und Zapfenbefall) wird ebenfalls **separat ausserhalb der App** berechnet, da die Zapfendaten erst aus dem Labor kommen. Die App berechnet nur die **Kronenbefallsintensität**.

### Felder

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Anzahl gesammelte Zapfen | `diplodia_zapfen_anzahl` | Integer | 0–n (Ziel: 20) | ✅ | «Noch nicht abgebaut» |
| Sack-Bezeichnung | `diplodia_zapfen_sack_id` | Text | Freitext | ✅ | Eindeutige Sack-ID |
| Bemerkungen | `diplodia_zapfen_bemerkung` | Textarea | Freitext | ❌ | |

### Info-Box in App

> 📝 20 Zapfen zufällig aufheben (noch nicht abgebaut) und in Papiersack mitnehmen. Sack beschriften: Standort, Baumnummer, Datum, Name.

---

## Schritt A2: Kronenbefall

### Vorgaben (Kap. 3B)

- **10 zufällig ausgewählte Bäume** aus der Kategorie **BHD >20 cm**
- Pro Baum: **3 gut sichtbare, noch lebende Äste** (Stamm bis Astspitze), möglichst gleiche Stärke
- Pro Ast: **Anzahl Triebe total** + **Anzahl infizierte Triebspitzen** zählen
- Material: Feldstecher

### Baumauswahl

Die App zeigt die ersten 10 erfassten Bäume der Klasse BHD >20 cm. Falls weniger als 10 vorhanden, werden alle angezeigt.

### Felder pro Baum (10 Bäume)

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Baum-Referenz | `baum_ref` | Info | z.B. `BHD>20_3` | auto | Aus Modul 0 |
| Ast 1: Triebe total | `ast1_triebe_total` | Integer | ≥0 | ✅ | |
| Ast 1: Triebe infiziert | `ast1_triebe_infiziert` | Integer | ≥0 | ✅ | ≤ total |
| Ast 2: Triebe total | `ast2_triebe_total` | Integer | ≥0 | ✅ | |
| Ast 2: Triebe infiziert | `ast2_triebe_infiziert` | Integer | ≥0 | ✅ | |
| Ast 3: Triebe total | `ast3_triebe_total` | Integer | ≥0 | ✅ | |
| Ast 3: Triebe infiziert | `ast3_triebe_infiziert` | Integer | ≥0 | ✅ | |
| Befallsintensität | `befallsintensitaet_pct` | Decimal | **auto berechnet** | auto | |
| Befallskategorie | `befallskategorie` | Text | **auto berechnet** | auto | |

### Berechnung (automatisch, pro Baum)

```
befallsintensitaet_pct = (ast1_inf + ast2_inf + ast3_inf) /
                         (ast1_tot + ast2_tot + ast3_tot) × 100

Kategorien:
  < 25%  → «nicht befallen»
  ≥ 25%  → «kaum befallen»
  ≥ 50%  → «mittelstark befallen»
  ≥ 75%  → «stark befallen»
```

### Darstellung pro Baum

Jede Baumkarte zeigt **zuerst die Referenzdaten aus Modul 0**, damit der Baum im Feld identifiziert werden kann:

```
┌─────────────────────────────────────┐
│ BHD>20_3                            │
│ ┌───────────────────────────────┐   │
│ │ BHD: 34.5 cm  KV: 35%        │   │
│ │ 📍 47.6822° N | 8.6342° E ±3m │   │
│ │    LV95: E 692'346 | N 1'280  │   │
│ │ 📝 Neigung nach Süd           │   │
│ └───────────────────────────────┘   │
│                                     │
│ Ast 1:  [Total: 20] [Infiziert: 5] │
│ Ast 2:  [Total: 30] [Infiziert: 13]│
│ Ast 3:  [Total: 25] [Infiziert: 1] │
│                                     │
│ ┌─ Befallsintensität ─────────────┐ │
│ │ 25.3% — kaum befallen           │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Testdaten (QS-3)

```
Ast 1: 5 inf / 20 total
Ast 2: 13 inf / 30 total
Ast 3: 1 inf / 25 total
Erwartet: (19/75) × 100 = 25.33% → «kaum befallen»
```

---

## Schritt A3: Methodenkritik

### Vorgaben (Kap. 3D)

> Jeder Studierende schreibt eine Einschätzung, ob die berechnete Befallsintensität die wahrgenommene Befallsintensität widerspiegelt und warum. Falls die beiden voneinander abweichen, beschreibt der Studierende, weshalb dies so ist.

### Felder

| Feld | ID | Typ | Werte | Pflicht | Bemerkung |
|------|----|-----|-------|---------|-----------|
| Methodenkritik | `diplodia_methodenkritik` | Textarea | Freitext, mehrzeilig | ✅ | |

### Info-Box

> 📝 Stimmt die berechnete Befallsintensität mit Ihrem Gesamteindruck im Feld überein? Falls nein: Warum weichen sie ab?

---

## Summary-Card (nach Abschluss Modul A)

```
╔════════════════════════════════════════╗
║  ✅ DIPLODIA SAPINEA — Auswertung      ║
║                                        ║
║  Zapfen gesammelt:       18 / 20       ║
║  Bäume (Krone):          10 / 10       ║
║  Ø Befallsintensität:    38.4%         ║
║  Kategorie (Mittel):     kaum befallen ║
║  Stark befallen:         2 Bäume       ║
║  Nicht befallen:         3 Bäume       ║
╚════════════════════════════════════════╝
```

---

## LocalStorage

```javascript
foehren_app_diplodia → {
  zapfen: {
    diplodia_zapfen_anzahl: 18,
    diplodia_zapfen_sack_id: "ZAP-SH01-2026",
    diplodia_zapfen_bemerkung: ""
  },
  kronen: [
    {
      baum_id: "BHD>20_1",
      ast1_triebe_total: 20, ast1_triebe_infiziert: 5,
      ast2_triebe_total: 30, ast2_triebe_infiziert: 13,
      ast3_triebe_total: 25, ast3_triebe_infiziert: 1,
      befallsintensitaet_pct: 25.33,
      befallskategorie: "kaum befallen"
    },
    ...
  ],
  methodenkritik: "Die berechnete Intensität erscheint mir etwas tief..."
}
```

---

*Quelle: Sampling-Konzept Kap. 3A, 3B, 3C, 3D*
