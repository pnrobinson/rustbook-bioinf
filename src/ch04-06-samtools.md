# samtools


SAMtools kann Alignments filtern, um nur die alignierten Reads auszugeben, die 
bestimmten Kriterien entsprechen, einschließlich der Überlappung mit Regionen, die in einer BED-Datei (<code>-L</code>) angegeben sind, 
Zugehörigkeit zu bestimmten Lesegruppen (<code>-r</code>, <code>-R</code>), Herkunft aus einer bestimmten Bibliothek oder 
eine bestimmte Mindestanzahl von CIGAR-Basen haben, die die Abfragesequenz verbrauchen.[^note]

Die Option <code>-f <INT></code> gibt nur Alignments aus, bei denen alle Bits in <code>INT</code> 
im Feld <code>FLAG</code> gesetzt sind (<code>INT</code> kann als Dezimalzahl oder als 
hexadezimale Zahl angegeben werden, die mit '0x' beginnt). Dies führt eine UND-Verknüpfung mit allen Bits durch, die 
in <code>INT</code> gesetzt sind, was bedeutet, dass Sequenzen nur angezeigt werden, wenn mindestens die entsprechenden Bit 
Positionen in <code>FLAG</code> auf 1 gesetzt sind. Die Option <code>-F <INT></code> gibt keine Alignments aus, bei denen 
Bits, die in <code>INT</code> gesetzt sind, im Feld <code>FLAG</code>. Die Option <code>-F</code> überspringt daher alle 
Reads, für die <code>FLAG & INT != 0</code> ist. Um also nur primäre Reads auszugeben, können wir den 
folgenden Befehl verwenden.



<pre>
$ samtools view -F 0x900 NIST7035_aln.bam
</pre>

[^note]:Die 
<code>M</code>/<code>D</code>/<code>N</code>/<code>=</code>/<code>X</code>-Operatoren "verbrauchen" Referenzbasen (they are said to "consume reference 
bases.") 



Die mit diesem Befehl ausgegebenen Reads enthielten insgesamt 38 verschiedene Werte für das Bitfeld, von denen keiner die Bits 0x100 oder 0x800 enthielt. Mit dem folgenden Befehl werden alle sekundären Alignment-Reads extrahiert.


<pre>
$ samtools view -f 0x100 NIST7035_aln.bam
</pre>

Die Funktion <code>flagstat</code> von SAMtools bietet eine Zusammenfassung der 
Anzahl der Datensätze, die jedem der Bit-Flags von Tabelle 1 entsprechen. Die Auswertung unseres Beispieldatensatzes zeigt beispielsweise Folgendes.


<pre>
$ samtools flagstat NIST7035_aln37.bam 
35210329 + 0 in total (QC-passed reads + QC-failed reads)
0 + 0 duplicates
35210007 + 0 mapped (100.00%:-nan%)
35210329 + 0 paired in sequencing
17605154 + 0 read1
17605175 + 0 read2
34991352 + 0 properly paired (99.38%:-nan%)
35209746 + 0 with itself and mate mapped
261 + 0 singletons (0.00%:-nan%)
19085 + 0 with mate mapped to a different chr
9718 + 0 with mate mapped to a different chr (mapQ>=5)
</pre>



