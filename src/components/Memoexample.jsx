import React, { useMemo, useState } from "react";

function Memoexample() {
  const [dakMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(0);

  const expansiveCaluculation = useMemo(() => {
    console.log("computing expanseive calculation...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += i;
    }
    return result;
  }, []);

  const calculatValue = expansiveCaluculation;

  return (
    <div
      className={`min-h-screen p-8 ${
        dakMode ? `bg-gray-900 text-white` : `bg-white text-gray-900`
      }`}
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Counter:{count} </h2>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 "
          >
            Toggle Theme
          </button>
        </div>

        <div className="space-y-4">
          <p>Expensive Calculation Result: {calculatValue}</p>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="w-full px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Increment Conter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Memoexample;
