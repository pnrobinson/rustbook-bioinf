# FastQC in Rust

<div class="emphasis-box">
    In diesem Abschnitt wollen wir üben, wie man eine Rustapplikation konzipiert und die Software-Architektur entwirft (Stukturen, Traits, Module, usw.). Praktikumsteilnehmer sollen
    sich erstmal jeder für sich eine Applikation <emph>entwerfen</emph>. Wir werden die Entwürfe zusammen besprechen und Teilnehmer sollen ihre entwürfe entsprechend ggf. korrigieren. Die Programmierarbeit soll in Kleingruppen wie oben beschrieben geleistet werden. 
</div>

FastQC ist eine Applikation, die unter anderem eine Qualitätsbewertung von FASTQ-Dateien ausführt und die Ergebnisse in tabellarischer Form bzw. graphisch darstellt. Inzwischen gibt es viele neuere Applikationen, aber FastQC wurde früher von sehr vielen Gruppen sehr oft verwendet. 

Zur Kontrolle Ihrer Ergebnisse können Sie FastQC [hier](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/) herunterladen.

Ziel dieses Abschnitts ist es, die folgenden Funktionen zu als Rust-Applikation zu programmieren.

### Befehlszeilenargumentenparser

Ihre Applikation soll den Pfad zu einer (Single-End) oder zwei (Paired-End) FASTQ-Dateien also Kommandozeilenargumente einlesen.

Wir empfehlen [clap](https://docs.rs/clap/latest/clap/).

### Beschreibende Statistiken

Als erstes überprüfen Sie ob die Datei existiert. Falls nicht, geben Sie eine verständliche Fehlermeldung aus.

Geben Sie die Informationen über den Dateinamen aus (s. hierzu letzte Seite) 

### Sequenzqualität (pro Base)

Geben Sie eine Tabelle aus mit der durchschnittlichen Qualität (Phred-Wert) für jede Position der Reads.

### Sequenzqualität (pro Sequenz)

Geben Sie die durchschnittliche Qualität aller Reads aus.

### Sequenzidentität (pro Base)

Geben Sie die durchschnittlichen Anteile von A, C, G, T für jede Position der Reads aus.

### GC-Gehalt (pro Base)
Der GC-Gehalt definiert sich als prozentualer Anteil der Nukleotidbasen Guanin und Cytosin an der Gesamtheit der vier Basen (Adenin, Thymin, Guanin, Cytosin) der DNA. Sie den [Wikipedia-Eintrag](https://de.wikipedia.org/wiki/GC-Gehalt).  Geben Sie den durchschnittlichen GC-Gehalt für jede Position der Reads aus.

### GC-Gehalt (pro Sequenz)
Geben Sie den durchschnittlichen GC-Gehalt aller Reads aus.

### Längenverteilung
Geben Sie eine Tabelle mit der Verteilung der Längen der einzelen Read aus (Anzahl und Prozentsatz).
