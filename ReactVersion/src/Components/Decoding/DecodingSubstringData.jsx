import React from "react";

export default function DecodingSubstringData({ encodedNumber, probsArray}) {
  function formatNumber(num) {
    return parseFloat(num.toPrecision(10));
  }

  return (
    <div className="border border-slate-700 rounded-md p-2 space-y-4 overflow-auto flex-shrink-0">
      <div>
        <section className="text-2xl text-center">
          <p className="font-bold">Número Codificado: </p>
          <p className="text-lg">{encodedNumber}</p>
        </section>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">
          Probabilidades:{" "}
        </h3>
        <div className={`grid grid-rows-6 grid-flow-col gap-x-6 w-fit text-start mx-auto`}>
          {probsArray.map(([key, value], index) => {
            let keyText = key === "\u0003" ? "#" : key;
            keyText = keyText === "\u0020" ? "SPACE" : keyText;

            return (
              <div key={key + index} className="border-l border-slate-700 p-2 flex">
                  <p className="font-bold text-xl">{keyText}</p>
                  {" = "}
                  <p className="font-semibold text-xl">
                    {formatNumber(value)}
                  </p>
              </div>
            );
          })}
        </div>
      </div>
      <section className="text-center">
                    <p className="text-lg font-bold text-center">
                      Próximo parcial:
                    </p>
                    <p className="-mb-4">(Parcial - Low)</p>
                    <p>______________</p>
                    <p>(High - Low)</p>
                  </section>
    </div>
  );
}
