# Phred-Score



Der Phred-Score (d.h., Punktzahl) ist definiert als

\\[
Q = -10 \log_{10}
\\]


wobei \\(p\\) die Wahrscheinlichkeit ist, dass der entsprechende Basisaufruf
<emph>falsch</emph> ist und \\(Q\\) die Phred-Punktzahl ist (gerundet auf den nächstliegenden ganzzahligen Wert).  Der Phred-Score ist also eine einfache Transformation der Fehlerwahrscheinlichkeit, die eine einfache, aber einigermaßen platzsparende Kodierung darstellt (Tabelle 1).
<table>
    <caption id="table:phred"><strong>Tabelle 1. Basisqualität und -genauigkeit</strong></caption>
    <thead>
        <tr>
            <th><strong>Q<sub>Phred</sub></strong></th>
            <th><strong>p</strong></th>
            <th><strong>Genauigkeit</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td>
            <td>1</td>
            <td>0%</td>
        </tr>
        <tr>
            <td>10</td>
            <td>10<sup>-1</sup></td>
            <td>90%</td>
        </tr>
        <tr>
            <td>20</td>
            <td>10<sup>-2</sup></td>
            <td>99%</td>
        </tr>
        <tr>
            <td>30</td>
            <td>10<sup>-3</sup></td>
            <td>99.9%</td>
        </tr>
        <tr>
            <td>40</td>
            <td>10<sup>-4</sup></td>
            <td>99.99%</td>
        </tr>
        <tr>
            <td>50</td>
            <td>10<sup>-5</sup></td>
            <td>99.999%</td>
        </tr>
        <tr>
            <td>60</td>
            <td>10<sup>-6</sup></td>
            <td>99.9999%</td>
        </tr>
        <tr>
            <td>70</td>
            <td>10<sup>-7</sup></td>
            <td>99.99999%</td>
        </tr>
        <tr>
            <td>80</td>
            <td>10<sup>-8</sup></td>
            <td>99.999999%</td>
        </tr>
        <tr>
            <td>90</td>
            <td>10<sup>-9</sup></td>
            <td>99.9999999%</td>
        </tr>
        <tr>
            <td>93</td>
            <td>10<sup>-9.3</sup></td>
            <td>99.99999995%</td>
        </tr>
    </tbody>
</table>

<p><em>Anmerkung:</em> Phred-Basisqualitätswerte und ihre zugehörige Fehlerwahrscheinlichkeit (<em>p</em>) und Basisgenauigkeit. Eine Auswahl von Werten vom niedrigsten (0) bis zum höchsten (93) Phred-Score, der in einer FASTQ-Datei darstellbar ist, wird gezeigt.</p>



