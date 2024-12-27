# Klassen..?


In objektorientierten Programmiersprachen (z.B., Java, C++, auch Python) bezeichnet der Begriff "Klasse" eine benutzerdefinierte Datentypstruktur, die verwendet wird, um:
- Daten (Attribute, Eigenschaften oder Felder) zu gruppieren.
- Funktionen (Methoden) bereitzustellen, die auf diese Daten zugreifen oder sie manipulieren können.
Die Vererbung ist ein Mechanismus, durch den eine abgeleitete Klasse die Eigenschaften und Methoden einer anderen Klasse (der Oberklasse oder Basisklasse) übernimmt. Ein Objekt ist dann eine Instanz einer Klasse, die die in der Klasse definierten Attribute und Methoden besitzt.

Rust ist keine OOP und hat *keine* Klassen. Stattdessen sind Strukturen und Aufzählungen (enums) die Bausteine zum Erstellen neuer Typen in der Domäne eines Rust-Programms.

S. hierzu die Kapitel in Rustbuch:
- [structs](https://rust-lang-de.github.io/rustbook-de/ch05-00-structs.html)
- [enums](https://rust-lang-de.github.io/rustbook-de/ch06-00-enums.html)