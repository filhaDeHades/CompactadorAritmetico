import React from 'react'

export default function Passo({index, probsArray, passo }) {

    const rangeMultiplier = passo.maxVal - passo.minVal;
  
    const indexOfChar = probsArray.findIndex(
      ([key, value]) => key === passo.char
    );

    function formatNumber(num) {
        // return parseFloat(num.toPrecision(15));
        return num
      }

  const barHeight = 100 / probsArray.length;
  const barBottom = barHeight * indexOfChar;

  return (
    <div className="border border-slate-700 rounded-md p-4">
          <p className="text-2xl font-bold text-center col-span-2">
            Passo {index + 1}
          </p>
          <div className="flex space-x-2">
            <div className="bg-slate-600 w-6 relative">
              <div
                className={`w-full bg-green-500 z-10 absolute`}
                style={{
                  bottom: `${barBottom}%`,
                  height: `${barHeight}%`
                  // height: `${
                  //   (100 * (2 * indexOfChar + 1.5)) /
                  //   (probsArray.length * 2 + 1)
                  // }%`,
                }}
              ></div>
            </div>
            <div>
              {probsArray.toReversed().map(([key, value], index, array) => {
                const keyText = key === "\u0003" ? "#" : key;
                const adjustedValue =
                  array.slice(index).reduce((acc, val) => acc + val[1], 0) *
                    rangeMultiplier +
                  passo.minVal;

                const isCurrentChar = key === passo.char;
                const isNextChar = array[index - 1]?.[0] === passo.char;

                return (
                  <div key={key + index} className="items-center">
                    <p className={`
                      ${isCurrentChar || isNextChar
                        ? "font-bold text-xl text-blue-500"
                        : "font-semibold text-slate-500"}
                      `}>{formatNumber(adjustedValue)}</p>
                    <p
                      className={`ms-4 ${
                        isCurrentChar
                          ? "font-bold text-3xl underline text-green-500"
                          : "text-lg font-semibold text-slate-500"
                      }`}
                    >
                      {keyText}
                    </p>
                    {index === array.length - 1 && (<p className={`
                      ${isCurrentChar
                        ? "font-bold text-xl text-blue-500"
                        : "font-semibold text-slate-500"}
                      `}>{formatNumber(passo.minVal)}</p>)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  )
}
