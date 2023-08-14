import "./App.css";
import Card from "./components/Card";

const shuffleArray = (array: Array<string>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

function App() {
  const cards = Array(10).fill("|").concat(Array(10).fill("="));
  shuffleArray(cards);
  const click = () => console.log("clicked");
  return (
    <div className="grid">
      {cards.map((card) => (
        <Card cardLabel={card} onClick={click} />
      ))}
    </div>
  );
}

export default App;
