const maxSize = 10
let form = document.getElementById("formulario")
let listas = [] //input já separado em listas
let tabela //tabela de probabilidades

//Coordena o processo de compactação
function HandleCompactar(params) {
    texto = GetInput(form)
    //console.log(texto)
    ArrayTexto = VerifyAndSplitInput(texto)
}


//Coordena o processo de descompactação
function HandleDescompactar(params) {
    
}

//Recebe o input do formulário
function GetInput(formulario) {
    texto = formulario.getElementById("texto").value
    return texto
}

//Verifica se o input e <= o tamanho máximo e, caso contrário separa em listas menores
function VerifyAndSplitInput(frase){
    qtd = frase.length
    tempFrase = frase
    lista = []

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

//Acha a probabilidade dos caracteres aparecerem para cada lista
function FindProbabilites(params) {
    
}