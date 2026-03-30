# Föhrengesundheit Feld-App — Hauptauftrag

> **Projekt:** `foehren-feld-app`
> **Quelle:** HAFL Sampling Konzept Waldföhren (260306), 06.03.2026
> **Ziel:** Offline-fähige Single-HTML-Datei (`foehren-feld-app.html`) zur strukturierten Feldaufnahme

---

## Modulstruktur

Die App besteht aus **einem Hauptgerüst** und **separaten Aufnahme-Modulen**. Jedes Modul hat eine eigene Spezifikationsdatei:

| Datei | Inhalt | Sampling-Kapitel |
|-------|--------|------------------|
| `MODUL_0_STANDORT.md` | Standortinfos + Einzelbaum-Erfassung | Kap. 1 + 2 |
| `MODUL_A_DIPLODIA.md` | Diplodia sapinea (Zapfen + Krone + Methodenkritik) | Kap. 3 |
| `MODUL_B_SPINNER.md` | Föhrenprozessionsspinner (Gespinstnester) | Kap. 4 |
| `MODUL_C_BLUTZIKADE.md` | Kiefernblutzikade (Saugschäden + Klebefallen) | Kap. 5 |
| `EXPORT.md` | Export-Engine (CSV, GeoJSON, GeoPackage) | — |
| `BACKUP.md` | JSON Sichern & Laden (Datenpersistenz T1→T2) | — |

---

## Terminstruktur

| Termin | Zeitraum | Module | Dauer |
|--------|----------|--------|-------|
| **Termin 1** | Ende April | Modul 0, Modul A, Modul C1 (Klebefallen-Installation) | ca. 3h |
| **Termin 2** | Ende Mai | Modul B, Modul C2 (Saugschäden), Modul C2b (Klebefallen-Abbau) | ca. 2h 30min |

### Navigationsfluss

```
TERMIN 1                          TERMIN 2
────────                          ────────
1. Modul 0: Standort              1. Modul B: Prozessionsspinner
   (📂 Daten laden ganz oben)        (Sicherheitsmodal zuerst!)
2. Modul 0: Bäume                 2. Modul C2: Saugschäden
3. Modul A1: Zapfenbefall         3. Modul C2b: Klebefallen Abbau
4. Modul A2: Kronenbefall         4. Export T2 + 💾 Backup sichern
5. Modul A3: Methodenkritik
6. Modul C1: Klebefallen Install.
7. Export T1 + 💾 Backup sichern

HINWEIS-BANNER: Falls LocalStorage leer → Backup-Laden anbieten
(siehe BACKUP.md)
```

---

## Technische Basis

### Pflichtanforderungen

- **Single File:** Alles in einer `.html`-Datei
- **Offline-First:** Kein Netzwerk nötig nach erstem Laden
- **Vanilla JS:** Kein Framework, kein Build-Step
- **Mobile-First:** Touch-optimiert, min. 44×44px Tap-Targets
- **LocalStorage:** Automatisches Speichern bei jeder Eingabe
- **GPS:** `navigator.geolocation` mit Genauigkeitsanzeige
- **LV95:** Näherungsformel WGS84 → LV95 (swisstopo MN95)

### LV95-Transformation

```javascript
function wgs84ToLV95(lat, lon) {
  const phi = (lat * 3600 - 169028.66) / 10000;
  const lam = (lon * 3600 - 26782.5) / 10000;
  const E = 2600072.37 + 211455.93*lam - 10938.51*lam*phi
            - 0.36*lam*phi*phi - 44.54*lam*lam*lam;
  const N = 1200147.07 + 308807.95*phi + 3745.25*lam*lam
            + 76.63*phi*phi - 194.56*lam*lam*phi + 119.79*phi*phi*phi;
  return { E: Math.round(E*100)/100, N: Math.round(N*100)/100 };
}
```

### GPS-Widget (wiederverwendbar für Standort, Bäume, Fallen)

Jede GPS-Erfassung zeigt **immer** folgendes Widget:

```
📍 GPS: 47.6821° N | 8.6341° E
   LV95: E 692'345 | N 1'280'123
   Genauigkeit: ±4m
   [GPS holen / GPS aktualisieren]
```

### Farben (CSS-Variablen)

```css
:root {
  --color-primary:    #2D5A27;  /* Waldgrün */
  --color-primary-lt: #4A8C42;  /* Hellgrün */
  --color-accent:     #E8A020;  /* Bernstein */
  --color-danger:     #C0392B;  /* Rot */
  --color-bg:         #F5F2EC;  /* Papier-Weiss */
  --color-bg-dark:    #1A2E18;  /* Dunkel */
  --color-text:       #1C1C1C;
  --color-muted:      #6B7280;
  --color-border:     #D1C9B8;
  --color-success:    #27AE60;
}
```

### UI-Komponenten

**Slider (Kronenverlichtung, Nadelbefall):**
- Höhe ≥ 48px, touch-freundlich
- Schritte 5%
- Wert gross angezeigt über/neben dem Slider

**Fortschrittsanzeige:**
```
Bäume BHD >20 cm: ████████░░░░  8 / 20
```

**Toggle (Ja/Nein):**
Zwei Buttons nebeneinander, aktiver Button farblich hervorgehoben.

**Summary-Card (nach jedem Modul):**
Berechnete Kennwerte in hervorgehobener Box.

### LocalStorage-Schlüssel

```
foehren_app_standort    → { ...standortdaten }
foehren_app_baeume      → [ {...baum1}, {...baum2}, ... ]
foehren_app_diplodia    → { zapfen: {...}, kronen: [...], methodenkritik: "" }
foehren_app_spinner     → [ {...baum1_nester}, ... ]
foehren_app_blutzikade  → { schaeden: [...], fallen: [...] }
foehren_app_meta        → { version, erstellt_am, letzte_aenderung }
```

### Reset-Funktion

Button "Alle Daten löschen" mit Doppel-Bestätigung. Löscht alle LocalStorage-Schlüssel und lädt die App neu.

---

## Ausführungsanweisungen

Claude liest **zuerst alle Modul-Dateien** und baut die App dann Modul für Modul auf:

1. HTML-Grundgerüst mit Navigation, CSS, GPS-Utility, LocalStorage-Klasse
2. Modul 0 implementieren (gemäss `MODUL_0_STANDORT.md`)
3. Modul A implementieren (gemäss `MODUL_A_DIPLODIA.md`)
4. Modul B implementieren (gemäss `MODUL_B_SPINNER.md`)
5. Modul C implementieren (gemäss `MODUL_C_BLUTZIKADE.md`)
6. Export-Engine implementieren (gemäss `EXPORT.md`)
7. Backup-Funktion implementieren (gemäss `BACKUP.md`)
8. Verifikation gegen Sampling-Konzept

---

*Quelle: HAFL Sampling Konzept Waldföhren, 06.03.2026*
