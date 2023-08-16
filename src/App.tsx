import { useState, useRef } from "react";
import "./App.css";
import CardComponent, { Card } from "./components/Card/Card";

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

function flipHandler(first: Card, second: Card): () => void {
  return () => {
    first.hide();
    second.hide();
  };
}

type TimerObject = {
  timerId: number;
  timerCallback: () => void;
};

function App() {
  const [cards] = useState<string[]>(initBoard());
  const [firstChoice, setFirstChoice] = useState<Card | undefined>();
  const timerRef = useRef<TimerObject | undefined>();
  const numberMatchedPairsRef = useRef<number>(0);
  const totalNumberPairs = cards.length / 2;
  const incrementNumberMatchedPairs = () => {
    numberMatchedPairsRef.current += 1;
  };
  const handleClick = (choice: Card) => {
    if (timerRef.current != undefined) {
      clearTimeout(timerRef.current.timerId);
      timerRef.current.timerCallback();
      timerRef.current = undefined;
    }
    if (firstChoice === undefined) {
      setFirstChoice(choice);
    } else if (firstChoice.getLabel() === choice.getLabel()) {
      firstChoice.matched();
      choice.matched();
      setFirstChoice(undefined); // do not like the usage of "undefined" -> check Optionals or something
      incrementNumberMatchedPairs();
      if (numberMatchedPairsRef.current === totalNumberPairs) {
        alert("Wohoom! You won!");
      }
    } else {
      firstChoice.missmatched();
      choice.missmatched();
      const flip = flipHandler(firstChoice, choice);
      const timerId = setTimeout(flip, 1000);
      timerRef.current = { timerId: timerId, timerCallback: flip };
      setFirstChoice(undefined);
    }
  };
  return (
    <div className="grid">
      {cards.map((card, index) => (
        <CardComponent key={index} cardLabel={card} onClick={handleClick} />
      ))}
    </div>
  );
}

export default App;
