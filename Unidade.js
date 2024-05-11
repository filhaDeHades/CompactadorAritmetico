class Unidade {
    constructor(min, max, extreme){
        this.min = min
        this.max = max
        this.maxSize = extreme
        this.val = this.defVal(min, max, extreme)
    }

    defVal(minVal, maxVal){
        let val = parseFloat((Math.random() * (maxVal - minVal) + minVal).toFixed(this.maxSize))
        console.log(val)
        return val
    }
}

let teste = new Unidade(0.25, 0.65, 30)