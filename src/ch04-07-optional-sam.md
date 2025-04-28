# SAM-TAGs: Optionale Felder



Auf die 11 Pflichtfelder können beliebig viele optionale Felder folgen. Alle optionalen Felder folgen dem 
<code>TAG:TYPE:VALUE</code>-Format, wobei <code>TAG</code> eine zweistellige Zeichenfolge, <code>TYPE</code> einer von sechs Datentypen (Tabelle 1) und <code>VALUE</code> der tatsächliche Wert ist.

<table>
  <caption>SAM-Format: Datentypen für die optionalen Tags</caption>
  <thead>
    <tr>
      <th>Typ</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>A</code></td>
      <td>Einzelzeichen</td>
    </tr>
    <tr>
      <td><code>Z</code></td>
      <td>String</td>
    </tr>
    <tr>
      <td><code>i</code></td>
      <td>32-Bit-Ganzzahl mit Vorzeichen</td>
    </tr>
    <tr>
      <td><code>f</code></td>
      <td>Float mit einfacher Genauigkeit (reelle Zahl)</td>
    </tr>
    <tr>
      <td><code>H</code></td>
      <td>Hexadezimalzahl-String</td>
    </tr>
    <tr>
      <td><code>B</code></td>
      <td>Allgemeines Array</td>
    </tr>
  </tbody>
</table>


Verschiedene Aligner verwenden unterschiedliche optionale Felder. Leser finden eine vollständige Dokumentation allgemeiner Felder bei SAMtools 
Website[^note] und Aligner wie BWA stellen ebenfalls Dokumentation zu den von ihnen verwendeten Feldern bereit. Hier stellen wir einige ausgewählte Bereiche vor, um den Lesern einen Eindruck davon zu vermitteln, wie diese Bereiche in der Praxis eingesetzt werden.


[^note]: [SAMtags](https://samtools.github.io/hts-specs/SAMtags.pdf).

### Das NM-Feld

Das vordefinierte <code>NM</code>-Tag nimmt einen ganzzahligen Wert (<code>i</code>) an. 
Das Feld <code>NM</code> gibt den Bearbeitungsabstand zur Referenz an, einschließlich Mehrdeutigkeit 
bases\footnote{``N'' bases</code>, jedoch ohne Clipping. Denken Sie daran, dass der CIGAR-String <code>101M</code> 
zeigt an, dass ein 101 nt langer Lesevorgang lückenlos mit dem Genom abgeglichen wurde. Allerdings macht es das nicht 
jede Aussage darüber, ob das Alignment nicht übereinstimmende Positionen (Sequenzinkongruenzen) enthielt. A 
Der CIGAR-String von <code>101M</code> und das Tag <code>NM:i:0</code> stimmen jedoch perfekt überein (Abstand bearbeiten). 
von Null). Bei einem Lesevorgang mit einer CIGAR-Zeichenfolge von <code>101M</code> und dem Tag <code>NM:i:1</code> stimmt eine nicht überein 
Basis (Distanz von eins bearbeiten).


### Das MD-Feld

Das Feld <code>MD</code> liefert zusätzliche, referenzzentrierte Informationen über die Ausrichtung. Es handelt sich um eine Zeichenfolge für nicht übereinstimmende Positionen, die es ermöglicht, ohne Blick auf die Referenz abzuleiten, wo sich Einzelnukleotidvarianten (SNVs) und Deletionen befinden. Die Funktionsweise des Feldes <code>MD</code> lässt sich am einfachsten anhand eines Beispiels erklären. Einer der Reads im NA12878-Exom wurde auf chr1:21989502 mit einer Zuordnungsqualität von Null (es lässt sich genauso gut auf eine andere Position auf Chromosom 1 abbilden) und einer CIGAR-Zeichenfolge von <code>101M</code> abgebildet. Betrachten Sie das <code>MD</code>-Tag:

<pre>
MD:Z:2C77A4G4A5C4 
</pre>

Dies bedeutet, dass es zwei Sequenzübereinstimmungen gibt (beginnend an der 
Position POS=21989502 auf der 
Referenz chr1), gefolgt von einer Nichtübereinstimmung mit einem C in der Referenz, 
77 Übereinstimmungen, einer Nichtübereinstimmung mit A, 4 
weitere Übereinstimmungen, ein nicht übereinstimmendes G, 4 Übereinstimmungen, 
ein weiteres nicht übereinstimmendes A, 5 Übereinstimmungen, ein nicht übereinstimmendes C und endlich 4 Übereinstimmungen. 
Vergleichen Sie das Alignment mit der entsprechenden Region von Chromosom 1:


<pre>
read: TGTGGTGACCTGACCATCCTGGTTTGCCTGGAACTTCAGGAGTGAAGACA
      || |||||||||||||||||||||||||||||||||||||||||||||||
ref:  TGCGGTGACCTGACCATCCTGGTTTGCCTGGAACTTCAGGAGTGAAGACA

read: CTGGACATTTAATGCTAAAACTGGGAAGGTCCCAGAAAAAGTGGGAAAAG
      |||||||||||||||||||||||||||||| |||| |||| ||||| |||
ref:  CTGGACATTTAATGCTAAAACTGGGAAGGTACCAGGAAAAATGGGACAAG

read: T
      |
ref:  T 
</pre>

Betrachten wir nun ein Beispiel mit einer Löschung. Dies ist ein auf chr1:31504512 abgebildeter Lesevorgang mit einer CIGAR-Zeichenfolge von <code>11M5D60M</code> (Gesamtlänge des zugeordneten Lesevorgangs 83 Nukleotide) und einem Tag von <code>MD:Z:11^TTTTG6G23G29</code> . Der CIGAR-String sagt uns, dass der Lesevorgang für die ersten 11 Basen ausgerichtet ist, dann eine Deletion von 5 Nukleotiden aufweist und erneut für 60 Basen ausgerichtet ist. Die CIGAR-Zeichenfolge sagt uns nicht, welche Basen gelöscht wurden, und sie sagt uns auch nicht, ob es sich bei den ausgerichteten Basen um Übereinstimmungen oder Nichtübereinstimmungen handelt. Der <code>MD</code>-String sagt uns, dass die ersten 11 Basen perfekt übereinstimmen, dass die Basen TTTTG gelöscht wurden (dies wird durch das Caret-Zeichen <code>^</code> gefolgt von den gelöschten Basen, <code>^TTTTG</code>, angezeigt), die folgenden 6 übereinstimmende Basen, gefolgt von einem nicht übereinstimmenden G in der Referenz, 23 übereinstimmende Basen, gefolgt erneut von einem nicht übereinstimmenden G in der Referenz, gefolgt von 29 übereinstimmenden Basen.


<pre>
read: TTGGGCAAGTT.....TTTTTTTTTTTTTTTTTTTTTTTTTGAGACAGAG
      |||||||||||     |||||| ||||||||||||||||||||||| |||
ref:  TTGGGCAAGTTTTTTGTTTTTTGTTTTTTTTTTTTTTTTTTGAGACGGAG

read: TCTCTCTCTGTTGCCCGGGCTGGAGT
      ||||||||||||||||||||||||||
ref:  TCTCTCTCTGTTGCCCGGGCTGGAGT 
</pre>


Wenn es mehrere benachbarte Nichtübereinstimmungen gibt, dann ist eine 0
gebraucht. Zum Beispiel
<pre>
Read: CGATACGGGGAC
      |  |||  ||||
Ref:  CACTACTCGGAC
</pre>
Dies würde die CIGAR 12M (zwölf ausgerichtete Positionen ohne Insertionen oder Deletion) ergeben.

Der <code>MD</code>-String <code>MD:Z:1A0C3T0C4</code> hinweist darauf hin, dass es zwischen den nicht übereinstimmenden A und C und T und C keine (0) passenden Basen gibt. Falls es sich bei der ersten oder letzten Base um eine Sequenzfehlanpassung handelt, wird dieser ebenfalls eine 0 vorangestellt oder folgt (z. B. <code>MD:Z:0A100</code> oder <code>MD:Z:100A0</code>).

Wenn es mehrere benachbarte Nichtübereinstimmungen gibt, dann ist eine 0
gebraucht. Zum Beispiel

<pre>
read: CGATACGGGGAC
      |  |||  ||||
ref:  CACTACTCGGAC
</pre>

Dies würde die CIGAR 12M (zwölf ausgerichtete Positionen ohne) ergeben
Einfügungen oder Löschungen) und die <code>MD</code>-Zeichenfolge <code>MD:Z:1A0C3T0C4</code>, 
was darauf hinweist, dass es zwischen den nicht übereinstimmenden A und C und T und C 
keine (0) passenden Basen gibt. Falls es sich bei der ersten oder letzten Base um eine 
Sequenzfehlanpassung handelt, wird dieser ebenfalls eine 0 vorangestellt oder folgt 
(z. B., <code>MD:Z:0A100</code> oder <code>MD:Z:100A0</code>).

Beachten Sie, dass Einfügungen nicht im Feld <code>MD</code> angegeben werden, 
da es referenzzentriert ist und eine Einfügung keinen Informationsverlust über die
Referenz darstellt. Darüber hinaus können die eingefügten Basen zusammen mit dem 
CIGAR-String eines Lesevorgangs aus dem <code>SEQ</code>-Feld abgeleitet werden. 
Die CIGAR-Zeichenfolge <code>30M1I70M</code> entspricht beispielsweise 
 <code>MD:Z:100</code>, wenn alle ausgerichteten Basen (<code>M</code>) 
Sequenzübereinstimmungen aufweisen. Der Read hat insgesamt 101 Basen, aber nur die 100 Referenzbasen, an denen er ausgerichtet ist, werden im <code>MD</code>-Tag beschrieben.

Das Feld <code>MD</code> muss mit der CIGAR-Zeichenfolge kompatibel sein (Einfügungen ausgenommen).


Dies würde die CIGAR 12M (zwölf ausgerichtete Positionen ohne) ergeben
Einfügungen oder Löschungen) und die <code>MD</code>-Zeichenfolge <code>MD:Z:1A0C3T0C4</code>, was darauf hinweist, dass es zwischen den nicht übereinstimmenden A und C und T und C keine (0) passenden Basen gibt. Falls es sich bei der ersten oder letzten Base um eine Sequenzfehlanpassung handelt, wird dieser ebenfalls eine 0 vorangestellt oder folgt (z. B. <code>MD:Z:0A100</code> oder <code>MD:Z:100A0</code>).



### Das RG-Feld

Das <code>RG</code>-Feld gibt die Lesegruppe des Lesevorgangs an, z. B. <code>RG:Z:rg1</code>.

### Das AS-Feld

Das Feld <code>AS</code> gibt den vom Aligner generierten Alignment-Score an. Beispielsweise gibt \verb+AS:i:84+ an, dass BWA-MEM dem Lesevorgang einen Alignment-Score von 84 zugewiesen hat.

### Für Endbenutzer reservierte Felder

Die Felder <code>X?:?</code>, <code>Y?:?</code> und <code>Z?:?</code> sind für Endbenutzer reserviert. Das bedeutet, dass Ausrichtungsprogramme wie BWA ihre eigenen Felder definieren dürfen, deren Tags mit den Buchstaben X, Y oder Z beginnen. BWA hat eine Reihe von Tags definiert, die mit X beginnen. Beachten Sie, dass die verschiedenen BWA-Programme unterschiedliche Kombinationen von verwenden Tags. Beispielsweise zeigt das Tag <code>XA</code> alternative Ausrichtungen im folgenden Format an: <code>chr,pos,CIGAR,NM;</code> für jede alternative Ausrichtung. Zum Beispiel,

<pre>
XA:Z:chr1,+13074589,101M,3;chr1,-13152100,101M,3;chr1, \
-12882405,101M,3;chr1,-12827800,101M,4; \
chr1_KI270766v1_alt,-97694,98M3S,3;	
</pre>

Dieses Tag zeigt, dass der Lesevorgang auch alternativen Orten zugeordnet werden könnte. Der erste alternative Treffer befand sich auf Chromosom 1 an Position 13.074.589, er war ohne Indels ausgerichtet (CIGAR <code>101M</code>) und die Bearbeitungsentfernung (<code>NM</code>) betrug drei. Eine negative Position zeigt an, dass die alternative Ausrichtung auf dem umgekehrten Strang liegt.  Zu den weiteren optionalen Tags von BWA gehört <code>XS</code>, das den suboptimalen Alignment-Score anzeigt.