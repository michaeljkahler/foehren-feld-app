# QS-Iterationen v2.1 — Auftrag 14: Termin-basierte Reiter

> **Version:** v2.1.0
> **Datum:** 2026-04-08
> **Methode:** Manuelles Testing in Chrome (nach Push auf GitHub Pages)
> **Tester:** MJ + Fachleute
> **Umfang:** 5 Iterationen, 72 Testfälle

---

## Iteration 1 — Navigation & Reiterstruktur

> **Fokus:** 5 Reiter korrekt, Termin-Toggle entfernt, switchSection() setzt currentTermin

| # | Testfall | Erwartet | ✅/❌ | Bemerkung |
|---|----------|----------|-------|-----------|
| 1.01 | App laden — 5 Reiter sichtbar | 🗺️ Standort · 🌲 Termin 1 · 🌿 Termin 2 · 📊 Resultate · 📤 Export | | |
| 1.02 | Kein Termin-Toggle im Header | Alte T1/T2-Buttons sind entfernt | | |
| 1.03 | Klick Standort → section-standort | Standort-Inhalte sichtbar | | |
| 1.04 | Klick Termin 1 → section-termin1 | Baumliste mit T1-Icons, currentTermin = 1 | | |
| 1.05 | Klick Termin 2 → section-termin2 | Baumliste mit T2-Icons, currentTermin = 2 | | |
| 1.06 | Klick Resultate → section-resultate | Dashboard sichtbar | | |
| 1.07 | Klick Export → section-export | Export-Buttons sichtbar | | |
| 1.08 | Reiter-Wechsel T1 → T2 → T1 | currentTermin wechselt korrekt (1 → 2 → 1) | | |
| 1.09 | Aktiver Reiter visuell hervorgehoben | Aktiver Button hat andere Farbe/Stil | | |
| 1.10 | App laden auf Mobile (≤400px) | Alle 5 Reiter sichtbar, Touch-Targets ≥44px | | |
| 1.11 | FR-Version: 5 Reiter korrekt | 🗺️ Site · 🌲 Terme 1 · 🌿 Terme 2 · 📊 Résultats · 📤 Export | | |

---

## Iteration 2 — Standort-Reiter + Speicher-Buttons

> **Fokus:** Standort terminneutral, alle Blöcke mit Speicher-Button

| # | Testfall | Erwartet | ✅/❌ | Bemerkung |
|---|----------|----------|-------|-----------|
| 2.01 | Aufnahme-Info Block vorhanden | Plot-ID, Aufnehmer, Datum T1/T2 | | |
| 2.02 | GPS & Lage Block vorhanden | Koordinaten-Felder, Exposition, Hangneigung | | |
| 2.03 | Bestandesbeschreibung Block | Waldgesellschaft, Vegetation etc. | | |
| 2.04 | Polytrap Block vorhanden | Insektenfalle/Polytrap-Felder | | |
| 2.05 | Zapfensammlung Block vorhanden | Diplodia-Zapfensammlung-Felder | | |
| 2.06 | Methodenkritik Block vorhanden | Freitext-Feld für Methodenkritik | | |
| 2.07 | 💾 Speichern in Aufnahme-Info | Klick → Button wird grün "✅ Gespeichert", nach 3s zurück | | |
| 2.08 | 💾 Speichern in GPS & Lage | Klick → Button wird grün "✅ Gespeichert", nach 3s zurück | | |
| 2.09 | 💾 Speichern in Bestandesbeschreibung | Klick → visuelles Feedback korrekt | | |
| 2.10 | 💾 Speichern in Polytrap | Klick → visuelles Feedback korrekt | | |
| 2.11 | 💾 Speichern in Zapfensammlung | Klick → visuelles Feedback korrekt | | |
| 2.12 | 💾 Speichern in Methodenkritik | Klick → visuelles Feedback korrekt | | |
| 2.13 | Auto-Save weiterhin aktiv | Daten ändern → localStorage wird aktualisiert (ohne Button-Klick) | | |
| 2.14 | App neu laden nach Speicher-Button | Alle Daten korrekt wiederhergestellt | | |
| 2.15 | FR: Speicher-Buttons vorhanden | "💾 Enregistrer" → "✅ Enregistré" | | |

---

## Iteration 3 — Termin 1: Baumliste & Modal

> **Fokus:** T1-spezifische Felder, korrekte Status-Icons, kein Saugschäden-Karussell

| # | Testfall | Erwartet | ✅/❌ | Bemerkung |
|---|----------|----------|-------|-----------|
| 3.01 | Baumliste im T1-Reiter | Alle Bäume mit T1-Status-Icons | | |
| 3.02 | Grosser Baum (≥20cm) — Icons | 📍 🍄 🐛 in der Baumliste | | |
| 3.03 | Kleiner Baum (<20cm) — Icons | 📍 🐛 🪤 in der Baumliste | | |
| 3.04 | Grosser Baum Modal öffnen | BHD + GPS, Kronenverlichtung, Diplodia, Spinner, Bemerkungen | | |
| 3.05 | Grosser Baum: BHD editierbar | Wert kann geändert und gespeichert werden | | |
| 3.06 | Grosser Baum: GPS erfassen | Geolocation wird korrekt erfasst | | |
| 3.07 | Grosser Baum: Kronenverlichtung | SANASILVA Referenz + Schieberegler | | |
| 3.08 | Grosser Baum: Diplodia | Nur erste 10 Bäume → Diplodia-Sektion sichtbar | | |
| 3.09 | Grosser Baum: Spinner — Gespinstnester | Ja/Nein + Anzahl | | |
| 3.10 | Kleiner Baum Modal öffnen | BHD + GPS, Spinner, Klebefalle-Toggle, Bemerkungen | | |
| 3.11 | Kleiner Baum: Klebefalle Ja → Felder | Abstand Boden, Exposition, Datum Installation sichtbar | | |
| 3.12 | Kleiner Baum: Klebefalle Nein → keine Felder | Installation-Felder versteckt | | |
| 3.13 | Kleiner Baum: Max 5 Fallen | 6. Falle → Warnung, Toggle blockiert | | |
| 3.14 | Kein Saugschäden-Karussell bei T1 | Schadbild-Sektion nicht sichtbar im T1-Modal | | |
| 3.15 | Kein Fallenabbau bei T1 | Abbau-Felder nicht sichtbar im T1-Modal | | |
| 3.16 | Baum speichern → Liste aktualisiert | Icons grün/aktualisiert nach Speichern | | |
| 3.17 | FR: T1-Modal korrekt übersetzt | Piège collant, Nids de processionnaire etc. | | |

---

## Iteration 4 — Termin 2: Baumliste, Modal & Schadbild-Karussell (7 Karten)

> **Fokus:** T2-spezifische Felder, readonly BHD/GPS, erweitertes Schadbild-Karussell, Standort-Zusammenfassung

| # | Testfall | Erwartet | ✅/❌ | Bemerkung |
|---|----------|----------|-------|-----------|
| 4.01 | Standort-Zusammenfassung oben im T2-Reiter | Kompakte Anzeige: Plot-ID, Koordinaten, Höhe, Baumzahlen, Fallen | | |
| 4.02 | Zusammenfassung nicht editierbar | Nur Anzeige, keine Input-Felder | | |
| 4.03 | Baumliste im T2-Reiter | Alle Bäume mit T2-Status-Icons | | |
| 4.04 | Grosser Baum (≥20cm) — Icons T2 | 🌳 (KV aktualisiert?) | | |
| 4.05 | Kleiner Baum (<20cm) — Icons T2 | 🪤 (Fallenabbau) 🪤 (Saugschäden) | | |
| 4.06 | Grosser Baum T2-Modal | BHD readonly, GPS readonly, KV aktualisieren, Diplodia aktualisieren | | |
| 4.07 | Grosser Baum: BHD nicht editierbar | Feld ist readonly / disabled | | |
| 4.08 | Grosser Baum: Kein Spinner bei T2 | Spinner-Sektion nicht sichtbar | | |
| 4.09 | Kleiner Baum T2-Modal | BHD readonly, GPS readonly, Fallenabbau, Saugschäden, Bemerkungen | | |
| 4.10 | Fallenabbau nur wenn T1-Falle = Ja | Baum ohne Falle → kein Abbau-Block | | |
| 4.11 | Fallenabbau: Datum, Zikaden, Verdachtsprobe | Alle Felder vorhanden und funktional | | |
| 4.12 | Fallenabbau: Expositionsdauer auto | Automatisch berechnet aus T1-Datum und Abbau-Datum | | |
| 4.13 | Schadbild-Karussell: 7 Karten sichtbar | Horizontal scrollbar, alle 7 Karten vorhanden | | |
| 4.14 | Karte 1: Blutzikade — Saugschäden | Bild ref_blutzikade.jpeg + Label korrekt | | |
| 4.15 | Karte 2: Rostpilz — Coleosporium | Bild ref_rostpilz.jpeg + Label korrekt | | |
| 4.16 | Karte 3: Kiefernschütte — Lophodermium | Bild ref_kiefernschuette.jpeg + Label korrekt | | |
| 4.17 | Karte 4: Scheidenrüssler — Brachonyx pineti | Bild ref_scheidenruessler.jpeg + Label korrekt | | |
| 4.18 | Karte 5: Blattkäfer — Luperus pinicola | Bild ref_blattkaefer.jpeg + Label korrekt | | |
| 4.19 | Karte 6: Rotband — Dothistroma/Lecanosticta | Bild ref_rotband.jpeg + Label korrekt | | |
| 4.20 | Karte 7: Unklar | Fragezeichen-Icon, kein Bild | | |
| 4.21 | Karussell-Auswahl speichert schadbild_bestimmung | Werte: blutzikade, rostpilz, kiefernschuette, scheidenruessler, blattkaefer, rotband, unklar | | |
| 4.22 | 5 Triebe × % befallene Nadeln | 5 Schieberegler vorhanden und funktional | | |
| 4.23 | Belegprobe Ja/Nein | Toggle vorhanden und speichert korrekt | | |
| 4.24 | Kein Spinner bei T2 (kleiner Baum) | Spinner-Sektion nicht sichtbar | | |
| 4.25 | Kein Klebefalle-Installation bei T2 | Installations-Felder nicht sichtbar | | |
| 4.26 | FR: Schadbild-Karussell 7 Karten | Cicadelle, Rouille, Chute des aiguilles, Charançon, Chrysomèle, Bande rouge, Indéterminé | | |
| 4.27 | FR: Standort-Zusammenfassung | Résumé du site korrekt übersetzt | | |

---

## Iteration 5 — Resultate-Dashboard (Bugfixes) + Export + Service Worker

> **Fokus:** GPS-Anzeige, Bestandestyp, vollständiger Export, SW-Cache

| # | Testfall | Erwartet | ✅/❌ | Bemerkung |
|---|----------|----------|-------|-----------|
| 5.01 | Resultate: GPS wird angezeigt | koordinate_lat / koordinate_lon korrekt (nicht "Nicht erfasst") | | |
| 5.02 | Resultate: Bestandestyp wird angezeigt | waldgesellschaft korrekt (nicht "—") | | |
| 5.03 | Resultate: standortComplete korrekt | Prüft koordinate_lat, waldgesellschaft statt alte Felder | | |
| 5.04 | Resultate: Baum-Zusammenfassung | Anzahl Bäume, KV-Durchschnitt, Diplodia-Status | | |
| 5.05 | Resultate: Klebefallen-Zusammenfassung | Anzahl Fallen, Zikaden-Summe korrekt | | |
| 5.06 | Resultate: Saugschäden-Zusammenfassung | Schadbild-Verteilung inkl. neue 3 Kategorien | | |
| 5.07 | Resultate: Spinner-Zusammenfassung | Befallene Bäume korrekt gezählt | | |
| 5.08 | CSV-Export: Baum-Daten | Alle Spalten vorhanden, Semikolon-Trenner, UTF-8 BOM | | |
| 5.09 | CSV-Export: hat_klebefalle Spalte | Werte true/false korrekt | | |
| 5.10 | CSV-Export: schadbild_bestimmung | Neue Werte (scheidenruessler, blattkaefer, rotband) korrekt exportiert | | |
| 5.11 | GeoJSON-Export | Alle Features vorhanden, EPSG:4326, schadbild_bestimmung korrekt | | |
| 5.12 | JSON-Backup Export | Vollständiger app.data Download | | |
| 5.13 | JSON-Backup Import | Daten korrekt wiederhergestellt | | |
| 5.14 | Service Worker: 3 neue Bilder gecacht | ref_scheidenruessler, ref_blattkaefer, ref_rotband in ASSETS | | |
| 5.15 | Service Worker: Cache-Version erhöht | CACHE_NAME > v1.9.0 | | |
| 5.16 | Offline-Modus: App laden | App funktioniert ohne Netzwerk, inkl. neue Bilder | | |
| 5.17 | FR: Resultate-Dashboard | Alle Bugfixes auch in FR-Version | | |
| 5.18 | FR: Export korrekt | CSV/GeoJSON/JSON identisch wie DE | | |
| 5.19 | Datenkompatibilität: Altes JSON laden | v2.0 Backup in v2.1 importieren → keine Fehler | | |

---

## Zusammenfassung

| Iteration | Fokus | Testfälle |
|-----------|-------|-----------|
| 1 | Navigation & Reiterstruktur | 11 |
| 2 | Standort + Speicher-Buttons | 15 |
| 3 | Termin 1 — Baumliste & Modal | 17 |
| 4 | Termin 2 — Modal & Schadbild-Karussell (7 Karten) | 27 |
| 5 | Resultate (Bugfixes) + Export + Service Worker | 19 |
| **Total** | | **89** |

---

## Testumgebung

- **Browser:** Chrome (Desktop + Mobile Simulation)
- **URL:** `https://michaeljkahler.github.io/foehren-feld-app/foehren-feld-app.html`
- **FR:** `https://michaeljkahler.github.io/foehren-feld-app/foehren-feld-app-fr.html`
- **Methode:** Manuell nach Push auf GitHub Pages
- **Geräte:** Desktop Chrome + DevTools Mobile (iPhone SE, Galaxy S21)

---

*Ende QS_Iterationen_v2.1.md — 2026-04-08*
