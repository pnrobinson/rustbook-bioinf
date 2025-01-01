# Quicksort

<div class="emphasis-box">
    <strong>Ziele:</strong>
    <ol>
    <li>Slices verstehen</li>
    <li>quicksort-Algorithmus in idiomatischem Rust programmieren</li>
    <li>lldb Debugger verstehen</li>
    </ol>
</div>

- Texte teilweise von [Wikipedia](https://de.wikipedia.org/wiki/Quicksort) angepasst.
- Einführung auf [YouTube](https://www.youtube.com/watch?v=h8eyY7dIiN4&ab_channel=CodingwithJohn).

Quicksort ist ein schneller, rekursiver Sortieralgorithmus, der nach dem Prinzip *Teile und herrsche* arbeitet. Im Durchschnitt führt der Quicksort-Algorithmus \\(O(n\cdot log(n))\\) Vergleiche durch.

Zunächst wird die zu sortierende Liste in zwei Teillisten („linke“ und „rechte“ Teilliste) getrennt. Dazu wählt Quicksort ein sogenanntes Pivotelement aus der Liste aus. Alle Elemente, die kleiner als das Pivotelement sind, kommen in die linke Teilliste, und alle, die größer sind, in die rechte Teilliste. Die Elemente, die gleich dem Pivotelement sind, können sich beliebig auf die Teillisten verteilen. Nach der Aufteilung sind die Elemente der linken Liste kleiner oder gleich den Elementen der rechten Liste.

Anschließend muss man also noch jede Teilliste in sich sortieren, um die Sortierung zu vollenden. Dazu wird der Quicksort-Algorithmus jeweils auf der linken und auf der rechten Teilliste ausgeführt. Jede Teilliste wird dann wieder in zwei Teillisten aufgeteilt und auf diese jeweils wieder der Quicksort-Algorithmus angewandt, und so weiter. Diese Selbstaufrufe werden als Rekursion bezeichnet. Wenn eine Teilliste der Länge eins oder null auftritt, so ist diese bereits sortiert und es erfolgt der Abbruch der Rekursion.

Wir haben hier den Java-Code vom oben genannten YouTube-Video leicht angepasst bzw. kommentiert wiedergegeben. Sie können optional das Programm laufen lassen, indem Sie den Code in eine Datei namens Quick.java kopieren und diese Datei mit ``$ javac Quick.java``kompliieren und das Ergebnis mit ``$ java Quick``ausführen.

```java
import java.util.Random;

public class Quicksort {

  public static void main(String[] args) {
    int[] numbers = [4, 6, 1, 8, 13, 33, 2];
    printArray(numbers);
    quicksort(numbers);
    printArray(numbers);
  }

  private static void quicksort(int[] array, int lowIndex, int highIndex) {
    // 1. Basisfall der Rekursion: jedes Feld mit nur einem Element ist schon sortiert!
    if (lowIndex >= highIndex) {
      return;
    }
    // 2. Das letzte ElementWir dient als Pivotelement
    int pivot = array[highIndex];
    // 3. Die zu sortierende Liste in zwei Teillisten wird in zwei Unterlisten getrennt.
    // Alle Elemente, die kleiner als das Pivotelement sind, kommen in die linke Teilliste, 
    // und alle, die größer sind, in die rechte Teilliste.
    // Nach Ausruf von 'partition' ist die Position des Pivotelements korrekt, aber die
    // linke und rechte Unterlisten sind nicht unbedingt richtig sortiert
    int leftPointer = partition(array, lowIndex, highIndex, pivot);
    // 4. Sortierte die linke Unterliste (rekursiv)
    quicksort(array, lowIndex, leftPointer - 1);
    // 5. Sortierte die rechte Unterliste (rekursiv)
    quicksort(array, leftPointer + 1, highIndex);

  }

  private static int partition(int[] array, int lowIndex, int highIndex, int pivot) {
    int leftPointer = lowIndex;
    int rightPointer = highIndex - 1;

    while (leftPointer < rightPointer) {
        // 1. Von links gehen, bis eine Zahl gefunden wird, die größer als der Pivot ist, 
        // oder der linke Zeiger mit dem rechten identisch ist
        while (array[leftPointer] <= pivot && leftPointer < rightPointer) {
            leftPointer++;
        }
        // 2. Von rechts gehen, bis eine Zahl gefunden wird, die kleiner als der Pivot ist, 
        // oder der rechte Zeiger mit dem linken identisch ist.
        while (array[rightPointer] >= pivot && leftPointer < rightPointer) {
        rightPointer--;
        }
        //  3. Die Werte vertauschen, auf die der linke und der rechte Zeiger zeigen
        swap(array, leftPointer, rightPointer);
    }
    // 4. An dieser Stelle muss das Pivotelement mit dem Wert am linken Zeiger vertauscht werden
    // (highIndex ist der Index des Pivotelements)
    if(array[leftPointer] > array[highIndex]) {
      swap(array, leftPointer, highIndex);
    }
    else {
      leftPointer = highIndex;
    }
    
    return leftPointer;
  }

  private static void swap(int[] array, int index1, int index2) {
    int temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  private static void printArray(int[] numbers) {
    for (int i = 0; i < numbers.length; i++) {
      System.out.println(numbers[i]);
    }
  }
}
```