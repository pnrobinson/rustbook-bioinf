# ASCII-Kodierung von Phred-Scores



Die auf der letzten Seite beschriebene Transformation wandelt eine Wahrscheinlichkeit in einen ganzzahligen Wert zwischen 0 und 93 um. Die Werte werden in der FASTQ-Datei nicht als ein- oder zweistellige Zahl gespeichert, sondern als einzelnes Zeichen (<code>char</code>>), was wiederum zu einer erheblichen Verringerung der Dateigröße führt. Nichtsdestotrotz können Phred-Qualitäten von 0 bis 93 ein sehr breites Spektrum an Fehlerwahrscheinlichkeiten repräsentieren, das von 1,0 (100% Fehlerwahrscheinlichkeit oder einfach eine falsche Base) bis zu \\(10^{-9.3}\\)
reicht, was einem extrem genauen Base-Call entspricht. 

Um die Phred-Bewertungen als Zeichen zu speichern, werden die Scores in ASCII-Zeichen umgewandelt. ASCII (American Standard Code for Information Interchange) ist ein früher Zeichencodierungsstandard für die Darstellung von Zeichen in Computern und anderen Geräten, der erstmals 1963 veröffentlicht wurde. Die ASCII-Codes 0 bis 31 sind nicht druckbar. Der ASCII-Code 007 beispielsweise entspricht einem Steuercode, der ursprünglich gesendet wurde, um bei älteren Systemen eine elektromechanische Glocke zu läuten oder bei einigen Computern einen Systemwarnton abzuspielen. Das erste druckbare Zeichen ohne Leerzeichen ist der ASCII-Code 33, und der letzte druckbare ASCII-Code ist 126. FASTQ-Dateien verwenden also die ASCII-Codes 33-126 zur Codierung der Phred-Qualitäten von 0 bis 93 (Tabelle 2).

<table>
    <caption id="tab:phred2ascii"><strong>Base Quality and ASCII Encoding</strong></caption>
    <thead>
        <tr>
            <th><strong>ASCII character</strong></th>
            <th><strong>Decimal value</strong></th>
            <th><strong>Phred score</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>!</code></td>
            <td>33</td>
            <td>0</td>
        </tr>
        <tr>
            <td><code>"</code></td>
            <td>34</td>
            <td>1</td>
        </tr>
        <tr>
            <td><code>#</code></td>
            <td>35</td>
            <td>2</td>
        </tr>
        <tr>
            <td><code>$</code></td>
            <td>36</td>
            <td>3</td>
        </tr>
        <tr>
            <td>&vellip;</td>
            <td>&vellip;</td>
            <td>&vellip;</td>
        </tr>
        <tr>
            <td>A</td>
            <td>65</td>
            <td>22</td>
        </tr>
        <tr>
            <td>B</td>
            <td>66</td>
            <td>23</td>
        </tr>
        <tr>
            <td>&vellip;</td>
            <td>&vellip;</td>
            <td>&vellip;</td>
        </tr>
        <tr>
            <td>x</td>
            <td>120</td>
            <td>87</td>
        </tr>
        <tr>
            <td>y</td>
            <td>121</td>
            <td>88</td>
        </tr>
        <tr>
            <td>z</td>
            <td>122</td>
            <td>89</td>
        </tr>
        <tr>
            <td><code>{</code></td>
            <td>123</td>
            <td>90</td>
        </tr>
        <tr>
            <td><code>|</code></td>
            <td>124</td>
            <td>91</td>
        </tr>
        <tr>
            <td><code>}</code></td>
            <td>125</td>
            <td>92</td>
        </tr>
        <tr>
            <td><code>~</code></td>
            <td>126</td>
            <td>93</td>
        </tr>
    </tbody>
    <caption>Beispiele für die ASCII-Kodierung von Phred-Punkten. Der Phred-Score kann durch Subtraktion von 33 vom Dezimalwert des ASCII-Zeichens ermittelt werden.</caption>
</table>


