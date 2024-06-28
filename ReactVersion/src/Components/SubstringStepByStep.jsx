import React from 'react'

export default function SubstringStepByStep({item, step}) {


  function formatNumber(num){
    return parseFloat(num.toPrecision(15));
  }

  return (
        <div
            className="border border-slate-700 rounded-md p-4 w-full"
          >
            <div className="gap-4 grid grid-cols-2">
              <div className="flex-cols">
                <p className="text-2xl font-bold text-center col-span-2">
                  Substring {step}
                </p>
                <p className="text-center">{item.frase + "#"}</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-center col-span-2">Probabilidades: </p>
                {Array.from(item.probs).reverse().map(([key, value], index, array) => {

                        const keyText = key === "\u0003" ? "#" : key;
                        const adjustedNumber = array.slice(index).reduce((acc, val) => acc + val[1], 0);

                        return (
                          <p key={key + index} className="items-center">
                            <p>{formatNumber(adjustedNumber)}</p>
                            <p className='ms-4'>{`${keyText}`}</p>
                          </p>
                        );
                      })}
                        <p>0</p>
              </div>


            </div>
          </div>
  )
}
