# Export-Engine — CSV, GeoJSON, GeoPackage

> **Verfügbar:** Am Ende von Termin 1 und Termin 2
> **Hinweis:** Export ist nicht destruktiv — Daten bleiben in LocalStorage erhalten

---

## Allgemein

- Export-Button auf der letzten Seite beider Termine
- Dateiname-Schema: `foehren_[plot_id]_[YYYY-MM-DD]_[typ].[ext]`
- Alle drei Formate unabhängig voneinander exportierbar
- **Backup-Button** (`💾 Daten sichern (JSON)`) auf jeder Export-Seite unterhalb der Export-Buttons (siehe `BACKUP.md`)
- Export-Seite T1: Zusätzlicher Hinweis «⚠️ Wichtig: Sichern Sie Ihre Daten als JSON-Backup, damit sie bei Termin 2 verfügbar sind!»

---

## CSV-Export

### Spezifikation

| Eigenschaft | Wert |
|-------------|------|
| Encoding | UTF-8 mit BOM (`\uFEFF`) |
| Trennzeichen | Semikolon (`;`) |
| Dezimaltrennzeichen | Punkt (`.`) |
| Textqualifizierer | Doppelte Anführungszeichen (`"`) |
| Zeilenumbruch | `\n` |

### Drei separate Dateien

#### 1. `[plot_id]_standort.csv` — 1 Zeile

Spalten:
```
plot_id; aufnehmer; datum_t1; datum_t2; koordinate_lat; koordinate_lon;
koordinate_e_lv95; koordinate_n_lv95; hoehe_mue; exposition;
baumarten_mischung; bodenvegetation; bodentyp; waldgesellschaft;
bemerkungen_standort
```

#### 2. `[plot_id]_baeume.csv` — 1 Zeile pro Baum

Enthält **alle Module als Spalten** (NULL/leer wenn nicht erhoben):

```
baum_id; bhd_klasse; bhd_cm; lat; lon; e_lv95; n_lv95;
kronenverlichtung_pct; bemerkungen_baum;
diplodia_ast1_total; diplodia_ast1_infiziert;
diplodia_ast2_total; diplodia_ast2_infiziert;
diplodia_ast3_total; diplodia_ast3_infiziert;
diplodia_befallsintensitaet_pct; diplodia_befallskategorie;
spinner_anzahl_nester; spinner_befallen;
blutzikade_trieb1_pct; blutzikade_trieb2_pct;
blutzikade_trieb3_pct; blutzikade_trieb4_pct;
blutzikade_trieb5_pct; blutzikade_belegprobe; blutzikade_belegprobe_baum_id;
blutzikade_befallen_baum; blutzikade_mittl_befallene_triebe_pct
```

#### 3. `[plot_id]_fallen.csv` — 1 Zeile pro Falle

```
falle_id; baum_ref; lat; lon; e_lv95; n_lv95;
abstand_boden_cm; exposition_falle; datum_installation;
datum_abbau; anzahl_zikaden; nachweis_zikade;
verdachtsprobe_wss; expositionsdauer_tage
```

---

## GeoJSON-Export

### Spezifikation

| Eigenschaft | Wert |
|-------------|------|
| Dateiname | `[plot_id]_[datum].geojson` |
| CRS | EPSG:4326 (WGS84) |
| CRS-Format | `urn:ogc:def:crs:EPSG::4326` |
| Geometrie | Point (lon, lat) |

### Struktur

```json
{
  "type": "FeatureCollection",
  "name": "foehren_SH_01",
  "crs": {
    "type": "name",
    "properties": { "name": "urn:ogc:def:crs:EPSG::4326" }
  },
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.6341, 47.6821] },
      "properties": {
        "typ": "standort",
        "plot_id": "SH_01",
        "aufnehmer": "...",
        "datum_t1": "...",
        "datum_t2": "...",
        "koordinate_e_lv95": 692345.12,
        "koordinate_n_lv95": 1280123.45,
        "hoehe_mue": 520,
        "exposition": "SO",
        "baumarten_mischung": "...",
        "bodenvegetation": "...",
        "bodentyp": "...",
        "waldgesellschaft": "...",
        "bemerkungen_standort": "..."
      }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.6342, 47.6822] },
      "properties": {
        "typ": "baum",
        "baum_id": "BHD>20_1",
        "bhd_klasse": ">20cm",
        "bhd_cm": 34.5,
        "e_lv95": 692346.00,
        "n_lv95": 1280124.00,
        "kronenverlichtung_pct": 35,
        "bemerkungen_baum": "",
        "diplodia_befallsintensitaet_pct": 25.33,
        "diplodia_befallskategorie": "kaum befallen",
        "spinner_anzahl_nester": 2,
        "spinner_befallen": true,
        "blutzikade_trieb1_pct": null,
        "blutzikade_trieb2_pct": null,
        "blutzikade_trieb3_pct": null,
        "blutzikade_trieb4_pct": null,
        "blutzikade_trieb5_pct": null,
        "blutzikade_belegprobe": null,
        "blutzikade_belegprobe_baum_id": null,
        "blutzikade_befallen_baum": null
      }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [8.6343, 47.6823] },
      "properties": {
        "typ": "klebefalle",
        "falle_id": "F1",
        "baum_ref": "BHD<20_4",
        "e_lv95": 692347.00,
        "n_lv95": 1280125.00,
        "abstand_boden_cm": 120,
        "exposition_falle": "SO",
        "datum_installation": "2026-04-28",
        "datum_abbau": "2026-05-26",
        "anzahl_zikaden": 3,
        "nachweis_zikade": true,
        "verdachtsprobe_wss": true,
        "expositionsdauer_tage": 28
      }
    }
  ]
}
```

---

## GeoPackage-Export

### Spezifikation

| Eigenschaft | Wert |
|-------------|------|
| Dateiname | `[plot_id]_[datum].gpkg` |
| Implementierung | `sql.js` (SQLite-WASM) |
| CDN | `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js` |
| CRS | EPSG:4326 + EPSG:2056 registriert |

### Pflicht-Tabellen (OGC GeoPackage Spec)

#### `gpkg_spatial_ref_sys`

| srs_name | srs_id | organization | org_id | definition |
|----------|--------|-------------|--------|------------|
| WGS 84 | 4326 | EPSG | 4326 | `GEOGCS["WGS 84",...]` |
| LV95 | 2056 | EPSG | 2056 | `PROJCS["LV95",...]` |

#### `gpkg_contents`

| table_name | data_type | identifier | description |
|-----------|-----------|------------|-------------|
| standorte | features | Standorte | Plot-Standorte |
| baeume | features | Bäume | Einzelbaum-Daten |
| klebefallen | features | Klebefallen | Klebefallen-Daten |

#### `gpkg_geometry_columns`

| table_name | column_name | geometry_type_name | srs_id |
|-----------|-------------|-------------------|--------|
| standorte | geometry | POINT | 4326 |
| baeume | geometry | POINT | 4326 |
| klebefallen | geometry | POINT | 4326 |

### Feature-Tabellen

#### `standorte`

```sql
CREATE TABLE standorte (
  id INTEGER PRIMARY KEY,
  plot_id TEXT,
  aufnehmer TEXT,
  datum_t1 TEXT,
  datum_t2 TEXT,
  koordinate_e_lv95 REAL,
  koordinate_n_lv95 REAL,
  hoehe_mue INTEGER,
  exposition TEXT,
  baumarten_mischung TEXT,
  bodenvegetation TEXT,
  bodentyp TEXT,
  waldgesellschaft TEXT,
  bemerkungen_standort TEXT,
  geometry BLOB
);
```

#### `baeume`

```sql
CREATE TABLE baeume (
  id INTEGER PRIMARY KEY,
  baum_id TEXT,
  bhd_klasse TEXT,
  bhd_cm REAL,
  e_lv95 REAL,
  n_lv95 REAL,
  kronenverlichtung_pct INTEGER,
  bemerkungen_baum TEXT,
  diplodia_befallsintensitaet_pct REAL,
  diplodia_befallskategorie TEXT,
  spinner_anzahl_nester INTEGER,
  spinner_befallen TEXT,
  blutzikade_trieb1_pct INTEGER,
  blutzikade_trieb2_pct INTEGER,
  blutzikade_trieb3_pct INTEGER,
  blutzikade_trieb4_pct INTEGER,
  blutzikade_trieb5_pct INTEGER,
  blutzikade_belegprobe TEXT,
  blutzikade_belegprobe_baum_id TEXT,
  blutzikade_befallen_baum TEXT,
  geometry BLOB
);
```

#### `klebefallen`

```sql
CREATE TABLE klebefallen (
  id INTEGER PRIMARY KEY,
  falle_id TEXT,
  baum_ref TEXT,
  e_lv95 REAL,
  n_lv95 REAL,
  abstand_boden_cm INTEGER,
  exposition_falle TEXT,
  datum_installation TEXT,
  datum_abbau TEXT,
  anzahl_zikaden INTEGER,
  nachweis_zikade TEXT,
  verdachtsprobe_wss TEXT,
  expositionsdauer_tage INTEGER,
  geometry BLOB
);
```

### GeoPackage Binary Geometry

```javascript
function createGpkgPoint(lon, lat) {
  const buf = new ArrayBuffer(29);
  const v = new DataView(buf);
  v.setUint8(0, 0x47);       // 'G'
  v.setUint8(1, 0x50);       // 'P'
  v.setUint8(2, 0x00);       // Version
  v.setUint8(3, 0x01);       // Flags (little-endian, non-empty)
  v.setInt32(4, 4326, true);  // SRS ID
  v.setUint8(8, 0x01);       // WKB little endian
  v.setUint32(9, 1, true);   // WKB Type = Point
  v.setFloat64(13, lon, true); // X (Longitude)
  v.setFloat64(21, lat, true); // Y (Latitude)
  return new Uint8Array(buf);
}
```

---

*Quelle: Auftrag.md Exportformate + OGC GeoPackage Specification*
