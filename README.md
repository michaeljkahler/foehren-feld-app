# HAFL Föhrengesundheit — Feld-App

Offline-fähige Single-HTML-App zur strukturierten Feldaufnahme von drei Schadorganismen an Waldföhren im Rahmen der HAFL-Studie «Föhrengesundheit».

## Verwendung

1. `foehren-feld-app.html` auf dem Smartphone öffnen (Chrome oder Safari)
2. Seite zum Homescreen hinzufügen für Offline-Nutzung
3. **Termin 1** (Ende April): Standort, Bäume, Diplodia, Klebefallen-Installation
4. **Termin 2** (Ende Mai): Prozessionsspinner, Blutzikade, Klebefallen-Abbau
5. Export am Ende jedes Termins durchführen

## Module

| Modul | Inhalt | Termin |
|-------|--------|--------|
| **M0** | Standort & Bestandesaufnahme (bis 40 Bäume) | T1 |
| **MA** | *Diplodia sapinea* — Zapfen- und Kronenbefall | T1 |
| **MB** | Föhrenprozessionsspinner — Gespinstnester | T2 |
| **MC** | Kiefernblutzikade — Saugschäden & Klebefallen | T1+T2 |

## Export-Formate

- **CSV** (UTF-8 BOM, Semikolon): 3 Dateien — Standort, Bäume, Fallen
- **GeoJSON** (EPSG:4326): FeatureCollection mit allen Objekten
- **GeoPackage** (.gpkg): OGC-konform mit 3 Layern, direkt in QGIS ladbar

### QGIS-Import

- **GeoJSON**: Layer > Layer hinzufügen > Vektorlayer
- **GeoPackage**: Layer > Layer hinzufügen > Vektorlayer > .gpkg auswählen
- CRS: EPSG:4326 (WGS84) — LV95-Koordinaten als Attribute enthalten

## Technische Details

- Reines HTML5 / CSS3 / Vanilla JavaScript (kein Framework)
- GPS-Integration mit automatischer LV95-Transformation (swisstopo MN95)
- LocalStorage als Datenspeicher
- sql.js (SQLite-WASM) für GeoPackage-Export
- Mobile-first, optimiert für Smartphone-Nutzung im Wald

## Sicherheitshinweis

Beim Modul Föhrenprozessionsspinner: Gespinstnester und Raupen nicht berühren! Die App zeigt vor diesem Modul einen Pflicht-Sicherheitshinweis an.

## Lizenz

MIT License
