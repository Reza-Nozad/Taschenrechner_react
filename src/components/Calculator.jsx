import React, { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Funktion zum Hinzufügen von Zahlen und Operatoren
  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Funktion zum Löschen der Eingabe
  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  // Funktion zur Berechnung (sichere Alternative zu eval)
  const handleEqual = () => {
    try {
      if (/^[0-9+\-*/(). ]+$/.test(input) && input.trim() !== "") {
        const result = Function('"use strict"; return (' + input + ')')();
        setOutput(result);
      } else {
        setOutput("Ungültige Eingabe");
      }
    } catch (error) {
      setOutput("Fehler");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold text-center mb-4">Taschenrechner</h1>
      
      {/* Eingabe-/Ausgabebereich */}
      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-3 text-xl border rounded-md mb-2 text-right"
        />
        <div className="text-2xl text-gray-600 text-right">{output}</div>
      </div>

      {/* Tastenfeld */}
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+"].map((char) => (
          <button
            key={char}
            className="p-4 bg-gray-200 text-xl rounded hover:bg-gray-300"
            onClick={() => (char === "=" ? handleEqual() : handleButtonClick(char))}
          >
            {char}
          </button>
        ))}
        
        {/* Zusätzliche Funktionen */}
        <button
          className="col-span-2 p-4 bg-red-500 text-white text-xl rounded hover:bg-red-600"
          onClick={handleClear}
        >
          C
        </button>
      </div>
    </div>
  );
}

export default Calculator;