import "./App.css";
import React, { useEffect, useState } from "react";
import Mostrador from "./Components/Mostrador";
import { Compactar } from "./Scripts/compactador";

function App() {
  const [maxSize, setMaxSize] = useState(8);
  const [text, setText] = useState("");
  const [step, setStep] = useState(0);
  const [stringsAndProbs, setStringsAndProbs] = useState([]);

  useEffect(() => {
    if (stringsAndProbs.length > 0) console.log(stringsAndProbs[step]);
  }, [stringsAndProbs, step]);

  const handleCompactar = () => {
    const stringsAndProbs = Compactar(text, maxSize);
    setStringsAndProbs(stringsAndProbs);
  };

  const handleNext = () => {
    const nextStep = step + 1;
    if (nextStep < stringsAndProbs.length) {
      setStep(nextStep);
    }
  };

  const handlePrevious = () => {
    const previousStep = step - 1;
    if (previousStep >= 0) {
      setStep(previousStep);
    }
  };

  const handleChangeMaxSize = (e) => {
    const newSize = parseInt(e.target.value);
    if (newSize < 1) return;
    if (newSize > 13) return;
    setMaxSize(newSize);
  };

  const handleLimpar = () => {
    setText("");
    setStringsAndProbs([]);
    setStep(0);
  };

  return (
    <div className="flex items-center flex-col p-8">
      <h1 className="text-4xl font-bold">Compactador Aritimético</h1>
      <div className="flex space-x-4 mx-auto items-center">
        <label htmlFor="text-input">Texto:</label>
        <input
          id="text-input"
          type="text"
          placeholder="Digite o texto para compactar..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="my-4 border border-slate-500 rounded-lg py-1 px-2 w-6/12"
        />
        <label htmlFor="max-size-input">Tamanho máximo da substring:</label>
        <input
          id="max-size-input"
          type="number"
          placeholder="Tamanho máximo da string"
          value={maxSize}
          onChange={handleChangeMaxSize}
          className="my-4 border border-slate-500 rounded-lg py-1 px-2 w-2/12"
        />
      </div>
      <div className="flex space-x-8">
        <button
          className="bg-slate-700 text-white p-2 rounded-md font-bold"
          onClick={handleCompactar}
        >
          Compactar
        </button>
        <button
          className="border border-slate-700 p-2 rounded-md font-bold text-slate-700"
          onClick={handlePrevious}
        >
          Substring Anterior
        </button>
        <button
          className="border border-slate-700 p-2 rounded-md font-bold text-slate-700"
          onClick={handleNext}
        >
          Próxima Substring
        </button>
        <button
          className="bg-slate-700 text-white p-2 rounded-md font-bold"
          onClick={handleLimpar}
        >
          Limpar
        </button>
      </div>
      <Mostrador step={step} stringsAndProbs={stringsAndProbs} />
    </div>
  );
}

export default App;
