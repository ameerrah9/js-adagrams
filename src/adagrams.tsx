// Create a new object to store the letter frequencies
const letterCounts = {
  'A': 9,
  'B': 2,
  'C': 2,
  'D': 4,
  'E': 12,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 9,
  'J': 1,
  'K': 1,
  'L': 4,
  'M': 2,
  'N': 6,
  'O': 8,
  'P': 2,
  'Q': 1,
  'R': 6,
  'S': 4,
  'T': 6,
  'U': 4,
  'V': 2,
  'W': 2,
  'X': 1,
  'Y': 2,
  'Z': 1
}

// Create an array to store the score values for each letter
const letterValues = {
  'A': 1,
  'B': 3,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 4,
  'G': 2,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 5,
  'L': 1,
  'M': 3,
  'N': 1,
  'O': 1,
  'P': 2,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 1,
  'V': 4,
  'W': 4,
  'X': 8,
  'Y': 4,
  'Z': 10
}

// Create the letter pool based on the letter counts
// Create a variable to store the alphabet in an array
const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

// Create a variable to store the letters pool
// Created by the distribution of letters in the letterCounts object
let letterPool: string[] = [];

// For each letter in the alphabet array 
// Add the letter to the letter pool by the repeated 
// the number of times specified in the letterCounts object
alphabet.forEach(function (letter) {
  // Create a variable to store the number of times the letter appears in the letter pool
  // Loop through the letterCounts object
  // For each letter in the letterCounts object
  // If the letter in the letterCounts object matches the letter in the alphabet array
  // Add the letter to the letter pool by the number of times specified in the letterCounts object
  for (let i = 0; i < letterCounts[letter]; i++) {
    // Push the letter into the letter pool
    letterPool.push(letter);
  }
});

// Create a function to draw letters from the letter pool
// Create User's hand to draw letters from
export const drawLetters = () => {
  // Create a variable to store the letters that the user draws
  let hand: string[] = [];
  // Create a copy of the letter pool using the spread operator
  // This is to prevent the letter pool from being mutated
  let letterPoolCopy = [...letterPool];
  
  // Create a loop to draw 10 letters from the letter pool
  for (let i = 0; i < 10; i++) {
    // Grab a random index from the letter pool
    let n = letterPoolCopy.length;
    let i = Math.floor(n * Math.random());
    // Push the letter at the random index into the hand
    hand.push(letterPoolCopy[i]);
    // Remove the letter from the letter pool
    letterPoolCopy.splice(i, 1);
  }
  return hand;
};

// Create a function to check if the user's input is valid
export const usesAvailableLetters = (input, lettersInHand) => {
  // Create an array to store the letters in the user's input
  const input_array = input.split("");
  const n = input.length;

  // Create a copy of the letters in the hand using the spread operator
  // User's hand to draw letters from
  let lettersInHandCopy = [...lettersInHand];

  // Loop through the letters in the user's input
  for (let i = 0; i < n; i++) {
    // Create a variable to store the letter in the user's input
    let letter = input_array[i];

    // If the user's letter is not in the letters in hand
    if (lettersInHandCopy.includes(letter)) {
      // Remove the letter from the letters in the hand
      let j = lettersInHandCopy.indexOf(letter);
      lettersInHandCopy.splice(j, 1);
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  const input = word.toUpperCase();
  const input_array = input.split("");
  const n = input.length;
  let score = 0;

  for (let i = 0; i < n; i++) {
    let letter = input_array[i];
    // Add the score for the letter to the total score
    if (alphabet.includes(letter)) {
      score += letterValues[letter];
    }
  }

  // Add 8 points if the word is 7 or more letters long
  if (n > 6 && n < 11) {
    score += 8;
  }
  
  return score;
};

// Create a function to find the highest scoring word
export const highestScoreFrom = (words) => {
  const n = words.length;
  // Create a variable to store the highest scoring word and the score
  let winner = {
    word: "",
    score: 0,
  };

  // Loop through the words
  for (let i = 0; i < n; i++) {
    // Check if the score of the current word is higher than the current highest score
    if (scoreWord(words[i]) > winner.score) {
      // If the score of the current word is higher than the current highest score
      // Update the highest score and the highest scoring word
      winner = { // Update new winner
        word: words[i],
        score: scoreWord(words[i]),
      };
      //address the tiebreaker
      // If the score of the current word is the same as the current highest score
    } else if (scoreWord(words[i]) === winner.score) {

      // Check if the current highest scoring word (winner's word) is 10 letters long
      if (winner.word.length === 10) {
        // If the current highest scoring word is 10 letters long
        // Do nothing
        winner = winner;
        // If that's not the case, Check if the current word is 10 letters long
      } else if (words[i].length === 10) {
        // If the current word is 10 letters long
        // Update the highest score and the highest scoring word
        winner = {
          word: words[i],
          score: scoreWord(words[i]),
        };
        // If that's not the case, Check if the current word is shorter than the current highest scoring word
      } else if (words[i].length < winner.word.length) {
        winner = {
          word: words[i],
          score: scoreWord(words[i]),
        };
      }
    }
  }
  return winner;
};
