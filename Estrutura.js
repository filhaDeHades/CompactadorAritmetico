class Estrutura {
    constructor(termo, frase, maxSize){
        this.termo = termo //String original
        this.frase = frase //String a ser codificada
        this.tabela = {} //Map das probabilidades
        this.maxNumberSize = maxSize
        this.codifica = [] //Array da classe Unidade
        this.codificaArray = 0
        this.codificado = 0.0
        this.decodifica = [] //Array da classe Unidade
        this.decodificaArray = 0
        this.decodificado = ''
    }

    //TODO tabela de probabilidades
    createTable() {
        let probs = {};
        for (let char of this.frase) {
            if (probs[char]) {
            probs[char]++;
            } else {
            probs[char] = 1;
            }
        }
        
        for (let char in probs) {
            probs[char] /= this.frase.length;
        }

        //Ordena as probabilidades
        const sortedEntries = Object.entries(probs).sort((a, b) => b[1] - a[1]);
        probs = new Map(sortedEntries);
        
        this.tabela = probs;
        console.log('Tabela: ')
        for (const [key, item] of this.tabela) {
            console.log(key +" : "+ item)
        }
        console.log()
    }

    addUnidade(tipo, carac, min, max, extreme){
        let unidade = new Unidade(carac, min, max, extreme)
        if(tipo){
            this.codificaArray = this.codifica.push(unidade)
        } else {
            this.decodificaArray = this.decodifica.push(unidade)
        }
    }

    codificacao(){
        // Intervalo superior da probabilidade
        let maxVal = 1.0;
        // Intervalo inferior da probabilidade
        let minVal = 0.0;

        let probEntries = Array.from(this.tabela.entries());
        for (let char of this.frase) {
            let minAux = minVal

            for (let prob of probEntries) {
                const probCoeficient = maxVal - minVal;
                //console.log(`ProbCoeficient is: ${probCoeficient}`);
                if (char === prob[0]) {
                  minVal = minAux;
                  maxVal = minAux + (prob[1]*probCoeficient);

                  this.addUnidade(true, char, minVal, maxVal, this.maxNumberSize)

                  //console.log(`Char ${char} === ${prob[0]}. \n minVal = ${minVal} | maxVal = ${maxVal}`);
                  break;

                } else {
                    minAux += (prob[1]*probCoeficient);
                    //console.log(`Char ${char} !== ${prob[0]}. \n MinAux = ${minAux}`);
                }
              }
        }
        this.codificado = this.codifica[this.codificaArray-1].val
    }

    codificaFinalValue(){
        console.log("Frase codificada 2: " + this.codificado)
    }

    decodificaFinalValue(){
        console.log("Frase Decodificada: " + this.decodificado)
    }


    decodificacao(){
        let stringCodif = this.codificado.toString()
        let tamanho = stringCodif.length - 2
        console.log('String: ' + stringCodif + ' tamanho: ' + tamanho)

        let stringDecodif = ''

        let min = 0.0
        let max = 1.0
        let valores = []
        let caracteres = []
        for (const [key, item] of this.tabela) {
            caracteres.push(key)
            valores.push(item)
        }
        console.log('Caracteres: '+caracteres + '\nValores: '+valores)

        let continua = true
        
        while(continua){
            let intervalos = []
            intervalos.push(min)
            let diferenca = max - min
            let temp = min
            for(let j=0; j<this.tabela.size-1;j++){ //Completo
                let novo = valores[j]*diferenca + temp
                temp = novo
                intervalos.push(novo)
            }
            intervalos.push(max)
            console.log('intervalos: '+ intervalos)

            for(let j = 0; j<intervalos.length-1;j++){
                if(this.codificado > intervalos[j] && this.codificado < intervalos[j+1]){
                    stringDecodif += caracteres[j]
                    min = intervalos[j]
                    max = intervalos[j+1]
                    console.log('\n\nCaracter atual: '+caracteres[j]+' Ultimo caracter: '+caracteres[caracteres.length-1]+'\n\n')

                    this.addUnidade(false,caracteres[j],min,max,this.maxNumberSize)

                    if(caracteres[j] === caracteres[caracteres.length-1]){
                        continua = false
                    }
                    break
                }
            }
            this.decodificado = stringDecodif.substring(0, stringDecodif.length - 1)
            console.log(stringDecodif)
            
        }
    }
    // decodificacao(){
    //     //Pega lista de probabilidades
    //     //Max e min inicial = 1.0 e 0.0
    //     let max = 1.0
    //     let min = 0.0
    //     let valCodificado = this.codificado
    //     console.log(valCodificado)
    //     //codificaTemp -> Valor temporário da frase codificada para cada iteração
    //     let codificaTemp = ''
    //     //caracterProv -> Valor temporario do caracter decodificado (começa com primeiro caracter da lista de probabilidades)
    //     let caracterProv = ''
    //     //decodificado -> frase decodificada
    //     let decodificado = ''
    //     //Cada iteracao de um for representa um caracter codificado
        
    //     while  (!decodificado.includes('\u0003')){
    //         let somaProb = min
    //         for (const [key, item] of this.tabela) {
    //             console.log('teste2')
    //             let probAtual = item
    //             console.log('item: ' + probAtual)
    //             if (probAtual < max) {
    //                 console.log('somaProb: ' + somaProb + ' intervalo: ' + (somaProb + (max - min)*probAtual))
    //                 if (valCodificado <= somaProb + (max - min)*probAtual){
    //                     decodificado += key
    //                     max = somaProb + (max - min)*probAtual
    //                     console.log('Decodificado: ' + decodificado)
    //                 } else {
    //                     somaProb += (max-min)*probAtual
    //                     min += (max-min)*probAtual
    //                     console.log('SOMAPROB : ' + somaProb)
    //                 }
    //             }
    //         }
    //     }
            
    //     console.log(decodificado)
    //         //for probAtual < max -->
    //             //if letter >= min +  min*probAtual --> min += min*probAtual
    //             //else --> caracterProv = lista de Probabilidades[probAtualIndex + 1]
    // }
}

// let teste2 = new Estrutura('midia', ['lista'])
// teste2.addUnidade(true, 't', 0.25, 0.65, 30)
// teste2.addUnidade(true, 'a', 0.34, 0.55, 30)
// teste2.codificaFinalValue()