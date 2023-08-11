import "./App.css";
import Card from "./components/Card";

function App() {
  const cards = Array(24).fill("X");
  return (
    <div className="grid">
      {cards.map((card) => (
        <Card cardLabel={card} />
      ))}
    </div>
  );
}

export default App;
