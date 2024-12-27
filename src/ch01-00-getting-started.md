# Erste Schritte

### Grundlagen von Rust

*Ziel der ersten Woche*: Prakltikumsteilnehmer sollen ein grundlegendes Verständnis von Rust entwickeln, indem sie die ersten Kapitel des Rust-Buches durcharbeiten: [Rust book](https://doc.rust-lang.org/book/). Übersetzungen des Buches in verschiedene Sprache sind verfügbar (z.B., [Deutsch](https://rust-lang-de.github.io/rustbook-de/)).

Es lohnt sich, das ganze Buch zu lesen und alle Übungen auszuführen. Wir werden im Praktikum einige der weichtigsten Themen gemeinsam besprechen.

### Gibt es in Rust Klassen?

In objektorientierten Programmiersprachen (z.B., Java, C++, auch Python) bezeichnet der Begriff "Klasse" eine benutzerdefinierte Datentypstruktur, die verwendet wird, um:
- Daten (Attribute, Eigenschaften oder Felder) zu gruppieren.
- Funktionen (Methoden) bereitzustellen, die auf diese Daten zugreifen oder sie manipulieren können.
Die Vererbung ist ein Mechanismus, durch den eine abgeleitete Klasse die Eigenschaften und Methoden einer anderen Klasse (der Oberklasse oder Basisklasse) übernimmt. Ein Objekt ist dann eine Instanz einer Klasse, die die in der Klasse definierten Attribute und Methoden besitzt.

Rust ist keine OOP und hat keine Klassen. Stattdessen sind Strukturen und Aufzählungen (enums) die Bausteine zum Erstellen neuer Typen in der Domäne eines Rust-Programms

### Strukturen (struct)

Eine Struktur (struct) ist ein benutzerdefinierter Datentyp, mit dem man mehrere zusammenhängende Werte, die eine sinnvolle Gruppe bilden, zusammenpacken und benennen kann.    

- Aufgabe: [Kapitel 5](https://rust-lang-de.github.io/rustbook-de/ch05-01-defining-structs.html) des Rust-Buchs