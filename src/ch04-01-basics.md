}# SAM-Grundlagen



Wir werden das grundlegende SAM-Format anhand eines Beispiels erläutern, bei dem fünf Reads der Länge 10 auf eine Referenzsequenz der Länge 40 abgebildet werden (Abbildung~\ref{fig:sam_igv_single_end}). SAM-Dateien bestehen aus einem optionalen Header-Abschnitt, gefolgt von einem Alignment-Abschnitt. Die Kopfzeilen beginnen mit `@', die Ausrichtungszeilen dagegen nicht. Im Alignment-Abschnitt der SAM-Datei stellt jede Zeile ein Alignment für einen Read dar und umfasst mindestens 11 Pflichtfelder (Tabelle~\ref{tab:samformat}). 


Das SAM/BAM-Format soll so allgemein wie möglich sein und verwendet das Wort <code>template</code> für DNA-Fragmente (englisch: fragments, inserts). Das SAM-Format verwendet das Wort 
<code>segment</code>, um sich auf eine zusammenhängende Sequenz oder Teilsequenz zu beziehen; zum Beispiel können die beiden Reads eines 
Lesepaares als zwei Segmente bezeichnet werden.  Das Feld <code>QNAME</code> speichert den Namen der Abfrage 
Sequenz, in der Regel ein Read,\footnote{Segmente mit demselben <code>QNAME</code> werden als 
als von der gleichen Vorlage stammend angesehen, d. h. Reads eines Read-Paares haben normalerweise den gleichen 
<code>QNAME</code>.} <code>RNAME</code> speichert den Namen der Referenzsequenz, normalerweise ein 
Chromosom (z. B. <code>chr7</code>), und POS gibt die Position auf dem Chromosom an, an der der Read 
ausgerichtet wurde. Das Feld <code>FLAG} wird im Detail in 
Abschnitt~\ref{sec:format_sam_bitflag}. Das Feld <code>MAPQ</code> stellt die 
(MAPQ)Mappingqualität, die vom Aligner zugewiesen wurde, und spiegelt das Vertrauen wider, mit dem der Read 
auf die angegebene Position abgebildet werden konnte. Die CIGAR-Zeichenkette bietet eine kompakte 
kompakte Darstellung des Alignments, die im Folgenden erläutert wird. Die Felder <code>RNEXT</code>, 
<code>PNEXT</code> und <code>TLEN</code> werden nur für Paired-End-Reads verwendet. Daher wird bei Single-End 
Reads wird daher <code>RNEXT</code> für <it>>not-applicable</it> auf ``*'' gesetzt und <code>PNEXT</code> und 
<code>TLEN</code> werden auf 0 gesetzt. Schließlich enthält das Feld <code>SEQ</code> die Nukleotidsequenz des 
Lesung und das Feld <code>QUAL</code> zeigt die Basenqualitätswerte für jede Position an.


<figure>
<img src="img/sam_single_end.png" alt="FASTQ" width="500">
 <figcaption>
SAM file  </figcaption>
</figure>


<table>
  <caption><strong>SAM Format</strong>: Mandatory fields of the SAM Format.</caption>
  <thead>
    <tr>
      <th>Col</th>
      <th>Field</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><code>QNAME</code></td>
      <td>Query template NAME</td>
      <td><code>read_1</code></td>
    </tr>
    <tr>
      <td>2</td>
      <td><code>FLAG</code></td>
      <td>Bitwise FLAG</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>3</td>
      <td><code>RNAME</code></td>
      <td>Reference sequence NAME</td>
      <td><code>chrE</code></td>
    </tr>
    <tr>
      <td>4</td>
      <td><code>POS</code></td>
      <td>Left-most mapping POSition (1-based)</td>
      <td><code>11</code></td>
    </tr>
    <tr>
      <td>5</td>
      <td><code>MAPQ</code></td>
      <td>MAPping Quality</td>
      <td><code>37</code></td>
    </tr>
    <tr>
      <td>6</td>
      <td><code>CIGAR</code></td>
      <td>CIGAR string</td>
      <td><code>10M</code></td>
    </tr>
    <tr>
      <td>7</td>
      <td><code>RNEXT</code></td>
      <td>Ref. name of the mate or NEXT read</td>
      <td><code>*</code></td>
    </tr>
    <tr>
      <td>8</td>
      <td><code>PNEXT</code></td>
      <td>Position of the mate or NEXT read</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>9</td>
      <td><code>TLEN</code></td>
      <td>Observed Template LENgth</td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td>10</td>
      <td><code>SEQ</code></td>
      <td>Segment SEQuence</td>
      <td><code>ACGCATACTG</code></td>
    </tr>
    <tr>
      <td>11</td>
      <td><code>QUAL</code></td>
      <td>Base QUALity string</td>
      <td><code>DIGAFHHBCA</code></td>
    </tr>
  </tbody>
</table>
<p><em>Note:</em> Each line in the alignment section of a SAM file comprises 11 mandatory fields.</p>
