const maxSize = 30;
const textField = document.getElementById("texto");
const outputField = document.getElementById("output-field");
const outputFrasesField = document.getElementById("frases-divididas");

let listas = []; //input já separado em listas
let tabela; //tabela de probabilidades
let estruturas = []

console.log("Compactador Aritimético carregado.");

//Recebe o input do formulário
function GetInput() {
  return textField.value;
}

function ClearOutputField() {
  while (outputFrasesField.childElementCount > 1) {
    outputFrasesField.removeChild(outputFrasesField.lastChild);
  }
}

/*

//Coordena o processo de compactação
function HandleCompactar() {
  const texto = GetInput();
  const treatedText = SplitAndGenerateDict(texto);
  // Aqui temos acesso a todas as frases com todos os dicionários de probabilidade
  console.log(treatedText);
  Compacta(treatedText[0].frase, treatedText[0].probs);

  treatedText.forEach((item) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = item.frase;
    div.appendChild(p);

    let ul = document.createElement("ul");
    Array.from(item.probs.entries()).forEach(([key, value]) => {
      let li = document.createElement("li");
      li.textContent = `${key === "\u0003" ? "$" : key} : ${value}`;
      ul.appendChild(li);
    });
    div.appendChild(ul);

    // let pre = document.createElement("pre");
    // pre.textContent = JSON.stringify(item.probs, null, 2);
    // div.appendChild(pre);

    outputFrasesField.appendChild(div);
  });
}

//Coordena o processo de descompactação
function HandleDescompactar() {}

//Acha a probabilidade dos caracteres aparecerem para cada lista XXXX
function FindProbabilites(frase) {
  const probs = {};
  for (let char of frase) {
    if (probs[char]) {
      probs[char]++;
    } else {
      probs[char] = 1;
    }
  }

  for (let char in probs) {
    probs[char] /= frase.length;
  }

  return probs;
}

//Verifica se o input e <= o tamanho máximo e, caso contrário separa em listas menores
function VerifyAndSplitInput(frase) {
  const qtd = frase.length;
  const tempFrase = frase;
  const lista = [];

  while (tempFrase) {
    if (qtd < maxSize) {
      //add ao array final
    } else if (qtd > maxSize && qtd < maxSize * 2) {
      //Divide na metade e add ao array final
    } else {
      //Retira do array a quantidade máxima e add ao array final
    }
    //return lista
  }
}

// XXXXXX
function SortProbabilities(probObj) {
  const sortedEntries = Object.entries(probObj).sort((a, b) => b[1] - a[1]);
  return new Map(sortedEntries);
}

function SplitAndGenerateDict(string) {
  // Tipagem da lista:
  // [
  //     {frase, probs}
  // ]
  const lista = [];

  for (let i = 0; i < string.length; i += maxSize) {
    const frase = string.substring(i, i + maxSize) + "\u0003";
    const probs = FindProbabilites(frase);

    const sortedProbs = SortProbabilities(probs);

    lista.push({ frase, probs: sortedProbs });
  }

  return lista;
}

// function Compacta(termo, lista){
//     // Intervalo superior da probabilidade
//     let maxVal = 1
//     // Intervalo inferior da probabilidade
//     let minVal = 0

//     let tempProb = []
//     let number

//     for(let car of termo){
//         tempProb.push(minVal)
//         for(let carac of termo){
//             tempProb.push(lista[carac]+tempProb[tempProb.length - 1])
//             //Verificar o próximo intervalo e ajustar as variaveis minVal e maxVal de acordo
//         }
//         tempProb = []
//         // Final
//         number = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
//     }
// }

// XXXX
function Compacta(frase, probabilidades) {
  // Tipagem de passos: [
  //     {
  // char: string,
  // maxVal: Number,
  // minVal: Number,
  // encodedNumber: Number,
  //     }
  // ]
  let passos = [];

  // Intervalo superior da probabilidade
  let maxVal = 1;
  // Intervalo inferior da probabilidade
  let minVal = 0;

  let probEntries = Array.from(probabilidades.entries());
  let encodedNumber = 0;

  for (let char of frase) {
    let minAux = minVal;
    console.log("Encoding char:", char)
    // console.log("MinAux:", minAux)
    console.log("Min - Max:", minVal, maxVal);
    for (let prob of probEntries) {
      const probCoeficient = maxVal - minVal;
      console.log(`ProbCoeficient is: ${probCoeficient}`);
      if (char === prob[0]) {
        minVal = minAux;
        maxVal = minAux + (prob[1]*probCoeficient);
        console.log(`Char ${char} === ${prob[0]}. \n minVal = ${minVal} | maxVal = ${maxVal}`);
        break;
      } else {
          minAux += (prob[1]*probCoeficient);
          console.log(`Char ${char} !== ${prob[0]}. \n MinAux = ${minAux}`);
      }
    }
  }

  console.log(maxVal, minVal)
  console.log("encoded:", (maxVal+minVal)/2)

  //   console.log(encodedNumber);
}

*/

// -------------------------------------------------------------------

//Rodar antes de criar Estrutura
function SplitString(string){
    let frases = []
    for (let i = 0; i < string.length; i += maxSize) {
        const frase = string.substring(i, i + maxSize) + "\u0003";
        frases.push(frase)
    }
    return frases
}

function HandleCompactar2() {
    const texto = GetInput();
    const treatedText = SplitString(texto)

    treatedText.forEach((item) => {
        //VVVV Aqui temos acesso a todas as frases com todos os dicionários de probabilidade VVVV
        let est = new Estrutura(texto, item, maxSize)
        est.createTable()
        // -----------------------------------------------------------------------------

        // VVVV Cria HTML VVVV
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.textContent = item;
        div.appendChild(p);
    
        let ul = document.createElement("ul");
        Array.from(est.tabela.entries()).forEach(([key, value]) => {
            let li = document.createElement("li");
            li.textContent = `${key === "\u0003" ? "$" : key} : ${value}`;
            ul.appendChild(li);
        });
        div.appendChild(ul);
    
        outputFrasesField.appendChild(div);
        //----------------------------------------------------------------------------

        //
        est.codificacao()
        est.codificaFinalValue()
        estruturas.push(est)
    })
  }
