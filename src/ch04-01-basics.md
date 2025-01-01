}# SAM-Grundlagen



Wir werden das grundlegende SAM-Format anhand eines Beispiels erläutern, bei dem fünf Reads der Länge 10 auf eine Referenzsequenz der Länge 40 abgebildet werden (Abbildung~1). 

<figure>
<img src="img/sam_single_end.png" alt="FASTQ" width="500">
 <figcaption><strong>Figure 1</strong>
SAM file  </figcaption>
</figure>

SAM-Dateien bestehen aus einem optionalen Header-Abschnitt, gefolgt von einem Alignment-Abschnitt. Die Kopfzeilen beginnen mit `@'. Im Alignment-Abschnitt der SAM-Datei stellt jede Zeile ein Alignment für einen Read dar und umfasst mindestens 11 Pflichtfelder (Tabelle 1). 


<table>
  <caption><strong>SAM Format</strong>:Pflichtfelder</caption>
  <thead>
    <tr>
      <th>Col</th>
      <th>Feld</th>
      <th>Beschreibung</th>
      <th>Beispiel</th>
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


Das SAM/BAM-Format soll so allgemein wie möglich sein und verwendet das Wort <code>template</code> für DNA-Fragmente (englisch: fragments, inserts). Das SAM-Format verwendet das Wort 
<code>segment</code>, um sich auf eine zusammenhängende Sequenz oder Teilsequenz zu beziehen; zum Beispiel können die beiden Reads eines 
Lesepaares als zwei Segmente bezeichnet werden.  Das Feld <code>QNAME</code> speichert den Namen der Abfrage 
Sequenz, in der Regel ein Read,\footnote{Segmente mit demselben <code>QNAME</code> werden als 
als von der gleichen Vorlage stammend angesehen, d. h. Reads eines Read-Paares haben normalerweise den gleichen 
<code>QNAME</code>.} <code>RNAME</code> speichert den Namen der Referenzsequenz, normalerweise ein 
Chromosom (z. B. <code>chr7</code>), und POS gibt die Position auf dem Chromosom an, an der der Read 
ausgerichtet wurde. Das Feld <code>FLAG</code> wird weiter unten erklärt.


Das Feld <code>MAPQ</code> stellt die 
(MAPQ)Mappingqualität, die vom Aligner zugewiesen wurde, und spiegelt das Vertrauen wider, mit dem der Read 
auf die angegebene Position abgebildet werden konnte. Die CIGAR-Zeichenkette bietet eine kompakte 
kompakte Darstellung des Alignments, die im Folgenden erläutert wird. Die Felder <code>RNEXT</code>, 
<code>PNEXT</code> und <code>TLEN</code> werden nur für Paired-End-Reads verwendet. Daher wird bei Single-End 
Reads wird daher <code>RNEXT</code> für <it>>not-applicable</it> auf ``*'' gesetzt und <code>PNEXT</code> und 
<code>TLEN</code> werden auf 0 gesetzt. Schließlich enthält das Feld <code>SEQ</code> die Nukleotidsequenz des 
Lesung und das Feld <code>QUAL</code> zeigt die Basenqualitätswerte für jede Position an.

## Paired-End-Sequenzen

<figure>
<img src="img/sam_paired_end.png" alt="FASTQ" width="500">
 <figcaption><strong>Figure 2</strong>
SAM file: Paired end  </figcaption>
</figure>

Grundlagen des SAM-Formats: PE-Sequenzen]{{\bf SAM-Format Grundlagen: PE-Sequenzen]} Beispiel für 
Paired-End-Read-Mappings im SAM-Format {\bf (a)} und {\bf (b)} in IGV. Zwei Paare 
bestehend aus vier Reads der Länge 10 werden auf eine Referenzsequenz der Länge 40 abgebildet. Beachten Sie, dass 
Mitglieder desselben Paars haben denselben <code>QNAME</code> und werden auf verschiedene Stränge abgebildet. Read 1 wird dem 
dem Vorwärtsstrang an Position 2 zugeordnet und bildet ein Paar mit dem Read, der dem Rückwärtsstrang an Position 
Strang an Position 27 zugeordnet ist. <code>RNEXT</code> wird auf <code>=</code> gesetzt, da der zweite Read des Paares 
des Paares auf dieselbe Referenz, d. h. <code>chrE</code>, abgebildet wird, und <code>PNEXT</code> wird auf 27 gesetzt, weil der 
Reverse-Read auf diese Position abgebildet wird (der Reverse-Read ist an den Positionen 27-36 ausgerichtet). 
Daher wird <code>TLEN</code> auf 35 gesetzt, denn dies ist der Abstand zwischen der äußersten linken und der äußersten rechten 
der am weitesten rechts gelegenen Base der beiden Reads. Der Eintrag <code>TLEN</code> für den Reverse-Read wird mit 
einem Minuszeichen dargestellt.

Für Paired-End-Reads werden andere bitweise Flags verwendet als für Single-End-Reads. Die Flags <code>99</code> und <code>147</code> zeigen an, dass beide Mitglieder des Paares korrekt auf den Vorwärts- und den Rückwärtsstrang gemappt wurden.
