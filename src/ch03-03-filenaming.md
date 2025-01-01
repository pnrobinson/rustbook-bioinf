# Illumina FASTQ-Dateibenennungsschema


Illumina verwendet ein Standardbenennungsschema für FASTQ-Dateien. Es ist nützlich zu verstehen, wie dieses Schema aufgebaut ist. Das allgemeine Schema für solche Dateien lautet

<code>
{Probenname}_{Barcode_sequenz}_L{Spurnummer}_R{Readnummer}_{Satz_Nummer}.fastq.gz 
</code>, 

d.h.,  english

<code>
{sample_name}_{barcode_sequence}_L{lane}_R{read_number}_{set_number}.fastq.gz 
</code>.



Schauen wir uns die folgende GIAB-Datei ([Genome in a bottle](https://www.nist.gov/programs-projects/genome-bottle)) an:
<pre>
NIST7035_TAAGGCGA_L001_R1_001.fastq.gz
</pre>


Die Bestandteile dieses Namens sind:

<ol>
<li><code>sample_name</code>: NIST7035. Dies ist der Probenname, der im Probenblatt für den Sequenzierungslauf angegeben ist. </li>
<li><code>barcode_sequence</code>: TAAGGCGA. Dies ist die Nukleotidsequenz des molekularen Barcodes, der zur Markierung der Probe für das Multiplexing verwendet wird. </li>
<li><code>lane</code>: 001. Die Lane-Nummer (1--8).
<li><code>Spurnummer</code> (d.h., read number): 1. Die Read-Nummer für Paired-End-Reads. R1 bedeutet Read 1, und für einen Paired-End-Sequenzierungslauf gibt es eine zusätzliche Datei mit R2 (Read 2), deren Name ansonsten genau dem Dateinamen für Read 1 entspricht</li>
<li><code>set_number</code>: 001. Die maximale Dateigröße von FASTQ-Dateien wird mit der Befehlszeilenoption <code>--fastq-cluster-count</code> des Skripts <code>configureBclToFastq.pl</code> festgelegt, das Teil der Illumina \index{CASAVA} CASAVA-Software-Suite gehört. Wenn mehr Daten vorhanden sind, werden die Daten in separate FASTQ-Dateien mit der entsprechenden Dateigröße aufgeteilt (Um nur eine einzige FASTQ-Datei zu erstellen, kann eine ``0'' angegeben werden). Die verschiedenen Dateien, die derselben Probe/demselben Barcode/derselben Spur entsprechen, werden durch die mit 0 gefüllte dreistellige Set-Nummer unterschieden.</li>
</ol>


Bestimmte Illumina-Sequenzer verwenden andere FASTQ-Dateibenennungsschemata. Einzelheiten finden Sie in der Illumina-Dokumentation.


## Paired-End-Sequenzierung

Beachten Sie, dass bei Paired-End-Läufen die übereinstimmenden FASTQ-Dateien genau die gleiche Anzahl von Reads aufweisen müssen und die Reads in beiden Dateien die gleiche Reihenfolge haben müssen. Dies kann mit den UNIX-Befehlen <code>zcat</code> und <code>wc</code> überprüft werden. Der Befehl <code>cat</code> liest Daten aus Textdateien und gibt deren Inhalt auf der Befehlszeilenschnittstelle aus, und der Befehl \verb+zcat+ tut dasselbe mit gzip-komprimierten Dateien. Der Befehl <code>wc</code> zählt Wörter, Zeilen und Zeichen in Textdateien. Wenn wir die Befehle wie folgt kombinieren, sehen wir, dass jede der beiden heruntergeladenen Dateien die gleiche Anzahl von Zeilen hat.

<pre>
$ zcat NIST7035_TAAGGCGA_L001_R1_001.fastq.gz | wc -l
80812008
$ zcat NIST7035_TAAGGCGA_L001_R2_001.fastq.gz | wc -l
80812008
</pre>

Wir können nun die Gesamtzahl der Zeilen durch vier teilen, um die Gesamtzahl der Reads zu erhalten (da jeder Read insgesamt vier Zeilen in der FASTQ-Datei einnimmt). Beachten Sie, dass wir nicht einfach nach Zeilen suchen können, die mit <code>@</code> beginnen, da das ASCII-Symbol, das einem Phred-Score von 31 entspricht, ebenfalls <code>@</code> ist und somit auch Qualitätszeilen mit diesem Zeichen beginnen können.



