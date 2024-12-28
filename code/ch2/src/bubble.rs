use std::cmp::Ordering;



pub fn bubble_sort<T: PartialOrd + std::fmt::Debug>(v: &mut [T]) {
    println!("len={}", v.len());
    for p in 0..v.len()  {
        let mut sorted = true;
        for i in 0..(v.len()-1) - p  {
            if v[i] > v[i+1] {
                v.swap(i, i+1);
                sorted = false;
            }
        }
        if sorted {
            return;
        }
    }
}

// Test whether we can sort a struct by using the PartialOrd trait

#[derive(Debug)]
struct MyStructA {
    v1: i64,
    v2: i64,
}

#[derive(Debug, Clone)]
struct MyStructB {
    v1: i64,
    v2: i64,
}

impl Eq for MyStructB {}


// Implementiere PartialOrd und PartialEq basierend auf der Summe der Werte
impl PartialEq for MyStructB {
    fn eq(&self, other: &Self) -> bool {
        self.v1 + self.v2 == other.v1 + other.v2
    }
}

impl PartialOrd for MyStructB {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        (self.v1 + self.v2).partial_cmp(&(other.v1 + other.v2))
    }
}


impl Ord for MyStructB {
    fn cmp(&self, other: &Self) -> Ordering {
        (self.v1 + self.v2).cmp(&(other.v1 + other.v2))
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bubble_sort() {
        let mut v = vec![4, 6, 77, 1, 13, 24];
        bubble_sort(&mut v);
        assert_eq!(v, vec![1, 4, 6, 13, 24, 77]);
    }

    #[test]
    fn test_bubble_struct() {
        let large = MyStructB { v1: 30, v2: 10 };
        let medium = MyStructB { v1: 10, v2: 20 };
        let small = MyStructB { v1: 5, v2: 15 };

        let mut v_struct_a = vec![ large.clone(), medium.clone(), small.clone() ];
        bubble_sort(&mut v_struct_a);
        let expected_struct_a =  vec![ small, medium, large ];
        
        assert_eq!(v_struct_a, expected_struct_a);
    }

    // Create an array of tests for conciseness
    #[test]
    fn test_bubble_multiply() {
        let tests = vec![
            (vec![3,2,1], vec![1, 2, 3]),
            (vec![42, 35, 2, 7], vec![2, 7, 35, 42]),
            (vec![1000,100,10, 1], vec![1, 10, 100, 1000]),
        ];
        for test in tests {
            let mut array = test.0.clone();
            let expected = test.1.clone();
            bubble_sort(&mut array);
            assert_eq!(array, expected);
        }
    }
}


