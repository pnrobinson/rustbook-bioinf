# Interfaces (Schnittstellen)...?

In Sprachen wie Java  definiert eine Interface (Schnittstelle) die Signaturen von Methoden (ohne Implementierung), die von einer implementierenden Klasse bereitgestellt werden müssen.

```java
public interface Animal {
    void makeSound();
}

public class Dog implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Wuff!");
    }
}

public class Cat implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Miau!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal dog = new Dog();
        Animal cat = new Cat();

        dog.makeSound(); // Ausgabe: Wuff!
        cat.makeSound(); // Ausgabe: Miau!
    }
}
```

In Python gibt es keine Schnittstellen im engeren Sinne, jedoch kann man mit verschiedenen Konstrukten Ähntliches implementieren (vgl [Duck typing](https://realpython.com/duck-typing-python/)).


# Traits

In Rust haben Traits in etwa den Stellenwert von Interfaces, jedoch werden sie anders implementiert.

Man kann bestehende Traits für eigene Datentypen implementieren oder aber neue Traits definieren. Hier wollen wir den Trait <code>FromString</code> aus der Standardbibliothek für eine eigene Struktur implementieren.

Der Trait [FromString](https://doc.rust-lang.org/std/str/trait.FromStr.html) ist von der Standardbibliothek. 

```rust
pub trait FromStr: Sized {
    type Err;

    // Required method
    fn from_str(s: &str) -> Result<Self, Self::Err>;
}
```

Die parse-Method erwartet nur, dass ein Datentyp diesen Trait implementiert.

```rust
pub fn parse<F: FromStr>(&self) -> Result<F, F::Err> {
        FromStr::from_str(self)
}
```

Stellen wir uns folgende Struktur vor
```rust
struct DnaString {
    dna: String;
}
````

Um unsere Struktur mit <code>parse</code> verwenden zu können, müssen wir zwei Traits implementieren. Unser Code überprüft, ob alle Zeichen in dem zu parsenden String A, C, G, order T sind.

```rust
use std::str::FromStr;

struct DnaString {
    pub dna: String,
}

#[derive(Debug)]
struct DnaParseError;

impl FromStr for DnaString {
    type Err = DnaParseError;

    fn from_str(s: &str) -> Result<DnaString, DnaParseError> {
        if s.chars().all(|c| matches!(c, 'A' | 'C' | 'G' | 'T')) {
            Ok(DnaString { dna: s.to_string()})
        } else {
            Err(DnaParseError)
        } 
    }
}

#[cfg(test)]
mod test {
    use super::DnaString;


    #[test]
    fn test_dna_parse() {
        let valid_dna = "ATGCTCGCTAG";
        let dna_struct = valid_dna.parse::<DnaString>();
        assert!(dna_struct.is_ok());
        let dna_struct = dna_struct.expect("Could not unwrap DNA");
        assert_eq!(valid_dna, dna_struct.dna);
    }

    #[test]
    fn test_invalid_dna_parse() {
        let valid_dna = "ATGCT??CGCTAG";
        let dna_struct = valid_dna.parse::<DnaString>();
        assert!(dna_struct.is_err());
    }
}
```

# Übung 1

Der folgende Code kompiliert nicht
```rust 
let d = DnaString { dna: "TGCAACGT".to_string()};
writeln!("{}", d);
``` 

Verwenden Sie die Fehlermeldung des Rustkompilierers um herauszufinden, warum 
der Code nicht funktioniert. Es gibt mindests zwei Korrekturen - finden Sie sie 
und schreiben Sie entsprechenden Rustcode.

