
mod bubble;
mod quick;

use crate::quick::quicksort;

fn main() {
    println!("Hello, world!");
    let mut v = vec![4, 6, 1, 8, 13, 33, 2];
    let expected = vec![1, 2, 4, 6, 8, 13, 33];
    quicksort(&mut v);
    assert_eq!(expected, v);
}
