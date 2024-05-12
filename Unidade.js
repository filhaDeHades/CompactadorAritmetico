class Unidade {
    constructor(carac, min, max, extreme){
        this.carac = carac //Caracter
        this.min = min //Float
        this.max = max // Float
        this.maxSize = extreme //Tamanho máximo de ponto fluante
        this.val = this.defVal(min, max, extreme) //Valor da letra
    }

    defVal(minVal, maxVal){
        let val = parseFloat((Math.random() * (maxVal - minVal) + minVal).toFixed(this.maxSize))
        //console.log(val)
        return val
    }
}

//let teste = new Unidade('t', 0.25, 0.65, 30)