import React, { useState } from "react";
import SubstringStepByStep from "./SubstringStepByStep";
import Passo from "./Passo";
import { Codifica } from "../Scripts/compactador";

export default function Mostrador({ step, stringsAndProbs }) {
  const [index, setIndex] = useState(0);

  if (!stringsAndProbs || stringsAndProbs.length === 0) return null;

  const codifiedSteps = Codifica(
    stringsAndProbs[step].frase,
    stringsAndProbs[step].probs
  );
  const probsArray = Array.from(stringsAndProbs[step].probs);


  function formatNumber(num) {
    return parseFloat(num.toPrecision(15));
  }

  function handleNextStep() {
    if (index < codifiedSteps.length - 1) {
      setIndex(index + 1);
    }
  }

  function handlePreviousStep() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }



  return (
    <div className="my-4 w-10/12">
      <div className="border border-slate-700 rounded-md p-4 flex space-x-2 overflow-auto">
        <SubstringStepByStep frase={stringsAndProbs[step].frase} probsArray={probsArray} step={step} codifiedString={codifiedSteps[codifiedSteps.length -1].encodedNumber}/>


        {codifiedSteps.length > 0 &&
        (codifiedSteps.map((passo, i) => 
          <Passo key={"codifiedStep+i"} index={i} passo={passo} probsArray={probsArray}></Passo>
        
        ))}
      </div>
    </div>
  );
}
