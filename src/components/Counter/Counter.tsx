import { useState } from "react";

type CounterPropsType = {
  defaultCount: number;
  description: string;
};

const Counter = ({ defaultCount, description }: CounterPropsType) => {
  const [counter, setCounter] = useState(defaultCount);

  return (
    <div>
      <h1>Counter = {counter}</h1>
      <p>{description}</p>
      <label htmlFor="change value">Valor para alterar</label>
      <input
        id="change value"
        type="number"
        value={counter}
        onChange={(e) => setCounter(Number(e.target.value))}
      ></input>
      <button value={counter} onClick={() => setCounter((prev) => prev + 1)}>
        +
      </button>
      <button value={counter} onClick={() => setCounter((prev) => prev - 1)}>
        -
      </button>
    </div>
  );
};

export default Counter;
