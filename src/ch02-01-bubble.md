# Bubblesort


Bubblesort ist ein einfacher Sortieralgorithmus, der Elemente in einer Liste durch wiederholtes Vergleichen benachbarter Elemente sortiert. Dabei werden zwei benachbarte Elemente vertauscht, wenn sie in der falschen Reihenfolge stehen. Der Algorithmus wird so lange wiederholt, bis die Liste vollständig sortiert ist. Der Name "Bubblesort" kommt daher, dass kleinere Elemente in der Liste "nach oben steigen", ähnlich wie Luftblasen (bubbles) im Wasser.

## Algorithmus

1. Starte am Anfang der Liste.
2. Vergleiche Element *i* (e<sub>i</sub>) mit Element *i+1* (e<sub>i+1</sub>) 
3. Wenn e<sub>i</sub> größer als e<sub>i+1</sub>  ist, vertausche sie. Andernfalls lasse sie unverändert.
4. Gehe so durch die gesamte Liste.
5. Wiederhole den Vorgang für die gesamte Liste, bis keine Vertauschungen mehr notwendig sind (die Liste ist dann sortiert).

Dieser Algorithmus hat eine Zeitkomplexität von O(n<sup>2</sup>).


```rust
pub fn bubble_sort<T: PartialOrd>(v: &mut [T]) {
    for i in 0..v.len() {
        let mut sorted = true;
        for j in 0..(v.len()-1) - i {
            if v[i] > v[i+1] {
                v.swap(i, i+1);
                sorted = false;
            }
        }
        if sorted {
            return;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bubble_sort() {
        let mut v = vec![4, 6, 77, 1, 13, 24];
        bubble_sort(&mut v);
        assert_eq!(v, vec![1, 4, 6, 13, 24, 77]);
    }
}
```

## Übungen

Erzeuge eine Rust-Applikation namens ch2 mit cargo.

1. Führe den oben stehenden Rustcode aus. 
2. Definiere einen struct-Datentype mit zwei Ganzzahl-Feldern. Konsulitere die Dokumentation für den PartialOrd-Trait (https://doc.rust-lang.org/std/cmp/trait.PartialOrd.html). Implementiere den Trait für die Struktur, so dass structs gemäß der Summe beider Felder sortiert werden. Sortiere drei Beispiel structs.
3. Schreibe einen Test der bubble-Sort-Methode für Vektoren von Ganzzahlen
4. Schreibe einen Test für die oben definierte Struktur
5. Schreibe eine Testmethode, welche mehrere Tests auf einmal durchführt.