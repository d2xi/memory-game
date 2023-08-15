import { useState } from "react";
import "./App.css";
import Card, { ICard } from "./components/Card";

const shuffleArray = (array: Array<string>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

function initBoard(): string[] {
  // const cards = "abcdefghijklmnqrstuvwxyz".repeat(2).split("");
  const cards = "ab".repeat(2).split("");
  shuffleArray(cards);
  return cards;
}

function App() {
  const [cards] = useState<string[]>(initBoard());
  const [firstChoice, setFirstChoice] = useState<ICard>();

  const handleClick = (card: ICard) => {
    console.log(firstChoice);
    if (firstChoice === undefined) {
      setFirstChoice(card);
    } else if (firstChoice.getLabel() === card.getLabel()) {
      firstChoice.foundMatch();
      card.foundMatch();
      setFirstChoice(undefined); // do not like the usage of "undefined" -> check Optionals or something
    } else {
      firstChoice.hide();
      card.hide();
      setFirstChoice(undefined);
    }
  };
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <Card key={index} cardLabel={card} onClick={handleClick} />
      ))}
    </div>
  );
}

export default App;
