/**
 * I don't usually write so many notes, but I figured I'd explain myself for the sake of the job interview.
 *
 * Throughout the file there are commented console.log statements that can be uncommented to show in the console/command line what is happening at each stage in the program.
 */

/** ==============================
 *  DEPENDENCIES
 *  ============================== */
const fs = require("fs");
const readline = require("readline");

/** ==============================
 *  FUNCTIONS
 *  ============================== */

/** To read file as string, split string on the line breaks to create an array of strings where each string represents one line from the file. */
const readFile = fileName => {
  // console.log(
  //   `Array of Strings:    `,
  //   fs.readFileSync(`./${fileName}`, "utf-8").split("\n"),
  //   "\n"
  // );

  return fs.readFileSync(`./${fileName}`, "utf-8").split("\n");
};

/** To split each string into an array of characters */
const createNestedArrays = arrOfStrs => {
  // An empty array to push the nested arrays into later
  const arrOfIntArrs = [];

  // Map over the array of strings
  arrOfStrs.map(str => {
    // An array of characters made from splitting the string from the array of strings
    const arrOfChars = str.split(" ");
    // console.log(`Array of Characters: `, arrOfChars);

    // Pass array of characters through a function that will convert it into an array of integers.
    arrOfIntArrs.push(handleNestedArrays(arrOfChars));
  });

  //   console.log(`Triangle / Nested Arrays:`);
  //   arrOfIntArrs.map(nestedArray => {
  //     console.log(nestedArray);
  //   });
  //   console.log("");
  return arrOfIntArrs;
};

/** To convert array of characters to an array of integers */
const handleNestedArrays = arrOfChars => {
  // An empty array to push the integers into later
  const arrOfInts = [];

  // Map over the array of characters
  arrOfChars.map(char => {
    /** Since JavaScript uses double equals to check equality without checking type we know that 3 == '3' is true. We can use this to weed out and non-numerical characters that we may have missed like \n or \r  or anything else. */
    if (char == parseInt(char)) {
      // Parse charaters as integers and push them into our array of integers
      arrOfInts.push(parseInt(char));
    }
  });

  //   console.log(`Array of Integers:   `, arrOfInts, "\n");
  return arrOfInts;
};

// To calculate the maximum possible value
const calcMax = triangleNestedArrays => {
  // Continue this operation until there is only one nested array remaining.
  while (triangleNestedArrays.length > 1) {
    // An empty array to push the sums of the las and second to last lines into
    const arrOfSums = [];

    // Remove the last array/line in the triangle
    const firstLastLine = triangleNestedArrays.pop();

    // Remove the second to last array/line in the triangle
    const secondLastLine = triangleNestedArrays.pop();

    // Map over the second to last array
    secondLastLine.map((value, idx) => {
      /** Add the number in the second to last line by the number at the same index from the last line and the next index from the last line and push the higher value into the array of sums. */
      arrOfSums.push(
        Math.max(value + firstLastLine[idx], value + firstLastLine[idx + 1])
      );
    });
    // Push the array of sums back into the triangle data.
    triangleNestedArrays.push(arrOfSums);
  }
  // The final value is the maximum value possible given what we're looking for.
  // Return the value within the nested array for readability.
  return triangleNestedArrays[0][0];
};

/** ==============================
 *  EXECUTE
 *  ============================== */

// Input from user.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Run through functions
rl.question(
  "Please enter the name of the file excluding the file extension: ",
  answer => {
    const originalData = readFile(`${answer}.txt`);

    const numData = createNestedArrays(originalData);

    const maxNum = calcMax(numData);

    console.log(`The maximum total from top to bottom is: `, maxNum);

    rl.close();
  }
);
