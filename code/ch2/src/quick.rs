use std::fmt::Debug;
use rand::Rng;


///
/// Die folgende Implementierung der Funktion pivot teilt das Feld so, 
/// dass sich das Pivotelement an seiner endgültigen Position befindet 
/// und alle kleineren Elemente davor stehen, während alle größeren 
/// danach kommen:
pub fn quicksort<T: PartialOrd+Debug+Clone>(v: &mut[T]) {
    if v.len() <= 1 {
        return;
    }
    let high_index = v.len() - 1;
    let pivot = v[high_index].clone();
    let mut lp: usize = 0; // Left pointer
    let mut rp: usize = high_index; // Right pointer
    while lp < rp {
        while v[lp] <= pivot && lp < rp {
            lp += 1;
        }
        while v[rp] >= pivot && lp < rp {
            rp -= 1;
        }
        v.swap(lp, rp);
    }
    //Wenn wir hier ankommen, müssen wir den Drehpunkt mit dem Wert am linken Zeiger vertauschen
    // highIndex ist der Index des Pivotelements
    v.swap(lp, high_index);
    let (left, right) = v.split_at_mut(lp);
    quicksort(left);
    quicksort(&mut right[1..]);
}

///
/// Die folgende Implementierung der Funktion pivot teilt das Feld so, 
/// dass sich das Pivotelement an seiner endgültigen Position befindet 
/// und alle kleineren Elemente davor stehen, während alle größeren 
/// danach kommen:
pub fn quicksort_ran<T: PartialOrd+Debug+Clone>(v: &mut[T]) {
    if v.len() <= 1 {
        return;
    }
    let high_index = v.len() - 1;
    // den Wert am Zufallsindex mit dem letzten Wert des Arrays vertauschen
    let mut rng = rand::thread_rng();  
    let ran_idx = rng.gen_range(0..v.len());  
    v.swap(ran_idx, high_index);
    
    let pivot = v[high_index].clone();
    let mut lp: usize = 0; // Left pointer
    let mut rp: usize = high_index; // Right pointer
    while lp < rp {
        while v[lp] <= pivot && lp < rp {
            lp += 1;
        }
        while v[rp] >= pivot && lp < rp {
            rp -= 1;
        }
        v.swap(lp, rp);
    }
    //Wenn wir hier ankommen, müssen wir das Pivotelement mit dem Wert am linken Zeiger vertauschen
    // highIndex ist der Index des Pivotelements
    v.swap(lp, high_index);
    let (left, right) = v.split_at_mut(lp);
    quicksort_ran(left);
    quicksort_ran(&mut right[1..]);
}


#[cfg(test)]
mod test {

    use super::*;
    
    #[test]
    fn test_quicksort() {
        let mut v = vec![4, 6, 1, 8, 13, 33, 2];
        let expected = vec![1, 2, 4, 6, 8, 13, 33];
        quicksort(&mut v);
        assert_eq!(expected, v);
    }

    #[test]
    fn test_quicksort_ran() {
        let mut v = vec![4, 6, 1, 8, 13, 33, 2];
        let expected = vec![1, 2, 4, 6, 8, 13, 33];
        quicksort_ran(&mut v);
        assert_eq!(expected, v);
    }
}