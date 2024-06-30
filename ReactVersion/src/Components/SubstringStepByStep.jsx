import React from "react";

export default function SubstringStepByStep({ frase, probsArray, step, codifiedString }) {
  function formatNumber(num) {
    return parseFloat(num.toPrecision(10));
  }

    const ogTextSize = frase.length * 8;
    const compactedSize = 64;

    const probsSize = probsArray.length * (8 + 64);

    const sizes ={
      originalSize: ogTextSize,
      compactedSize: compactedSize,
      ratio: ogTextSize / compactedSize,
      dictionarySize: probsSize,
    }

  return (
    <div className="border border-slate-700 rounded-md p-2 space-y-4 overflow-auto flex-shrink-0">
      <div>
        <p className="text-2xl text-center">
          <h3 className="font-bold">Substring {step + 1}</h3>
          <p className="text-center break-all">{frase + "#"}</p>
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">
          Probabilidades:{" "}
        </h3>
        <div className={`grid grid-rows-6 grid-flow-col gap-x-6 w-fit text-start mx-auto`}>
          {probsArray.map(([key, value], index, array) => {
            let keyText = key === "\u0003" ? "#" : key;
            keyText = keyText === "\u0020" ? "SPACE" : keyText;

            return (
              <div key={key + index} className="border-l border-slate-700 p-2 whitespace-nowrap">
                  <bold className="font-bold text-xl">{keyText}</bold>
                  {" = "}
                  <bold className="font-semibold text-xl">
                    {formatNumber(value)}
                  </bold>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">
          String Codificada:</h3> 
          <p className="text-center break-all">{codifiedString}</p>
          <p className="text-center break-all text-sm text-slate-600">Ou qualquer valor dentro do último intervalo</p>
          <p>Tamanho original: {sizes.originalSize}</p>
          <p>Tamanho compactado: {sizes.compactedSize}</p>
          <p>Razão de compressão: {sizes.ratio}</p>

      </div>
    </div>
  );
}
