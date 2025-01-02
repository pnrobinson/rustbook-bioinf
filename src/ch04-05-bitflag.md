# Das SAM-Bitflag

Das zweite Feld jedes Datensatzes in einer SAM-Datei stellt ein Bitfeld mit Werten aus 12 Bitflags~(Tabelle 1) dar.

Das SAM-Format verwendet 12 Bitflags, von denen jedes den Wert 1 (Ja, Wahr) oder 0 (Nein, Falsch) haben kann. Die Bitflags können unabhängig voneinander kombiniert werden und werden in SAM-Dateien als entsprechender dezimaler Ganzzahlwert angezeigt.

<table>
  <caption>SAM-Format: Bitflags</caption>
  <thead>
    <tr>
      <th>Bit (hex)</th>
      <th>Bit (dez)</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0x1</td>
      <td>1</td>
      <td>Template hat mehrere Segmente (mehrere Reads, 
      normalerweise ein Readpaar)  Template has multiple segments (multiple reads, usually a read pair)</td>
    </tr>
    <tr>
      <td>0x2</td>
      <td>2</td>
      <td>Jedes Segment der Vorlage ist gemäß dem Aligner richtig ausgerichtet (Each segment of the template is properly aligned according to the aligner)</td>
    </tr>
    <tr>
      <td>0x4</td>
      <td>4</td>
      <td>Segment ist nicht zugeordnet (Segment is unmapped)</td>
    </tr>
    <tr>
      <td>0x8</td>
      <td>8</td>
      <td>Nächstes Segment in der Vorlage ist nicht zugeordnet (Next segment in the template is unmapped)</td>
    </tr>
    <tr>
      <td>0x10</td>
      <td>16</td>
      <td>SEQ ist reverse komplementär (SEQ is reverse complemented)</td>
    </tr>
    <tr>
      <td>0x20</td>
      <td>32</td>
      <td>SEQ des nächsten Segments in der Vorlage ist revers komplementär (SEQ of the next segment in the template is reverse complemented</td>
    </tr>
    <tr>
      <td>0x40</td>
      <td>64</td>
      <td>Erstes Segment in der Vorlage (First segment in the template)</td>
    </tr>
    <tr>
      <td>0x80</td>
      <td>128</td>
      <td>Letztes Segment in der Vorlage (Last segment in the template)</td>
    </tr>
    <tr>
      <td>0x100</td>
      <td>256</td>
      <td>Sekundärausrichtung (Secondary alignment)</td>
    </tr>
    <tr>
      <td>0x200</td>
      <td>512</td>
      <td>Segment besteht die Qualitätskontrollen nicht (Segment does not pass quality controls)</td>
    </tr>
    <tr>
      <td>0x400</td>
      <td>1024</td>
      <td>Segment ist eine PCR oder ein optisches Duplikat (Segment is a PCR or optical duplicate)</td>
    </tr>
    <tr>
      <td>0x800</td>
      <td>2048</td>
      <td>Supplementäre Ausrichtung (Supplementary alignment)</td>
    </tr>
  </tbody>
</table>



Ein Bitfeld wird verwendet, um eine Reihe boolescher Werte (Ja/Nein) kompakt zu speichern. In unserem Fall möchten wir 12 Ja/Nein-Attribute zu jedem Lesevorgang speichern. Theoretisch könnten wir zwölf separate char-Werte (jeweils ein Byte) speichern, aber wenn wir beachten, dass die 12 Werte als einzelne Bits eines Bitfelds gespeichert werden können, können wir eine erhebliche Menge an Speicherplatz einsparen. Tabelle 1 zeigt die zwölf Bitflags und Abb. 1 zeigt ein Beispiel dafür, wie die Bitflags als dezimale Ganzzahlwerte dargestellt werden. 

<figure>
<img src="img/binary2decimal.png" alt="binary and decimal" width="500">
 <figcaption><strong>Figure 1</strong>
Um zu verstehen, wie die Bitfelder dargestellt werden, ist es hilfreich, sich an die Position zu erinnern  Die Notation von Zahlen funktioniert. 
In der bekannten Dezimalschreibweise steht die Zahl 453 für \\(4\times 10^2 +  5\times 10^1+3\times10^0= 400 + 50 + 3 = 453\\). 
In binärer Schreibweise steht eine Zahl wie 101101 für 
\\(1\times 2^5+0\times 2^4+1\times2^3+1\times 2^2+0\times 1^1+1\times 2^0 = 32 + 8+4+1= 45\\).  
</figcaption>
</figure>





Oft ist es zweckmäßig, die hexadezimale Schreibweise („hex“) zu verwenden, bei der die Basis nicht 10 oder 2, sondern 16 ist; Die 
Ziffern werden durch 0–9 dargestellt, gefolgt von A, B, C, D, E und F. Um mit SAM-Dateien völlig vertraut zu sein 
und wenn Sie Programme wie SAMtools verwenden, um damit zu arbeiten, ist es hilfreich zu verstehen, wie man konvertiert 
zwischen diesen drei Zahlendarstellungen.



For example, a value of 99 indicates that the read has multiple segments in sequencing (usually this 
refers to a paired-end or mate-pair read; 0x1=1$\times$16$^0$=1), that each segment of the read 
could be mapped properly (correct mapping of both reads of the read pair, 0x2=2$\times$16$^0$=2), 
that the mate read is mapped to the reverse strand (0x20=2$\times$16$^1$=32), and that the read 
being referred to in the current SAM record is the first segment in the template (the first read in 
the pair, 0x40=4$\times$16$^1$=64) (Figure~\ref{fig:sambitflags} and Table~\ref{tab:sambitflag}). 




\begin{figure}[!bt]
\centering
\includegraphics[width=1\linewidth]{chapters/formats/img/binary2decimal.pdf} 
\caption[SAM Bit Flats]{In this example, the bitflags 0x1 (1 in decimal notation), 0x2 (2), 0x20 (32), and 0x40 (64) are set. The decimal representation as displayed in the SAM file is thus 64+32+2+1=99 }
\label{fig:sambitflags}
\end{figure}



Bit operations can be used to filter reads in a SAM file. For instance, the SAM format requires that for each read one and only one of the associated lines  satisfies 
\begin{verbatim}
FLAG & 0x900 == 0
\end{verbatim}
This line is called the \textit{primary line} of the read. The hexadecimal value 0x900 is equal to 0x800 plus 0x100, meaning that the bit flags for supplementary alignment (0x800) and secondary alignment (0x100) are set. Recall that \verb+&+ stands for the  bitwise logical AND operation on a pair of bits. If both bits are 1, the result of the operation is 1, otherwise 0. For example 
\begin{Verbatim}[frame=single]
      1010       
AND   1100       
     =1000      
\end{Verbatim}
Thus, if a read is annotated either as a \index{secondary alignment} secondary alignment\footnote{If a read maps to multiple locations due to repetitive sequences or other reasons, then one of these alignments would be marked primary and all others will have the secondary alignment bitflag set.} 
or a \index{supplementary alignment} supplementary alignment,\footnote{According to the SAM specification, a chimeric alignment is an alignment of a read that cannot be represented as a linear alignment. Usually this means that a read consists of multiple segments that align to different parts of the genome. The segments do not have large overlaps. One of the  segments is considered to have the representative alignment, and the others are called supplementary and have the supplementary alignment flag set.} 
then we will obtain \texttt{FLAG \& 0x900 != 0}.\footnote{The result could be 0x100, 0x800 or 0x900.} The SAM format states that an arbitrary number of lines may represent  secondary  or supplementary alignments, but that only one line can be the primary (representative) alignment.
