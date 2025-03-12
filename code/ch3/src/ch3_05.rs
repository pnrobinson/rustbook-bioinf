// ANCHOR: phred
pub fn calculate_phred(qual: char) -> usize {
    42
}
// ANCHOR_END: phred

// ANCHOR: phred_tests
#[cfg(test)]
mod test {

    use super::calculate_phred;
    
    #[test]
    fn test_calculate_phred() {
        let qual: char = '&';
        let expected:usize =	5; // Phred-Score für das Zeichen '&'
        let res = calculate_phred(qual);
        assert_eq!(expected, res);
    }

    // Alternativ können viele Ergebnisse auf einmal getestet werden:
    #[test]
    fn test_calculate_phred_other() {
        let tests: Vec<(char, usize)> = vec![
            ('&', 5),
            ('+', 10)
        ];
        for test in tests {
            let res = calculate_phred(test.0);
            assert_eq!(test.1, res);
        }
    }
    // ggf. andere Testfunktionen
}
// ANCHOR_END: phred_tests
