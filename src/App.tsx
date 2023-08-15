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
  const cards = "abcdefghijklmnqrstuvwxyz".repeat(2).split("");
  // const cards = "ab".repeat(2).split("");
  shuffleArray(cards);
  return cards;
}
function flipHandler(first: ICard, second: ICard): () => void {
  return () => {
    first.hide();
    second.hide();
  };
}

type TimerObject = {
  timerId: number;
  callback: () => void;
};

function App() {
  const [cards] = useState<string[]>(initBoard());
  const [firstChoice, setFirstChoice] = useState<ICard | undefined>();
  const [timer, setTimer] = useState<TimerObject | undefined>();

  const handleClick = (choice: ICard) => {
    console.log(firstChoice);
    if (timer != undefined) {
      clearTimeout(timer.timerId);
      timer.callback();
      setTimer(undefined);
    }
    if (firstChoice === undefined) {
      setFirstChoice(choice);
    } else if (firstChoice.getLabel() === choice.getLabel()) {
      firstChoice.matched();
      choice.matched();
      setFirstChoice(undefined); // do not like the usage of "undefined" -> check Optionals or something
    } else {
      firstChoice.missmatched();
      choice.missmatched();
      const flip = flipHandler(firstChoice, choice);
      const timerId = setTimeout(flip, 1000);
      setTimer({ timerId: timerId, callback: flip });
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
