console.log("Compactador Aritimético carregado.");

//Coordena o processo de compactação
export function Compactar(texto, maxSize) {
  const stringsAndProbs = SplitAndGenerateDict(texto, maxSize);
  // Aqui temos acesso a todas as frases com todos os dicionários de probabilidade

  return stringsAndProbs;
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
    const passosObject = { minVal, maxVal, char, encodedNumber: 0 };

    let minAux = minVal;
    for (let prob of probEntries) {
      const key = prob[0];

      const value = prob[1];
      const intervalSize = maxVal - minVal;

      if (char === key) {
        minVal = minAux;
        maxVal = minAux + value * intervalSize;
        break;
      } else {
        minAux += value * intervalSize;
      }
    }
    encodedNumber = (maxVal + minVal) / 2;

    passosObject.encodedNumber = encodedNumber;
    passos.push(passosObject);
  }

  return passos;
}

export function Decodifica(inputEncoded, probabilidades) {

  function mapToObject(map) {
    let obj = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}
  let cumulativeProb = {};
  let cumulativeSum = 0.0;
  let encodedNumber = inputEncoded

  const probabilityObj = mapToObject(probabilidades);

  for (let char in probabilityObj) {
    cumulativeProb[char] = {
      lower: cumulativeSum,
      upper: cumulativeSum + probabilityObj[char],
    };
    cumulativeSum += probabilityObj[char];
  }

  console.log(cumulativeProb)

  let result = "";
  let foundChar = null;

  console.log("EncodedNumber:", encodedNumber)

  const steps = []

  const returnObj = {
    steps,
    cumulativeProb
  }

  let n = 0;
  while (true) {
    foundChar = null;
    for (let char in cumulativeProb) {
      let range = cumulativeProb[char];

      console.log(`Range of ${char}: ${range.lower} --> ${range.upper}`)

      if (encodedNumber >= range.lower && encodedNumber < range.upper) {
        foundChar = char;
        result += char;
        const nextNumber = (encodedNumber - range.lower) / (range.upper - range.lower);
        returnObj.steps.push({
          char,
          range,
          result,
          encodedNumber,
          nextNumber,
        })
        encodedNumber = nextNumber;
        
        break;
      }
    }

    if (!foundChar || foundChar === "\u0003") {
      break;
    }

    n++;
  }

  return returnObj;
}
