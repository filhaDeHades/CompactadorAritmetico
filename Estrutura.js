class Estrutura {
    constructor(termo, frase, maxSize){
        this.termo = termo //String original
        this.frase = frase //String a ser codificada
        this.tabela = {} //Map das probabilidades
        this.maxNumberSize = maxSize
        this.codifica = [] //Array da classe Unidade
        this.codificaArray = 0
        this.codificado = 0.0
        //this.decodifica = [] //Array da classe Unidade
        //this.decodificaSize = 0
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
        this.tabela.entries().forEach((item) => {
            console.log(item[0]+" : "+item[1])
        })
    }

    addUnidade(tipo, carac, min, max, extreme){
        let unidade = new Unidade(carac, min, max, extreme)
        if(tipo){
            this.codificaArray = this.codifica.push(unidade)
        } else {
            this.decodificaSize = this.decodifica.push(unidade)
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
    }

    codificaFinalValue(){
        this.codificado = this.codifica[this.codificaArray-1].val
        console.log("Frase codificada 2: " + this.codificado)
    }

    decodificaFinalValue(){
        //console.log(this.decodifica[this.decodificaSize-1].val)
    }
}

// let teste2 = new Estrutura('midia', ['lista'])
// teste2.addUnidade(true, 't', 0.25, 0.65, 30)
// teste2.addUnidade(true, 'a', 0.34, 0.55, 30)
// teste2.codificaFinalValue()