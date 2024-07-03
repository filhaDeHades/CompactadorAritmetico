import React from "react";
import SubstringData from "./Encoding/SubstringData";
import Passo from "./Encoding/Passo";
import { Codifica, Decodifica } from "../Scripts/compactador";
import DecodingSubstringData from "./Decoding/DecodingSubstringData";

export default function Mostrador({ step, stringsAndProbs }) {
  if (!stringsAndProbs || stringsAndProbs.length === 0) return null;

  const codifiedSteps = Codifica(
    stringsAndProbs[step].frase,
    stringsAndProbs[step].probs
  );
  const probsArray = Array.from(stringsAndProbs[step].probs);

  const decodedSteps = Decodifica(
    codifiedSteps[codifiedSteps.length - 1].encodedNumber,
    stringsAndProbs[step].probs
  );

  console.log("DecodedSteps:", decodedSteps);

  return (
    <div className="my-4 w-10/12 space-y-2">
      <div className="border border-slate-700 rounded-md p-4 flex space-x-2 overflow-auto">
        <SubstringData
          frase={stringsAndProbs[step].frase}
          probsArray={probsArray}
          step={step}
          codifiedString={codifiedSteps[codifiedSteps.length - 1].encodedNumber}
        />

        {codifiedSteps.length > 0 &&
          codifiedSteps.map((passo, i) => (
            <Passo
              key={"codifiedStep" + i}
              index={i}
              passo={passo}
              probsArray={probsArray}
            ></Passo>
          ))}
      </div>
      <div className="border border-slate-700 rounded-md p-4 flex space-x-2 overflow-auto">
        <DecodingSubstringData
          probsArray={probsArray}
          encodedNumber={codifiedSteps[codifiedSteps.length - 1].encodedNumber}
        />

        {decodedSteps.steps.length > 0 &&
          decodedSteps.steps.map((passo, i) => {
            return (
              <div
                key={passo.encodedNumber + i}
                className="border border-slate-700 rounded-md p-4 flex flex-col"
              >
                <div className="flex h-full text-center mx-auto">
                  <div className="flex flex-col justify-between">
                    {Array.from(Object.entries(decodedSteps.cumulativeProb))
                      .toReversed()
                      .map(([key, value], index, array) => {
                        const upper =
                          index === 0 ? value.upper.toPrecision(8) : null;
                        const lower = value.lower.toPrecision(8);

                        const keyText = key === "\u0003" ? "#" : key;

                        const isCharInInterval =
                          passo.encodedNumber >= value.lower &&
                          passo.encodedNumber < value.upper;

                        return (
                          <>
                            <p>{upper}</p>
                            <p
                              className={`${
                                isCharInInterval
                                  ? "text-green-600 font-bold text-2xl"
                                  : "text-slate-600"
                              }`}
                            >
                              {keyText}
                            </p>
                            <p>{lower}</p>
                          </>
                        );
                      })}
                  </div>
                </div>

                <section >
                  <p className="text-lg font-bold text-center">Numero Parcial:</p>{" "}
                  <p>{passo.encodedNumber.toPrecision(10)}</p>
                </section>
                <section>
                  <p className="text-lg font-bold text-center">
                    Próximo parcial:
                  </p>
                  <p>(Parcial - Low) / (High - Low)</p>
                </section>
              </div>
            );
          })}
      </div>
    </div>
  );
}
