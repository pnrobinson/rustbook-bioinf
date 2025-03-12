use std::str::FromStr;

#[derive(Debug)]
struct DnaString {
    pub dna: String,
}

#[derive(Debug)]
struct DnaParseError;

impl FromStr for DnaString {
    type Err = DnaParseError;

    fn from_str(s: &str) -> Result<DnaString, DnaParseError> {
        if s.chars().all(|c| matches!(c, 'A' | 'C' | 'G' | 'T')) {
            let d = DnaString { dna: s.to_string()};
            println!("{:?}", d);
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


