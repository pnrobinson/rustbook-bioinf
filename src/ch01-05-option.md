# Optional..?


In C wird oft der Wert NULL verwendet, um anzuzeigen, dass ein Zeiger keinen gültigen Wert enthält,

Das Problem mit Nullwerten besteht darin, dass du einen Fehler erhältst, wenn du versuchst, einen Nullwert als Nicht-Nullwert zu verwenden. 

Aus diesem Grunde haben viele neuere Programmiersprachen wie
Python und Java "Optional"-Datentypen.


Optional[int] bedeutet, dass die Funktion entweder einen int oder None zurückgeben kann.


```C
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Funktion, die eine Zeichenkette zurückgibt oder NULL, wenn der Schlüssel nicht gefunden wird
const char* find_value(const char* key) {
    if (strcmp(key, "a") == 0) {
        return "Wert A";
    } else if (strcmp(key, "b") == 0) {
        return "Wert B";
    }
    return NULL;  // Kein Wert gefunden
}

int main() {
    const char* result;

    result = find_value("a");  // Schlüssel gefunden
    if (result != NULL) {
        printf("Gefundener Wert: %s\n", result);
    } else {
        printf("Kein Wert gefunden\n");
    }

    result = find_value("c");  // Schlüssel nicht gefunden
    if (result != NULL) {
        printf("Gefundener Wert: %s\n", result);
    } else {
        printf("Kein Wert gefunden\n");
    }

    return 0;
}
```

In Java gibt es deshalb die Klasse Optional, die   verwendet wird, um anzuzeigen, dass ein Wert entweder vorhanden ist oder fehlt. 

```java
import java.util.Optional;

public class Main {
    public static void main(String[] args) {
        // Ein Optional mit einem Wert
        Optional<String> someValue = findValue("a");
        someValue.ifPresentOrElse(
            value -> System.out.println("Gefundener Wert: " + value),
            () -> System.out.println("Kein Wert gefunden")
        );

        // Ein Optional ohne Wert
        Optional<String> noValue = findValue("c");
        noValue.ifPresentOrElse(
            value -> System.out.println("Gefundener Wert: " + value),
            () -> System.out.println("Kein Wert gefunden")
        );
    }

    public static Optional<String> findValue(String key) {
        if ("a".equals(key)) {
            return Optional.of("Wert A");
        } else if ("b".equals(key)) {
            return Optional.of("Wert B");
        }
        return Optional.empty(); // Kein Wert gefunden
    }
}
```

In Rust gibt es die Aufzählung "Option<T>":
```rust
enum Option<T> {
    None,
    Some(T),
}
```
Sie wird wie folgt verwendet.


```rust
fn find_value(key: &str) -> Option<&str> {
    match key {
        "a" => Some("Wert A"),
        "b" => Some("Wert B"),
        _ => None,
    }
}

fn main() {
    if let Some(value) = find_value("a") {
        println!("Gefundener Wert: {}", value);
    } else {
        println!("Kein Wert gefunden");
    }
}
````

Option ist ein zentrales und unverzichtbares Konstrukt in Rust, das nicht nur für Sicherheit und Klarheit sorgt, sondern auch das Risiko von Fehlern durch null-Referenzen vollständig eliminiert. Das Enum Option in Rust repräsentiert einen Wert, der entweder vorhanden ist (Some(T)) oder fehlt (None). Es wird häufig verwendet, um Werte oder Operationen sicher zu behandeln, die möglicherweise keinen Wert zurückgeben.

S. " Aufzählung Option und ihre Vorteile gegenüber Nullwerten" in dem [enum Kapitel](https://rust-lang-de.github.io/rustbook-de/ch06-01-defining-an-enum.html) des Rust-Buchs.
