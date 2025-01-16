# Einführung in Rust für Bioinformatiker


We need to decide where the book wants to live. 
For now, it can be started locally with the following


```shell
cargo install mdbook
mdbook serve --open
```

## Test

We can execute the code examples to ensure they correspond to valid code
with the following

```shell
mdbook test
```

## Use Rust Analyzer

The Rust snippets rendered in the book are located in the `code` folder,
one crate per chapter.
It's good to employ Rust Analyzer while writing Rust code.
In VS Code, we can add the following
into the `.vscode/settings.json` file to enable Rust Analyzer:

```json
{
    "rust-analyzer.linkedProjects": [
        "code/ch2/Cargo.toml",
        "code/ch3/Cargo.toml",
    ]
}
```