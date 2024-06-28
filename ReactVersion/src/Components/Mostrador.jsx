import React from "react";
import SubstringStepByStep from "./SubstringStepByStep";
import { Codifica } from "../Scripts/compactador";

export default function Mostrador({ step, stringsAndProbs }) {
  if (!stringsAndProbs) return null;
  if (stringsAndProbs.length === 0) return null;


  const codified = Codifica(stringsAndProbs[step].frase, stringsAndProbs[step].probs);

  function formatNumber(num){
    return parseFloat(num.toPrecision(15));
  }

  return (
    <div className="my-4 w-6/12 space-y-2">
      {<SubstringStepByStep item={stringsAndProbs[step]} step={step} />}
      {codified.map(
        (passo, index) => {
          const rangeMultiplier = passo.maxVal - passo.minVal;
          const probsArray = Array.from(stringsAndProbs[step].probs);

          const indexOfChar = probsArray.findIndex(([key, value]) => key === passo.char);

          return (
            <div
              key={index}
              className="border border-slate-700 rounded-md p-4 flex"
            >
              <div>
                <p className="text-2xl font-bold text-center col-span-2">
                  Probabilidades:
                  <p>{indexOfChar}</p>
                  <p>{10* (2*indexOfChar+1)/2}</p>
                </p>
                <div className="flex space-x-2">
                  <div className="bg-slate-600 w-6 relative">
                    <div
                      className={`w-full bg-green-500 z-10 absolute bottom-0`}
                      style={{
                        height: `${((2*indexOfChar+1)/2) * (100/probsArray.length)}%`
                      }}
                    ></div>
                  </div>
                  <div>
                    {probsArray
                      .reverse()
                      .map(([key, value], index, array) => {
                        const keyText = key === "\u0003" ? "#" : key;
                        const adjustedValue = ((array.slice(index).reduce((acc, val) => acc + val[1], 0)*rangeMultiplier) + passo.minVal);

                        return (
                          <p key={key + index} className="items-center">
                            <p>{formatNumber(adjustedValue)}</p>
                            <p className="ms-4">{keyText}</p>
                          </p>
                        );
                      })}

                    <p className="flex items-center">
                        <p>{formatNumber(passo.minVal)}</p>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col min-w-fit mx-auto bg-pink-300">
                <p className="text-2xl font-bold">Passo {index}</p>
                <p>Char: {passo.char === "\u0003" ? "#" : passo.char}</p>
                <p>Max: {formatNumber(passo.maxVal)}</p>
                <p>Min: {formatNumber(passo.minVal)}</p>
                <p>Código: {formatNumber(passo.encodedNumber)}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
