import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [inputVal, setInputVal] = useState("");
  console.log(inputVal);

  return (
    <>
      <button
        onClick={async () => {
          try {
            const res = await axios.get("http://localhost:3030/movies");
            console.log(res.data);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Click Me
      </button>
      <input type="text" onChange={(e) => setInputVal(e.target.value)} />
    </>
  );
}

export default App;
