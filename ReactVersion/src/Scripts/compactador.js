console.log("Compactador Aritimético carregado.");

//Coordena o processo de compactação
export function Compactar(texto, maxSize) {
  const stringsAndProbs = SplitAndGenerateDict(texto, maxSize);
  // Aqui temos acesso a todas as frases com todos os dicionários de probabilidade
  return stringsAndProbs;
}

//Coordena o processo de descompactação
function Descompactar() {
}

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

function SortProbabilities(probObj) {
  const sortedEntries = Object.entries(probObj).sort((a, b) => b[1] - a[1]);
  return new Map(sortedEntries);
}

function SplitAndGenerateDict(string, maxSize) {
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

export function Codifica(frase, probabilidades) {
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
    const passosObject = {minVal, maxVal, char};

    let minAux = minVal;
    for (let prob of probEntries) {
      const key = prob[0];

      const value = prob[1];
      const intervalSize = maxVal - minVal;

      if (char === key) {
        minVal = minAux;
        maxVal = minAux + (value*intervalSize);
        break;
      } else {
          minAux += (value*intervalSize);
      }
    }
    encodedNumber = (maxVal + minVal) / 2;

    passosObject.encodedNumber = encodedNumber;
    passos.push(passosObject);
  }

  return passos;

}


// -------------------------------------------------------------------

// //Rodar antes de criar Estrutura
// function SplitString(string){
//     let frases = []
//     for (let i = 0; i < string.length; i += maxSize) {
//         const frase = string.substring(i, i + maxSize) + "\u0003";
//         frases.push(frase)
//     }
//     return frases
// }

// function HandleCompactar2() {
//     const texto = GetInput();
//     const treatedText = SplitString(texto)

//     treatedText.forEach((item) => {
//         //VVVV Aqui temos acesso a todas as frases com todos os dicionários de probabilidade VVVV
//         let est = new Estrutura(texto, item, maxSize)
//         est.createTable()
//         // -----------------------------------------------------------------------------

//         // VVVV Cria HTML VVVV
//         let div = document.createElement("div");
//         let p = document.createElement("p");
//         p.textContent = item;
//         div.appendChild(p);
    
//         let ul = document.createElement("ul");
//         Array.from(est.tabela.entries()).forEach(([key, value]) => {
//             let li = document.createElement("li");
//             li.textContent = `${key === "\u0003" ? "$" : key} : ${value}`;
//             ul.appendChild(li);
//         });
//         div.appendChild(ul);
    
//         outputFrasesField.appendChild(div);
//         //----------------------------------------------------------------------------

//         //
//         est.codificacao()
//         est.codificaFinalValue()
//         estruturas.push(est)
//     })
//   }
