# Klassen..?


In objektorientierten Programmiersprachen (z.B., Java, C++, auch Python) bezeichnet der Begriff "Klasse" eine benutzerdefinierte Datentypstruktur, die verwendet wird, um:
- Daten (Attribute, Eigenschaften oder Felder) zu gruppieren.
- Funktionen (Methoden) bereitzustellen, die auf diese Daten zugreifen oder sie manipulieren können.
Die Vererbung ist ein Mechanismus, durch den eine abgeleitete Klasse die Eigenschaften und Methoden einer anderen Klasse (der Oberklasse oder Basisklasse) übernimmt. Ein Objekt ist dann eine Instanz einer Klasse, die die in der Klasse definierten Attribute und Methoden besitzt.

Rust ist keine OOP und hat *keine* Klassen. Stattdessen sind Strukturen und Aufzählungen (enums) die Bausteine zum Erstellen neuer Typen in der Domäne eines Rust-Programms.



# Strukturen (struct)

Eine Struktur (struct) ist ein benutzerdefinierter Datentyp, mit dem man mehrere zusammenhängende Werte, die eine sinnvolle Gruppe bilden, zusammenpacken und benennen kann.  

Hier ist ein aus der Luft gegriffenes Beispiel:

```rust
use std::collections::HashMap;

#[derive(Debug)]
struct DnaSequence {
    id: String,               
    sequence: String,         
    quality_scores: Vec<u8>,   
    annotations: HashMap<String, String>, 
    reference_position: Option<u32>,  
}

impl DnaSequence {
    /// Methoden -- mehr dazu später
}
```


### Weitere Informationen: 

- [structs](https://rust-lang-de.github.io/rustbook-de/ch05-00-structs.html)
