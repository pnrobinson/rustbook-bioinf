# SAM/BAM

<div class="emphasis-box">
    <strong>Ziele:</strong>
    <ol>
    <li>SAM/BAM verstehen</li>
    <li>Ausgewählte SAM/BAM-Analysen in idiomatischem Rust programmieren.</li>
    </ol>
    
</div>

Das SAM-Format (Sequence Alignment/Map) ist ein tabulatorgetrenntes Textformat, das ein universelles Format für die Speicherung von Alignments von NGS-Reads zu einem Referenzgenom sein soll.[^note] BAM (Binary Alignment/Map) ist die komprimierte (binäre) Version von SAM. Das SAM/BAM-Format kann Alignments von allen wichtigen Alignern wie [Bowtie 2](https://bowtie-bio.sourceforge.net/bowtie2/index.shtml) oder [BWA](https://github.com/lh3/bwa) speichern, unterstützt die Indexierung für eine schnelle Suche und Betrachtung mit dem IGV und wird von Software zur Variantenerkennung weitgehend unterstützt. 

Es gibt eine umfangreiche Online-Dokumentation des Formats, und wir werden hier nicht versuchen, alle Details zu behandeln. Stattdessen werden wir die verschiedenen Komponenten des Formats anhand von kleinen Beispielen intuitiv erklären. Darüber hinaus zeigen wir, wie man die Eigenschaften der durch SAM/BAM-Dateien dargestellten Alignments analysiert. Zu diesem Zweck werden wir hauptsächlich [SAMtools](https://www.htslib.org/) verwenden.




[^note]:Texte von diesem Kapitel wurden dem  Kapitel SAM/BAM Format von Peter Robinson and Peter Hansen} in [Computational Exome and Genome Analysis](https://www.amazon.com/Computational-Exome-Genome-Analysis-Robinson/dp/0367657740) entnommen und leicht angepasst.