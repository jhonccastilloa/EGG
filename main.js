// const exampleEgg = () => {
//   let matriz = createMatriz(9, 12);
//   console.log("CREANDO LA MATRIZ 9 x 12");
//   console.log(matriz);
//   matriz = addValueInMatriz(matriz, "vector", 0);
//   matriz = addValueInMatriz(matriz, "matrix", 1);
//   matriz = addValueInMatriz(matriz, "programa", 2);
//   matriz = addValueInMatriz(matriz, "subprograma", 3);
//   matriz = addValueInMatriz(matriz, "subproceso", 4);
//   matriz = addValueInMatriz(matriz, "variable", 5);
//   matriz = addValueInMatriz(matriz, "entero", 6);
//   matriz = addValueInMatriz(matriz, "para", 7);
//   matriz = addValueInMatriz(matriz, "mientras", 8);
//   console.log("METIENDO LOS VALORES");
//   console.log(matriz);
//   orderWordInMatriz(matriz);
//   console.log("ORDENANDO LOS VALORES");
//   console.log(matriz);
// };

// const createMatriz = (x, y) => {
//   const matriz = [];
//   for (let i = 0; i < x; i++) {
//     matriz.push("* ".repeat(y - 1) + "*");
//   }
//   return matriz;
// };
// const addValueInMatriz = (matriz, word, row) => {
//   const position = matriz[row];
//   const positionSplit = position.split(" ");
//   const wordSplit = word.split("");
//   positionSplit.splice(0, word.length, ...wordSplit);
//   matriz[row] = positionSplit.join(" ");
//   return matriz;
// };

// const orderWordInMatriz = (matriz) => {
//   const aux = [];
//   for (let mat of matriz) {
//     const pos = mat.split(" ").indexOf("r");
//     aux.push(pos);
//   }
//   const maxPos = Math.max(...aux);
//   const leftSpaces = aux.map((el) => maxPos - el);

//   for (let i in matriz) {
//     const matWord = matriz[i]
//       .split(" ")
//       .filter((el) => el !== "*")
//       .join("");
//     const spaceMatWord = ("*".repeat(leftSpaces[i]) + matWord).split("");
//     const positionSplit = matriz[i].split(" ");
//     positionSplit.splice(0, spaceMatWord.length, ...spaceMatWord);
//     matriz[i] = positionSplit.join(" ");
//   }
//   return matriz;
// };
// exampleEgg();

let words = [
  "vector",
  "matrix",
  "programa",
  "subprograma",
  "subproceso",
  "variable",
  "entero",
  "para",
  "mientras",
];

const inputRow = document.querySelector("#inputRow");
const inputLetter = document.querySelector("#inputLetter");

const buttonWord = document.querySelector("#buttonWord");
const buttonOrder = document.querySelector("#buttonOrder");
const buttonClear = document.querySelector("#buttonClear");
const wordsContainer = document.querySelector("#wordsContainer");
const inputWord = document.querySelector("#inputWord");
const matrizContainer = document.querySelector("#matrizContainer");
const matrizTable = document.querySelector("#matrizTable");

inputLetter.addEventListener("input", (e) => {
  const { value } = e.target;
  const letter = inputLetter.value;
  if (!isNaN(value)) {
    inputLetter.value = "";
    return;
  }
  if (value.length > 1) {
    inputLetter.value = letter[0];
  }
});
inputRow.addEventListener("input", (e) => {
  const { value } = e.target;
  let inputValue = inputRow.value.split("");
  const pos = inputRow.value.length - 1;
  if (isNaN(value)) {
    inputValue[pos] = "";
    inputRow.value = inputValue.join("");
    return;
  }
});

inputWord.addEventListener("input", (e) => {
  const { value } = e.target;
  const lastValue = value[value.length - 1];
  let inputValue = inputWord.value.split("");
  const pos = inputWord.value.length - 1;

  if (!isNaN(lastValue)) {
    inputValue[pos] = "";
    inputWord.value = inputValue.join("");
    return;
  }
});

buttonWord.addEventListener("click", () => {
  console.log("entre");
  if (!inputRow.value || !inputLetter.value || !inputWord.value) {
    alert("No dejes los campos vacios");
    return;
  }
  inputRow.disabled = true;
  inputLetter.disabled = true;
  if (words.length + 1 > inputRow.value) {
    alert("no puede agregar mas palabras");
    return;
  }

  const letterValue = inputLetter.value.toLowerCase();
  if (!inputWord.value.toLowerCase().includes(letterValue)) {
    alert(`La palabra no tiene la letra ${letterValue}`);
    return;
  }
  words.push(inputWord.value.toLowerCase());
  printWord();
});

const printWord = () => {
  let html = "<ol>";
  for (let word of words) {
    html += ` <li>${word}</li>`;
  }
  html += "<ol>";
  wordsContainer.innerHTML = html;
};

const orderInit = () => {
  const result = orderWordInMatriz(words);
  printMatriz(result);
};
buttonOrder.addEventListener("click", () => {
  if (words.length < inputRow.value) {
    alert("falta agregar mas palabras");
    return;
  }
  orderInit();
});

const orderWordInMatriz = (matrizReal) => {
  const matriz = [...matrizReal];
  const letter = inputLetter.value.toLowerCase();
  const aux = [];
  for (let mat of matriz) {
    const pos = mat.split("").indexOf(letter);

    aux.push(pos);
  }
  const maxPos = Math.max(...aux);
  const leftSpaces = aux.map((el) => maxPos - el);

  for (let i in matriz) {
    const matWord = matriz[i]
      .split("")
      .filter((el) => el !== "*")
      .join("");
    const spaceMatWord = ("*".repeat(leftSpaces[i]) + matWord).split("");
    const positionSplit = matriz[i].split("");
    positionSplit.splice(0, spaceMatWord.length, ...spaceMatWord);
    matriz[i] = positionSplit.join("");
  }

  return matriz;
};

const printMatriz = (matriz) => {
  const maxWordLength = matriz.reduce(
    (a, b) => (a.length > b.length ? a : b),
    0
  ).length;

  const posLetter = matriz[0].indexOf(inputLetter.value);
  let html = "<tr>";
  for (let i = 0; i <= maxWordLength; i++) {
    html += `<th class='text-primary text-center'>${i}</th>`;
  }

  html += "</tr>";
  for (let i in matriz) {
    html += "<tr>";
    html += `<th class='text-primary text-center'>${+i + 1}</th>`;
    for (let j = 0; j < maxWordLength; j++) {
      if (matriz[i][j]) {
        html += `<th class=${posLetter === j ? "text-danger text-center" : "text-center"}>${
          matriz[i][j]
        }</th>`;
      } else {
        html += `<th>*</th>`;
      }
    }
    html += "</tr>";
  }

  matrizTable.innerHTML = html;
};

const clear = () => {
  words = [];
  inputLetter.value = "";
  matrizTable.innerHTML = "";
  wordsContainer.innerHTML = "";
  inputRow.value = "";
  inputWord.value = "";
  inputRow.disabled = false;
  inputLetter.disabled = false;
};
buttonClear.addEventListener("click", clear);
printWord();
orderInit();
