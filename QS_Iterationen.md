# QS-Iterationen — Auftrag 13: Vereinfachung auf 4 Reiter

> **Projekt:** Föhrengesundheit Feld-App v2.0
> **Datum:** 2026-04-08
> **Ziel:** Strukturierte Qualitätssicherung in 4 Iterationen, damit Fachleute die neue App-Version systematisch testen können.

---

## Testvoraussetzungen

- Smartphone (iOS oder Android) mit aktuellem Browser (Safari / Chrome)
- App-URL oder lokale HTML-Datei
- Testdaten: JSON-Backup von einem bestehenden Standort ODER Neuerfassung
- Zwei Durchgänge: einmal als Termin 1, einmal als Termin 2

---

## Iteration 1 — Navigation & Grundstruktur

**Fokus:** Sind die 4 Reiter korrekt, vollständig und intuitiv?

### Testschritte

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 1.1 | App öffnen | 4 Reiter sichtbar: 🗺️ Standort, 🌲 Bäume, 📊 Resultate, 📤 Export | ☐ |
| 1.2 | Alle Reiter durchklicken | Jeder Reiter öffnet die richtige Sektion, kein leerer Bildschirm | ☐ |
| 1.3 | Termin 1 wählen → Reiter prüfen | Alle 4 Reiter sichtbar und funktional | ☐ |
| 1.4 | Termin 2 wählen → Reiter prüfen | Alle 4 Reiter sichtbar und funktional | ☐ |
| 1.5 | Alte Reiter suchen | Diplodia-, Spinner-, Blutzikade-Reiter dürfen NICHT mehr existieren | ☐ |
| 1.6 | Standort-Reiter öffnen | Aufklappbare Blöcke: Aufnahme-Info, GPS, Bestand, Polytrap, Zapfen, Methodenkritik | ☐ |
| 1.7 | Bäume-Reiter öffnen | Baumliste mit Status-Icons sichtbar | ☐ |

### Feedback-Fragen an Fachleute

- Ist die Reihenfolge der 4 Reiter logisch für den Feld-Workflow?
- Fehlt ein Reiter oder eine Information?
- Ist die Standort-Sektion überladen oder passt alles?

---

## Iteration 2 — Standort-Erfassung (Plot-Level)

**Fokus:** Stimmen die standortbezogenen Felder? Polytrap, Zapfen, Methodenkritik korrekt integriert?

### Testschritte Termin 1

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 2.1 | Aufnahme-Info ausfüllen | Plot-ID, Aufnehmer, Datum T1 speichern OK | ☐ |
| 2.2 | GPS erfassen | Koordinaten + LV95 korrekt | ☐ |
| 2.3 | Bestandesbeschreibung ausfüllen | Alle Felder vorhanden und speicherbar | ☐ |
| 2.4 | Polytrap aufklappen | Felder: Status, Datum Installation, Proben-ID, Bemerkung | ☐ |
| 2.5 | Polytrap = Installiert setzen | Status speichert korrekt | ☐ |
| 2.6 | Zapfensammlung aufklappen | Felder: Anzahl Zapfen, Sack-ID, Bemerkungen | ☐ |
| 2.7 | 20 Zapfen + Sack-ID eintragen | Daten speichern OK | ☐ |
| 2.8 | Methodenkritik aufklappen | Freitext-Feld vorhanden und speicherbar | ☐ |

### Testschritte Termin 2

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 2.9 | Termin 2 wählen | T1-Daten bleiben erhalten | ☐ |
| 2.10 | Polytrap öffnen | Zusätzlich: Datum Abbau sichtbar (nur T2) | ☐ |
| 2.11 | Polytrap = Geleert setzen + Abbau-Datum | Daten speichern OK, Proben-ID bleibt | ☐ |

### Feedback-Fragen

- Ist "Insektenfalle / Polytrap" der richtige Name?
- Gehört die Methodenkritik zum Standort oder wäre sie besser bei Resultate?
- Werden die Zapfen-Infos zu T1 oder T2 erfasst? Passt die Platzierung?

---

## Iteration 3 — Baum-Modal: Alle Organismen

**Fokus:** Kernstück der App — stimmt die Erfassung pro Baum? Klebefallen-Integration korrekt?

### Testschritte Termin 1, grosser Baum (≥20cm)

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 3.1 | Grossen Baum in Liste antippen | Modal öffnet mit BHD, GPS, KV-Slider | ☐ |
| 3.2 | GPS erfassen | Koordinaten + LV95 korrekt, Genauigkeit angezeigt | ☐ |
| 3.3 | Kronenverlichtung einstellen | Slider 0–100%, Farbe ändert sich, Referenzbild klickbar | ☐ |
| 3.4 | Diplodia-Sektion prüfen | 3 Äste mit Triebe/Infiziert, Befallsintensität auto-berechnet | ☐ |
| 3.5 | Diplodia: Nicht sichtbar ab Baum 11 | Ab Baum 11 kein Diplodia-Block (10-Baum-Limit) | ☐ |
| 3.6 | Spinner-Sektion prüfen | Feld "Anzahl Nester" vorhanden | ☐ |
| 3.7 | Klebefalle-Sektion | NICHT sichtbar (nur für <20cm) | ☐ |
| 3.8 | Saugschäden-Sektion | NICHT sichtbar (nur T2 + <20cm) | ☐ |
| 3.9 | Speichern | Alle Daten korrekt gespeichert, Icon in Baumliste aktualisiert | ☐ |

### Testschritte Termin 1, kleiner Baum (<20cm)

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 3.10 | Kleinen Baum antippen | Modal öffnet mit BHD, GPS | ☐ |
| 3.11 | Kronenverlichtung | NICHT sichtbar (nur ≥20cm) | ☐ |
| 3.12 | Spinner-Sektion | Feld "Anzahl Nester" vorhanden (T1) | ☐ |
| 3.13 | Klebefalle-Toggle | Sichtbar: "Falle installiert: Nein / Ja" | ☐ |
| 3.14 | Klebefalle = Ja | Zusatzfelder erscheinen: Abstand Boden, Exposition, Datum | ☐ |
| 3.15 | Felder ausfüllen | Abstand 120cm, Exposition SO, Datum 2026-04-28 | ☐ |
| 3.16 | 5 Fallen-Limit testen | 6. Baum mit Falle → Warnung "Max 5 Fallen erreicht" | ☐ |
| 3.17 | Saugschäden | NICHT sichtbar (nur T2) | ☐ |
| 3.18 | Speichern | Falle korrekt gespeichert, Icon 🪤✅ in Liste | ☐ |

### Testschritte Termin 2, kleiner Baum (<20cm)

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 3.19 | Termin 2 → kleinen Baum mit Falle öffnen | T1-Daten vorausgefüllt (Abstand, Exposition, Inst.-Datum) | ☐ |
| 3.20 | Klebefalle T2-Felder | Zusätzlich: Datum Abbau, Anzahl Zikaden, Verdachtsprobe WSS | ☐ |
| 3.21 | Anzahl Zikaden = 3 eintragen | Nachweis-Anzeige: "✅ Nachweis (3 Zikaden)" | ☐ |
| 3.22 | Expositionsdauer | Auto-berechnet: Differenz Installation → Abbau in Tagen | ☐ |
| 3.23 | Spinner-Sektion | NICHT sichtbar bei T2 (T1-Daten final) | ☐ |
| 3.24 | Saugschäden-Sektion | Sichtbar: Schadbild-Karussell + 5 Trieb-Slider | ☐ |
| 3.25 | Schadbild-Karussell | 4 Karten: Blutzikade, Rostpilz, Kiefernschütte, Unklar | ☐ |
| 3.26 | Schadbild auswählen | Grüne Markierung + Statustext "✅ Bestimmt: Rostpilz" | ☐ |
| 3.27 | Referenzbild antippen | Lightbox öffnet mit vergrössertem Bild | ☐ |
| 3.28 | 5 Trieb-Slider einstellen | Werte 0–100% in 5%-Schritten | ☐ |
| 3.29 | Belegprobe = Ja | Toggle funktioniert | ☐ |
| 3.30 | Speichern | Alle Daten korrekt: Falle + Saugschäden + Schadbild | ☐ |

### Feedback-Fragen

- Ist das Modal zu lang / zu viel Scrollen?
- Ist die Reihenfolge im Modal logisch (BHD → GPS → KV → Diplodia → Spinner → Falle → Saugschäden)?
- Sind die bedingten Felder intuitiv (erscheinen/verschwinden je nach BHD + Termin)?
- Funktioniert der Klebefalle-Toggle gut auf dem Handy?

---

## Iteration 4 — Resultate, Export & Datenintegrität

**Fokus:** Stimmen Zusammenfassungen, Exporte und JSON-Backup?

### Testschritte Resultate

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 4.1 | Resultate-Reiter öffnen | Dashboard mit Gesamtfortschritt | ☐ |
| 4.2 | Diplodia-Zusammenfassung | Karten pro Baum, Ø Befallsintensität, ✏️ Buttons | ☐ |
| 4.3 | Spinner-Zusammenfassung | Karten pro Baum, Ø Nester, Label "T1-Daten" bei T2 | ☐ |
| 4.4 | Klebefallen-Zusammenfassung | Installiert X/5, Zikaden-Nachweis, Expositionsdauer | ☐ |
| 4.5 | Saugschäden-Zusammenfassung | Karten pro Baum, Ø Befall, Schadbild-Verteilung | ☐ |
| 4.6 | ✏️ Button bei Baum-Karte | Öffnet Baum-Modal mit vorausgefüllten Daten | ☐ |
| 4.7 | Export-Bereitschaft | Zeigt korrekt an was noch fehlt | ☐ |

### Testschritte Export

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 4.8 | CSV Bäume exportieren | Datei enthält alle Felder inkl. schadbild_bestimmung, hat_klebefalle | ☐ |
| 4.9 | CSV Fallen exportieren | Separate Datei mit Fallen-Daten, falle_id = F-BXX | ☐ |
| 4.10 | GeoJSON exportieren | Baum-Features + Fallen-Features + Standort korrekt | ☐ |
| 4.11 | JSON-Backup erstellen | Datei herunterladen, Dateigrösse plausibel | ☐ |
| 4.12 | JSON-Backup laden (anderes Gerät) | Alle Daten korrekt wiederhergestellt | ☐ |
| 4.13 | CSV in Excel öffnen | Semikolon-Trennung, UTF-8, Umlaute korrekt | ☐ |

### Testschritte Datenintegrität

| Nr. | Aktion | Erwartetes Ergebnis | OK? |
|-----|--------|---------------------|-----|
| 4.14 | App schliessen + neu öffnen | Alle Daten aus LocalStorage wiederhergestellt | ☐ |
| 4.15 | T1-Daten bei T2 prüfen | Spinner-Daten nicht überschreibbar, Klebefalle T1-Felder readonly | ☐ |
| 4.16 | Baum löschen mit Falle | Falle wird ebenfalls entfernt | ☐ |
| 4.17 | Klebefalle Nein → Ja → Nein | Falle wird korrekt angelegt und wieder entfernt | ☐ |
| 4.18 | Offline-Modus testen | App funktioniert ohne Internet (SW-Cache) | ☐ |

### Feedback-Fragen

- Stimmen die berechneten Werte (Befallsintensität, Expositionsdauer, Ø)?
- Sind die CSV-Spalten vollständig für die Auswertung?
- Fehlen Felder im Export die für die Analyse benötigt werden?
- Ist das JSON-Backup zuverlässig für den Transfer zwischen Geräten?

---

## Übersicht: Testmatrix pro Iteration

| Iteration | Fokus | Testfälle | Geschätzte Dauer |
|-----------|-------|-----------|-----------------|
| 1 | Navigation & Grundstruktur | 7 | 10 min |
| 2 | Standort (Plot-Level) | 11 | 15 min |
| 3 | Baum-Modal (alle Organismen) | 30 | 45 min |
| 4 | Resultate, Export, Datenintegrität | 18 | 30 min |
| **Total** | | **66** | **~100 min** |

---

## Feedback-Protokoll

| Iteration | Tester | Datum | Kritische Fehler | Verbesserungen | Freigabe? |
|-----------|--------|-------|-----------------|----------------|-----------|
| 1 | | | | | ☐ |
| 2 | | | | | ☐ |
| 3 | | | | | ☐ |
| 4 | | | | | ☐ |

---

*Ende QS_Iterationen.md — 2026-04-08*
