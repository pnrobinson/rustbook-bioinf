# Das Kontrollflusskonstrukt match

Das Kontrollflusskonstrukt namens "match" ist verglichen mit "if/else" und "switch" bei den meisten anderen Programmiersprachen extrem leistungsfähig und flexibel. Um in Rust zu programmieren ist ein gutes Verständnis von "match" unverzichtbar.

Es folgt ein gekünsteltes Beispiel, wobei nach Übereinstimmung mit drei Elementen geprüft wird (Einzelheiten werden während des Prkatikums besprochen!).

```rust
impl DnaSequence {
    /// Analysiert die Sequenz und liefert eine Beschreibung basierend auf verschiedenen Kriterien.
    fn analyze(&self) -> String {
        match (self.sequence.len(), self.reference_position, self.annotations.get("Gene")) {
            (0, _, _) => "Die Sequenz ist leer.".to_string(),
            (1..=50, Some(pos), Some(gene)) => format!(
                "Kurze Sequenz, referenziert an Position {} und gehört zu Gen {}.",
                pos, gene
            ),
            (1..=50, Some(pos), None) => format!(
                "Kurze Sequenz, referenziert an Position {}, aber kein Gen zugeordnet.",
                pos
            ),
            (51.., _, Some(gene)) => format!("Lange Sequenz, zugeordnet zu Gen {}.", gene),
            (51.., _, None) => "Lange Sequenz ohne Gen-Annotation.".to_string(),
            _ => "Sequenz konnte nicht analysiert werden.".to_string(),
        }
    }
}

```

s. das [match-Kapitel](https://rust-lang-de.github.io/rustbook-de/ch06-02-match.html) im Rust-Buch.
