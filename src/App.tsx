import Counter from "./components/Counter/Counter";

function App() {
  return (
    <>
      <div>
        <Counter defaultCount={0} description="description by props" />
      </div>
    </>
  );
}

export default App;
