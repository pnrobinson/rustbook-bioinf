# enums..?

Aufzählungen (Enumerationen, kurz, *enums*erlauben es, einen Typ durch Aufzählung seiner möglichen Varianten (variants) zu definieren. In Python und vielen anderen Programmiersprachen sehen enums ungefähr wie folgt aus:

```python
from enum import Enum
class Color(Enum):
    RED = 1
    GREEN = 2     
    BLUE = 3
```

Das heißt, ein enum in Python ist ein Datentyp, der verwendet wird, um eine Menge von benannten Konstanten zu definieren. Diese Konstanten sind typischerweise zusammengehörige Werte, die unveränderlich sind.

In Rust kann man enums analog definieren, z.B., 

```rust
enum Color {
    RED,
    GREEN,
    BLUE,
}

Color::RED;
```

In Rust können enums darüber hinaus mit ggf. unterschiedlichen Datentypen ausgestattet und für Pattern Matching verwendet werden.

S. das [enum-Kapitel](https://rust-lang-de.github.io/rustbook-de/ch06-00-enums.html) im Rust-Buch.

Es folgt ein kurzes Beispiel.
````
enum HttpResponse {
    Ok(String),                     // Variant with associated data (e.g., response body)
    NotFound,                       // Unit variant (no data)
    Redirect { url: String },       // Struct-like variant with named fields
    ServerError(u16, String),       // Tuple-like variant with multiple data types
}

fn handle_response(response: HttpResponse) {
    match response {
        HttpResponse::Ok(body) => {
            println!("Success: {}", body);
        }
        HttpResponse::NotFound => {
            println!("Error: Resource not found.");
        }
        HttpResponse::Redirect { url } => {
            println!("Redirecting to: {}", url);
        }
        HttpResponse::ServerError(code, message) => {
            println!("Server error {}: {}", code, message);
        }
    }
}

fn main() {
    // Example usage
    let response1 = HttpResponse::Ok("Welcome!".to_string());
    let response2 = HttpResponse::NotFound;
    let response3 = HttpResponse::Redirect { url: "https://example.com".to_string() };
    let response4 = HttpResponse::ServerError(500, "Internal Server Error".to_string());

    handle_response(response1);
    handle_response(response2);
    handle_response(response3);
    handle_response(response4);
}
```
