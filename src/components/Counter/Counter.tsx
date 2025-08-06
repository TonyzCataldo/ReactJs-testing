import { useState } from "react";

type CounterPropsType = {
  defaultCount: number;
  description: string;
};

const Counter = ({ defaultCount, description }: CounterPropsType) => {
  const [counter, setCounter] = useState(defaultCount);
  const [modifier, setModifier] = useState(1);

  return (
    <div>
      <h1>Counter = {counter}</h1>
      <p>{description}</p>
      <label htmlFor="change value">Valor para alterar</label>
      <input
        id="change value"
        type="number"
        value={modifier}
        onChange={(e) => setModifier(Number(e.target.value))}
      ></input>
      <button
        value={counter}
        onClick={() => setCounter((prev) => prev + modifier)}
      >
        +
      </button>
      <button
        value={counter}
        onClick={() => setCounter((prev) => prev - modifier)}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
