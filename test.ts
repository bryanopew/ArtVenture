// shuffle array function
function shuffle(array: number[]) {
  let prevArr = [...array];
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element..
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element...
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // return shuffled array
  return array;
}

let rndNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];

rndNumber.map((num, i) => {
  console.log(num);
});

let shuffledNumberArr = shuffle(rndNumber);

console.log(
  '--------------------------------- after shuffle ----------------------------',
);

shuffledNumberArr.map((num, i) => {
  console.log(num);
});
