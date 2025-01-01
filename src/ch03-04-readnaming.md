# Read-Benenunng


Betrachten Sie die folgende Kennzeichnung, die von einem Read aus dem in Kapitel~\ref{ch:data} beschriebenen Exom-Datensatz NA12878 stammt. 

<pre>
@HWI-D00119:50:H7AP8ADXX:1:1101:2100:2202 1:N:0:TAAGGCGA
</pre>

Die Syntax der Namenszeilen entspricht dem folgenden Schema:

<pre>
@{instrument}:{rujn}:{flowcell_ID}:{lane}:{tile}:{x-pos}:{y-pos}\
    {read}:{is_filtered}:{control_number}:{index} 
</pre>


Die im obigen Etikett gespeicherten Informationen sind in Tabelle 3 zusammengefasst. Der erste Teil dieser Bezeichnung, bis zum Leerzeichen, wird als Lesename oder Bezeichner verwendet. 


<table>
    <caption id="tab:fastqreadname"><strong>Illumina-Sequenzkennungen</strong></caption>
    <thead>
        <tr>
            <th><strong>Element</strong></th>
            <th><strong>Erläuterung</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>HWI-D00119</code></td>
            <td>Die eindeutige Gerätebezeichnung</td>
        </tr>
        <tr>
            <td><code>50</code></td>
            <td>Die Lauf-ID (dies ist das 50<sup>ste</sup> Mal, dass dieses Gerät betrieben wurde)</td>
        </tr>
        <tr>
            <td><code>H7AP8ADXX</code></td>
            <td>Flowcell-ID</td>
        </tr>
        <tr>
            <td><code>1</code></td>
            <td>Flowcell-Lane (Spur: 1–8)</td>
        </tr>
        <tr>
            <td><code>1101</code></td>
            <td>Tile-Nummer innerhalb der Lane</td>
        </tr>
        <tr>
            <td><code>2100</code></td>
            <td>X-Koordinate des Clusters innerhalb des Tiles (d.h., der ``Kachel'')</td>
        </tr>
        <tr>
            <td><code>2202</code></td>
            <td>Y-Koordinate des Clusters innerhalb des Tiles</td>
        </tr>
        <tr>
            <td><code>1</code></td>
            <td>Mitglied eines Paares (1 oder 2; 2 kann nur für Paired-End- oder Mate-Pair-Sequenzierung verwendet werden)</td>
        </tr>
        <tr>
            <td><code>N</code></td>
            <td>Y: Read hat den "Chastity"-Filter verletzt (solche Reads können herausgefiltert oder in der FASTQ-Datei belassen werden); 
                N: Read hat den Keuschheitsfilter nicht verletzt</td>
        </tr>
        <tr>
            <td><code>0</code></td>
            <td>0, wenn keines der Kontrollbits aktiviert ist, andernfalls ist es eine gerade Zahl. Auf HiSeq X- und NextSeq-Systemen wird die 
                Kontrollspezifikation nicht durchgeführt und diese Zahl ist immer 0.</td>
        </tr>
        <tr>
            <td><code>TAAGGCGA</code></td>
            <td>Indexsequenz (Barcode)</td>
        </tr>
    </tbody>
</table>
<p><em>Hinweis:</em> Jedes Leseetikett speichert Informationen in einem Standardschema (Das Schema wurde mit CASAVA 1.8 und später verwendet). 
Wir haben die (optionale) UMI-Feld (Unique Molecular Identifier) weggelassen, da es nicht für die Exom- oder Genomsequenzierung verwendet wird.</p>

S. auch [Cook, 2010](https://pubmed.ncbi.nlm.nih.gov/20015970/).


 
