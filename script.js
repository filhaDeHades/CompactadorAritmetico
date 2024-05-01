const maxSize = 30
const textField = document.getElementById("texto")
const outputField = document.getElementById("output-field")
const outputFrasesField = document.getElementById("frases-divididas")

let listas = [] //input já separado em listas
let tabela //tabela de probabilidades

console.log("Compactador Aritimético carregado.")

//Recebe o input do formulário
function GetInput() {
    return textField.value
}


function ClearOutputField() {
    while(outputFrasesField.childElementCount > 1) {
        outputFrasesField.removeChild(outputFrasesField.lastChild)
    }
}

//Coordena o processo de compactação
function HandleCompactar() {
    const texto = GetInput()
    const treatedText = SplitAndGenerateDict(texto)
    // Aqui temos acesso a todas as frases com todos os dicionários de probabilidade
    console.log(treatedText)
    //Compacta(treatedText[0].frase, treatedText[0].probs)

    treatedText.forEach((item) => {
        let div = document.createElement("div")
        let p = document.createElement("p")
        let pre = document.createElement("pre")
        p.textContent = item.frase
        pre.textContent = JSON.stringify(item.probs, null, 2)
        div.appendChild(p)
        div.appendChild(pre)
        outputFrasesField.appendChild(div)
    })
}


//Coordena o processo de descompactação
function HandleDescompactar() {
    
}


//Acha a probabilidade dos caracteres aparecerem para cada lista
function FindProbabilites(frase) {
    const probs = {}
    for(let char of frase) {
        if (probs[char]){
            probs[char]++
        } else {
            probs[char] = 1
        }
        console.log(probs[char])
    }

    for(let char in probs){
        probs[char] /= frase.length
    }

    return probs
}

//Verifica se o input e <= o tamanho máximo e, caso contrário separa em listas menores
function VerifyAndSplitInput(frase){
    const qtd = frase.length
    const tempFrase = frase
    const lista = []

    while(tempFrase){
        if (qtd < maxSize){
            //add ao array final
        } else if ((qtd > maxSize) && (qtd < maxSize*2)){
            //Divide na metade e add ao array final
        } else {
            //Retira do array a quantidade máxima e add ao array final
        }
        //return lista
    }
}


function SplitAndGenerateDict(string) {
    // Tipagem da lista:
    // [
    //     {frase, probs}
    // ]
    const lista = []

    for(let i = 0; i<string.length; i += maxSize){
        const frase = string.substring(i, i + maxSize)+"\u0003"
        const probs = FindProbabilites(frase)
        
        lista.push({frase, probs})
    }


    return lista
}

function Compacta(termo, lista){
    let maxVal = 1
    let minVal = 0
    let tempProb = []
    let number
    for(let car of termo){
        tempProb.push(minVal)
        for(let carac of termo){
            tempProb.push(lista[carac]+tempProb[tempProb.length - 1])
            //Verificar o próximo intervalo e ajustar as variaveis minVal e maxVal de acordo
        }
        tempProb = []
        // Final
        number = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
    }
}
