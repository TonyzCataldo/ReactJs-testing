import { useEffect, useState } from "react";

type CounterPropsType = {
  defaultCount: number;
  description: string;
};

const Counter = ({ defaultCount, description }: CounterPropsType) => {
  const [counter, setCounter] = useState(defaultCount);
  const [modifier, setModifier] = useState(1);
  const [isBigger, setIsBigger] = useState(defaultCount >= 15);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    setAtualizando(true);
    const timeout = setTimeout(() => {
      setIsBigger(counter >= 15);
      setAtualizando(false);
    }, 900);

    return () => clearTimeout(timeout); // limpa timeout se `counter` mudar antes dos 500ms
  }, [counter]);

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
        onClick={() =>
          setTimeout(() => setCounter((prev) => prev - modifier), 500)
        }
      >
        -
      </button>
      {atualizando ? (
        <p>atualizando...</p>
      ) : isBigger ? (
        <p>valor é grande</p>
      ) : (
        <p>valor nao é grande</p>
      )}
    </div>
  );
};

export default Counter;
