# FASTQ-Analyse mit Rust

<div class="emphasis-box">
    <strong>Ziele:</strong>
    <ol>
    <li>Einfache Qualitätsbewertungsroutinen in idiomatischem Rust programmieren.</li>
     <li>GitHub.</li>
    <li>Test-Driven Development.</li>
    </ol>
</div>

In diesem Abschnitt wollen wir eine einfache Rust-Version des Tools [FastQC](https://www.bioinformatics.babraham.ac.uk/projects/fastqc/) schreiben.

## GitHub
GitHub ist eine Online-Plattform, die Entwicklern und Teams Werkzeuge zur Versionskontrolle und Zusammenarbeit an Softwareprojekten bietet. Sie basiert auf Git, einem weit verbreiteten Versionskontrollsystem, und erweitert dessen Funktionen um eine benutzerfreundliche Weboberfläche sowie zahlreiche zusätzliche Funktionen.

Falls Sie noch nicht mit GitHub gearbeitet haben, arbeiten Sie diesen [Tutorial](https://docs.github.com/de/get-started/start-your-journey/hello-world) durch.

Praktikumsteilnehmer werden kleine Teams bilden, und am Entwicklen der Software zusammenarbeiten. Hierbei werden wir ``main'' und ``develop'' Branches verwenden. Teilnehmer sollen Feature-Branches kreieren und Pull-Requests erstellen, welche von anderen Teilnehmern zu kommentieren und ggf. anzunehmen sind. 

<div class="emphasis-box">
    Wir werden das Arbeiten mit GitHub während des Praktikums erläutern und demonstrieren.
</div>


## Testgetriebene Entwicklung (Test-Driven Development; TDD) 

Die TDD ist eine Methode zum Schreiben von Code, bei der ein automatisierter Testfall auf Unit-Ebene geschrieben wird, der fehlschlägt, dann wird gerade genug Code geschrieben, um den Test zu bestehen, dann werden sowohl der Testcode als auch der Produktionscode überarbeitet und dann mit einem anderen neuen Testfall wiederholt.



## TDD in Rust
Wir werden das Erstellen von Unit-Tests in Rust während des Praktikums erläutern und demonstrieren.
Es folgen Erklärungen zu einem einfachen Beispiel.


### Übung 1

Die Definition des Phred-Scores in Bezug auf die Fehlerwahrscheinlichkeit wurde in diesem Abschnitt erklärt. Analog dazu lässt sich die Fehlerwahrscheinlichkeit aus der Phred-Punktzahl wie folgt berechnen.

\\[ 
   p = 10^{-Q/10}  
\\]


Konvertieren Sie die ASCII-Symbole für die Basen des folgenden Reads in Phred-Scores und berechnen Sie den durchschnittlichen Phred-Score dieser Basen. Verwenden Sie dann die Gleichung, um die durchschnittliche Fehlerwahrscheinlichkeit zu berechnen.

Wir werden im Laufe des Arbeitens mit FASTQ-Dateien überlegen (müssen), welche Datenstrukturen am besten geeignet sind, um die erforderlichen Analysen korrekt und effizient durchzuführen. Für diese Übung wollen wir damit anfangen, einige Funktionen zu schreiben, die den Qualitätsstring bewerten.
Es folgt ein weiteres Bespiel.

<pre>
@My-Illu:6:73:941:1973#0/1
GATTTGGGGTTCAAAGCAGTATCGATCAAATAGTAAATCCATTTGTTCAACTCACAGTTT
+
!''*((((***+))%%%++)(%%%%).1***-+*''))**55CCF>>>>>>CCCCCCC65
</pre>


Der folgende einfache Algorithmus kann verwendet werden, um den durchschnittlichen Qualitätswert zu berechnen.

```pseudo
Algorithm read_qual(qual_string)
    let n = len(qual_string);
    let qual_sum = 0;
    for qual in qual_string {
        let q = calculate_phred(qual)
        qual_sum += q
    } 
    return qual_sum / n
```

Wir richten die TDD für die function ``calculate_phred'' ein. Wir kreieren eine Datei namens
fastq.rs und schreiben die folgende Funktion (die natürlich nur für ein bestimmtes Argument das richtige Ergebnis liefert!).

```rust
pub fn calculate_phred(qual: char) -> usigg {
    42
}
```

Wir richten dann eine Testfunktion ein (in der Regel lohnt es sich, das Testmodul am Ende der jeweiligen Code-Datei unterzubringen)


```rust
#[cfg(test)]

mod test {
    fn test_calculate_phred {
        let qual: char = '&';
        let expected:usign =	5; // Phred-Score für das Zeichen '&'
        let res = calculate_phred(qual);
        assert_eq!(expected, res);
    }

    // Alternativ können viele Ergebnisse auf einmal getestet werden:
    fn test_calculate_phred {
        let tests: Vec<char, usign> = vec![
            ('&', 5),
            ('+', 10)
        ];
        for test in tests {
            let res = calculate_phred(test.0);
            assert_eq!(test.1, res);
        }
    }
    // ggf. andere Testfunktionen
}
```
Wenn wir diesen Test zum ersten Mal durchführen, wird er natürlich einen Fehler melden. 
Wir arbeiten so lange an der Funktion ``calculate_phred'' bis die korrekt funktioniert.
Wir arbeiten ggf. an der Funktion solange weiter, bis sie effizient ist. Dann gehen wir zur 
nächsten Funktion...Mit jeder neuen Funktion schreiben wir zunächst einen Test und dann die Funktion.
Wir lassen jedes Mall alle Tests laufen. Das volle Konzept der TDD umfasst vieles mehr, aber für dieses Praktikum, wollen wir die hier skizzierte, einfache Vorgehensweise für alle Übungen anwenden.

Schreiben Sie eine korrekte Version der Funktion. Testen alle relevanten Argumente (kann man das "schlau" machen?). 

Schreiben Sie dann eine Funktion für <emph>read_qual</emph> und testen Sie diese Funktion.

## Übung 2

Schreiben Sie ein kleines Rust-Programm, um die in dem folgenden Datei-Namen enthaltenen Information zu erklären.
<pre>
@HWI-D00107:50:H6BP8ACWV:5:2204:10131:51624 2:N:0:AGGCAGAA
</pre>



## Übung 3
Schreiben Sie ein kleines Rust-Programm, um die in dem folgenden Read-Namen enthaltenen Information zu erklären.

<pre>
@Machine42:1:FC7:7:19:4229:1044 1:N:0:TTAGGC
</pre>


\subsubsection*{Exercise 4}
What does the quality character \verb+>+ mean? What is the associated error probability?

## Übung 4
Stellen wir uns einen Read zu 1000bb vor, bei dem alle Basen einen Phred-Score von <code>&</code> aufweisen. Berechen Sie die erwartete Anzahl von Fehlern für den Read (unter der Unabhängigkeitsannehma).