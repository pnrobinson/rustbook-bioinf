# Exceptions... ?


Guter Code muss immer mit dem DAU rechnen (Dem dümmsten anzunehmenden User)... Außerdem können unerwartete Dinge passieren, wie z.B. der Absturz einer API, auf die unser Code angwiesen ist.

Viele Sprachen (z.B. Pyhton, Java) behandeln solche Ausnahmen (Exceptions) mit einer try/catch-Struktur.

```java
public static int divide(int a, int b){
    int c = 0;
    try {
        c = a/b; 
    } catch(ArithmeticException e){
        System.out.printf("Fehler: {e.getMessage}", e);
    }
    return c;
}
```
oder (besser)

```java
public static int divide(int a, int b) throws ArithmeticException {
    if (b==0) {
        throw new ArithmeticException("Attempt to divide by zero!");
    }
    return a/c;
}
```

In Rust gibt es dagegen keine herkömmlichen Exceptions. Stattdessen verfolgt Rust einen Ansatz, der auf Ergebnis-Typen und Panics basiert, um Fehler zu 
handhaben. 

## Result

<code>Result<T, E></code> ist der Typ, der zum Zurückgeben und Weitergeben 
von Fehlern verwendet wird. Es handelt sich um eine Aufzählung mit 
den Varianten <code>Ok(T)</code>, die für Erfolg steht und einen Wert enthält, und  <code>Err(E)</code>, die für Fehler steht und einen Fehlerwert enthält.

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division durch Null ist nicht erlaubt"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let numerator = 10.0;
    let denominator = 0.0;

    match divide(numerator, denominator) {
        Ok(result) => println!("Ergebnis: {}", result),
        Err(e) => eprintln!("Fehler: {}", e),
    }
}
```


### Warum Rust keine Ausnahmen verwendet

1. Keine versteckten Kontrollflüsse: Fehlerbehandlung ist explizit.
2. Kostenkontrolle: Keine zusätzlichen Laufzeitkosten durch Exception-Handling.
3. Sicherheit: Rust fördert die Verwendung von Result oder Option, was den Umgang mit Fehlern zwingend macht.


### Panic vs Result

Für schwerwiegende Fehler, die nicht erwartet oder behandelt werden sollen, bietet Rust das Konzept eines Panic. Ein Panic bedeutet, dass das Programm nicht fortgesetzt werden kann, und wird typischerweise verwendet, wenn ein logischer Fehler vorliegt, z. B. ein Index außerhalb der Grenzen eines Arrays.

```rust
fn main() {
    let v = vec![1, 2, 3];
    println!("{}", v[10]); // löst panic aus - beendet das Programm
}
```

Vgl. den Abschnitt [When to use panic! vs Result
](https://doc.rust-lang.org/std/macro.panic.html).



### unwrap

<code>unwrap</code> wird verwendet, um den enthaltenen Wert eines Option oder Result zu extrahieren. Wenn der Wert nicht existiert (None für Option oder Err für Result), führt unwrap zu einem panic!


```rust
fn main() {
    let some_value = Some(42);
    let none_value: Option<i32> = None;

    println!("{}", some_value.unwrap()); // Gibt 42 aus.

    // Führt zu einem panic!
    println!("{}", none_value.unwrap());
}
```

## expect

<code>expect</code> ist wie <code>unwrap</code>, erlaubt aber, eine benutzerdefinierte Fehlermeldung anzugeben, wenn ein Fehlerzustand eintritt. Dies ist hilfreich für Debugging.

Im folgenden Beispiel führt das <code>expect</code> zu einem <code>panic!</panic> mit einer benutzerdefinierten Fehlermeldung.


```rust
fn main() {
    let none_value: Option<i32> = None;

    println!("{}", none_value.expect("Option war None"));
}
```

## Sicherere Alternativen zu unwrap

### <code>match</code>. 

Siehe hierzu [Kapitel01-06](ch01-06-match.md).

```rust
fn main() {
    let some_value = Some(42);

    match some_value {
        Some(value) => println!("Wert: {}", value),
        None => println!("Kein Wert gefunden"),
    }
}
````

### unwrap_or
Falls ein Wert nicht existiert, liefert <code>unwrap_or</code> einen Standardwert zurück.


```rust
fn main() {
    let none_value: Option<i32> = None;
    println!("{}", none_value.unwrap_or(0)); // Gibt 0 aus.
}
```

### unwrap_or_else
Führt eine Funktion aus, um einen Standardwert zu berechnen, wenn der Wert nicht existiert.

```rust
fn main() {
    let none_value: Option<i32> = None;
    println!("{}", none_value.unwrap_or_else(|| 42)); // Gibt 42 aus.
}
```

### ?-Operator

Der <code>?</code>-Operator kann in Funktionen verwendet werden, die einen Result zurückgeben. Er kann verwendet werden, um den Wert aus einem Result oder Option zu extrahieren, ohne jedes Mal explizit match schreiben zu müssen. Wenn ein Fehler auftritt, gibt der ?-Operator den Fehler direkt aus der umgebenden Funktion zurück.

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Division durch Null"))
    } else {
        Ok(a / b)
    }
}

fn calculate() -> Result<(), String> {
    let result = divide(10.0, 2.0)?; // Extrahiert den Wert oder gibt den Fehler (gleich) zurück.
    println!("Ergebnis: {}", result);
    Ok(()) // Rückgabe im Erfolgsfall
}

fn main() {
    match calculate() {
        Ok(()) => println!("Berechnung erfolgreich!"),
        Err(e) => println!("Fehler: {}", e),
    }
}
```