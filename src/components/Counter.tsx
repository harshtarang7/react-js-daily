import { useState } from "react";

export const Counter = () => {
  let [counter, setCounter] = useState(0);

  const handleIncrement =()=>{
    setCounter(prev=>prev+1)
  }

  return (
    <>
      <h1 style={{ textAlign: "center" ,marginTop:'2rem'}}> this is counter page </h1>
      <div
        style={{
          display: "flex",
          width: "20%",
          margin: "auto",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop:'2rem'
        }}
      >
        <button
          style={{ fontSize: 40, padding: 6 }}
          onClick={() => setCounter(counter - 1)}
        >
          -
        </button>
        <span style={{ fontSize: 40 }}>{counter}</span>
        <button
          style={{ fontSize: 40, padding: 6 }}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <button onClick={()=>setCounter(0)}>Reset</button>
    </>
  );
};
