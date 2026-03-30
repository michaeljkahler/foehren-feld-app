# Backup — JSON Sichern & Laden

> **Zweck:** Datenpersistenz zwischen Termin 1 (April) und Termin 2 (Mai) garantieren
> **Problem:** LocalStorage kann über einen Monat verloren gehen (Cache-Bereinigung, Speicherplatz, Browser-Update, anderes Gerät)
> **Lösung:** Kompletter App-Zustand als JSON-Datei sichern und wiederherstellen

---

## Warum nötig?

LocalStorage bleibt zwar beim Schliessen des Browsers erhalten, aber über einen Monat gibt es reale Risiken:

- iOS/Android räumen bei Speicherknappheit automatisch Browser-Daten auf
- Browser-Updates können LocalStorage zurücksetzen
- Nutzer löscht manuell Cache/Browserdaten
- Nutzer wechselt Gerät zwischen Termin 1 und 2
- Gerät geht kaputt oder wird zurückgesetzt

Für eine wissenschaftliche Studie ist das **nicht akzeptabel**.

---

## Funktionen

### 1. Daten sichern (JSON-Export)

**Button:** `💾 Daten sichern (JSON)`

**Verhalten:**
- Sammelt ALLE LocalStorage-Schlüssel in ein JSON-Objekt
- Fügt Metadaten hinzu (App-Version, Sicherungsdatum, Plot-ID)
- Löst Download als `.json`-Datei aus

**Dateiname:** `foehren_[plot_id]_backup_[YYYY-MM-DD].json`

**JSON-Struktur:**

```json
{
  "_backup_meta": {
    "app_version": "1.0.0",
    "backup_datum": "2026-04-28T14:32:00.000Z",
    "plot_id": "SH_01"
  },
  "foehren_app_standort": { ... },
  "foehren_app_baeume": [ ... ],
  "foehren_app_diplodia": { ... },
  "foehren_app_spinner": [ ... ],
  "foehren_app_blutzikade": { ... },
  "foehren_app_meta": { ... }
}
```

### 2. Daten laden (JSON-Import)

**Button:** `📂 Daten laden (JSON)`

**Verhalten:**
- Öffnet Datei-Picker (`<input type="file" accept=".json">`)
- Liest die JSON-Datei ein
- Validiert die Struktur (prüft ob `_backup_meta` und mindestens `foehren_app_standort` vorhanden)
- **Bestätigungs-Dialog:** «Sicherung vom [Datum] für Plot [ID] laden? Aktuelle Daten werden überschrieben.»
- Schreibt alle Schlüssel in LocalStorage
- Lädt die App neu (`location.reload()`)

**Fehlerbehandlung:**
- Ungültige Datei → Fehlermeldung «Keine gültige Sicherungsdatei»
- Leere Datei → Fehlermeldung
- Falsches Format → Fehlermeldung mit Hinweis

---

## Platzierung in der App

Die Backup-Buttons erscheinen an **drei Stellen**:

### 1. Modul 0 — Standort (oben, immer sichtbar)

```
┌─────────────────────────────────────┐
│ 📂 Daten laden (JSON)               │
│ ─────────────────────────────────── │
│ 🗺️ Standort & Bestandesaufnahme     │
│ ...                                 │
└─────────────────────────────────────┘
```

Der «Daten laden»-Button steht **ganz oben** im Standort-Formular, damit man bei Termin 2 als Erstes die Daten von Termin 1 laden kann.

### 2. Export-Seite Termin 1

```
┌─────────────────────────────────────┐
│ 💾 Daten exportieren – Termin 1     │
│                                     │
│ [📄 CSV exportieren]                │
│ [🗺️ GeoJSON exportieren]            │
│ [📦 GeoPackage exportieren]         │
│ ─────────────────────────────────── │
│ [💾 Daten sichern (JSON)]           │
│                                     │
│ ⚠️ Wichtig: Sichern Sie Ihre Daten  │
│ als JSON-Backup, damit sie bei      │
│ Termin 2 (Mai) verfügbar sind!      │
└─────────────────────────────────────┘
```

### 3. Export-Seite Termin 2

```
┌─────────────────────────────────────┐
│ 💾 Daten exportieren – Termin 2     │
│                                     │
│ [📄 CSV exportieren]                │
│ [🗺️ GeoJSON exportieren]            │
│ [📦 GeoPackage exportieren]         │
│ ─────────────────────────────────── │
│ [💾 Daten sichern (JSON)]           │
└─────────────────────────────────────┘
```

---

## Typischer Workflow

```
TERMIN 1 (Ende April)
  1. App öffnen
  2. Modul 0, A, C1 durcharbeiten
  3. Export-Seite: CSV/GeoJSON/GeoPackage exportieren
  4. Export-Seite: «Daten sichern (JSON)» → Datei auf Smartphone
  5. App schliessen

  ⏳ 1 Monat Pause

TERMIN 2 (Ende Mai)
  1. App öffnen
  2. Falls LocalStorage noch da → alles OK, weiterarbeiten
  3. Falls LocalStorage leer → Modul 0: «Daten laden (JSON)» → Backup von April laden
  4. Modul B, C2, C2b durcharbeiten
  5. Export: Alle Daten (T1 + T2) werden exportiert
```

---

## Hinweis-Banner

Beim Öffnen der App wird geprüft, ob LocalStorage leer ist. Falls ja, erscheint ein Banner:

```
╔══════════════════════════════════════════╗
║  📂 Keine Daten vorhanden                ║
║                                          ║
║  Falls Sie bereits Daten bei Termin 1    ║
║  erfasst haben, laden Sie Ihr Backup:    ║
║                                          ║
║  [ 📂 JSON-Backup laden ]                ║
║                                          ║
║  [ Neue Aufnahme starten ]               ║
╚══════════════════════════════════════════╝
```

---

## Implementierung

```javascript
// Sichern
function backupToJSON() {
  const backup = { _backup_meta: {
    app_version: "1.0.0",
    backup_datum: new Date().toISOString(),
    plot_id: app.data.standort.plot_id || "unbekannt"
  }};
  Object.entries(storage.keys).forEach(([key, lsKey]) => {
    const val = localStorage.getItem(lsKey);
    if (val) backup[lsKey] = JSON.parse(val);
  });
  const blob = new Blob([JSON.stringify(backup, null, 2)],
    { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `foehren_${backup._backup_meta.plot_id}_backup_${
    new Date().toISOString().split('T')[0]}.json`;
  link.click();
}

// Laden
function restoreFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      if (!backup._backup_meta || !backup.foehren_app_standort) {
        alert('Keine gültige Sicherungsdatei.');
        return;
      }
      const meta = backup._backup_meta;
      if (!confirm(`Sicherung vom ${meta.backup_datum.split('T')[0]} für Plot "${meta.plot_id}" laden?\n\nAktuelle Daten werden überschrieben.`)) {
        return;
      }
      Object.entries(backup).forEach(([key, val]) => {
        if (key !== '_backup_meta') {
          localStorage.setItem(key, JSON.stringify(val));
        }
      });
      location.reload();
    } catch (err) {
      alert('Fehler beim Laden: ' + err.message);
    }
  };
  reader.readAsText(file);
}
```

---

*Ergänzung zum Hauptauftrag — Datenpersistenz über Termin-Grenzen hinweg*
