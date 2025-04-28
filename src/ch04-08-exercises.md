# Übungen

Lassen Sie uns mit den oben genannten Kenntnissen einige Übungen durchführen
vertiefen unsere Kenntnisse des BAM-Formats. 


###  Übungen 1

Die erste Übung beschäftigt sich
mit der Bitflag. Wir haben gesehen, dass die Bitflags 99 und 147 waren
unseren Paired-End-Reads zugewiesen. Was bedeuten sie?  Schreiben Sie diese Zahlen in binärer und hexadezimaler Darstellung auf und konsultieren Sie  Tabelle 1 in [Kapitel 4-05](ch04-05-bitflag.md).

Nun schreiben Sie ein kleines Rust-Program, dass einen SAM-Bitstring (in Form einer Ganzzahl) als Kommandozeilenargument nimmt und anzeigt, welche Bits "an" sind.

### Übung 2

Bestimmen Sie die CIGAR-Strings, 1-basierte Positionen (<code>POS</code>) und die <code>NM</code>- und <code>MD</code>-Tags für die folgenden Ausrichtungen: 

<pre>
ref:  CCATACT-GAACTGACTAAC
          ||| ||| || ||
read:     ACTAGAA-TGGCT
</pre>
 
und

<pre>
ref:  ATCCCCTCATCC-GCCTGCTCCTTCTCACATG
        |  | ||||| |||||||||||   |||||  
read:   CTACGCATCCGGCCTGCTCCTT---ACATG
</pre>

Nun schreiben Sie ein kleines Rust-Programm, das ein solches Aligment aus einer Datei einliest und den entsprechenden CIGAR-String auf die Kommandozeile ausgibt.


### Übung 3

Bestimmen Sie das Alignment zwischen dem folgenden Read:
<pre>
read:  CATTCATACTGAA
</pre>

und dem Referenzgenom:

<pre>
ref:  AGCATTACTACTAAATTT 
</pre>

wobei <code>POS</code> 3 beträgt und der CIGAR-String <code>4M1D1M1I7M</code> lautet.

Nun schreiben und testen Sie eine entsprechende Rust-Funktion mit der folgenden Signatur

<pre>
fn align_by_cigar<T: Into<String>, U: Into<String>, V: Into<String>>(
    read: T, 
    genome: U, 
    pos: i32, 
    cigar: V) -> String {
        todo!();
    }
</pre>

### Übung 4

Bestimmen Sie <code>NM</code> für den CIGAR-String <code>50M</code> und den <code>MD</code>-Eintrag von <code>MD:Z:4A45</code>.

Bestimmen Sie <code>NM</code> für den CIGAR-String <code>6M1D23M</code> und den <code>MD</code>-Eintrag von <code>MD:Z:1T4^T1C21</code>.

Schreiben und testen Sie eine entsprechende Rustfunktion.
