import { useEffect, useState } from "react";

function App() {
  const [printing, setprinting] = useState(false);

  useEffect(() => {
    if (printing) {
      window.print();
    }
  }, [printing]);

  return (
    <div>
      {printing ? (
        <div dir="rtl" className="w-screen h-screen p-12 bg-slate-300">
          <div className="flex justify-between">
            <span>logo</span>
            <span>brand name</span>
            <span>1400/1/1</span>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setprinting(true);
            }}
          >
            print
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
