// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    // Changes base at random index
    mutate() {
      let i = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (this.dna[i] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[i] = newBase;
    },
    // Compares dna of two different specimen objects
    compareDNA(pAequorTwo) {
      let n = 0;
      for (let i=0; i<15; i++) {
        if (this.dna[i] === pAequorTwo.dna[i]) {
          n++;
        }
      }
      let percent = (n/15)*100;
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequorTwo.specimenNum} have ${percent}% in common.`);
    },
    // Returns true if specimen object's dna contains at least 60% 'C' or 'G' bases
    willLikelySurvive() {
      let count = 0;
      for (let i=0; i<15; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          count++;
        }
      }
      let percent = (count/15)*100;
      if (percent >= 60) {
        return true;
      } else {
        return false;
      }
    }
  }
};

// Return 30 instances of survivable pAequor specimens in array
const findThirty = () => {
  const survivableArr = [];
  let counter = 1;
  while (survivableArr.length < 30) {
    let specimen = pAequorFactory(counter, mockUpStrand());
    if (specimen.willLikelySurvive()) {
      survivableArr.push(specimen);
      counter++;
    }
  }
  return survivableArr;
}

// Test function: findThirty()
const survivableSpecimens = findThirty();
console.log(survivableSpecimens);
// Should print 30 specimen objects that meet criteria for survivability

// Test function: pAequorFactory()
// console.log(pAequorFactory(1, mockUpStrand())); 
// Should print an object that contains 'specimenNum' and 'dna' properties with values passed in from parameters.

// Test method: mutate()
// const specimen = pAequorFactory(1, mockUpStrand());
// console.log(specimen.dna);
// specimen.mutate();
// console.log(specimen.dna);
// Should print two arrays of dna, only one random index has different values between arrays.

// Test method: compareDNA()
// const specimen1 = pAequorFactory(1, mockUpStrand());
// const specimen2 = pAequorFactory(2, mockUpStrand());
// specimen1.compareDNA(specimen2);
// console.log(specimen1.dna);
// console.log(specimen2.dna);
// Should print an accurate percentage of dna bases in common between dna1 and dna1

// Test method: willLikelySurvive()
// const specimen1 = pAequorFactory(1, ['C', 'G', 'G', 'C', 'C', 'G', 'C', 'G', 'C', 'G', 'C', 'G', 'C', 'T', 'A']);
// const specimen2 = pAequorFactory(2, ['C', 'G', 'C', 'G', 'C', 'T', 'G', 'T', 'G', 'G', 'C', 'T', 'G', 'C', 'G']);
// console.log(specimen1.willLikelySurvive());
// console.log(specimen2.willLikelySurvive());
// Both should return true.