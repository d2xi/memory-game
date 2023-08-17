import { useState, useRef } from "react";
import "./App.css";
import CardComponent, { Card, CardState } from "./components/Card/Card";

const shuffleArray = (array: Array<string>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

function prepareCards(): Card[] {
  // const cards = "abcdefghijklmnqrstuvwxyz".repeat(2).split("");
  const lables = "ab".repeat(2).split("");
  shuffleArray(lables);
  let cardId = 0;
  const cards: Card[] = lables.map((label) => ({
    id: cardId++,
    label: label,
    state: CardState.Hidden,
  }));
  return cards;
}

function App() {
  const [cards, setCards] = useState<Card[]>(prepareCards());
  const choices = useRef<number[]>([]);
  const handleClick = (id: number) => {
    let nextState = cards;
    if (choices.current.length < 2) {
      if (!choices.current.includes(id)) {
        choices.current.push(id);
        nextState = cards.map((c) => {
          if (c.id == id) {
            return {
              ...c,
              state: CardState.Selected,
            };
          } else {
            return c;
          }
        });
      }
    }
    if (choices.current.length == 2) {
      if (cards[choices.current[0]].label === cards[choices.current[1]].label) {
        nextState = cards.map((c) => {
          if (choices.current.includes(c.id)) {
            return {
              ...c,
              state: CardState.Matched,
            };
          } else {
            return c;
          }
        });
      } else {
        nextState = cards.map((c) => {
          if (choices.current.includes(c.id)) {
            return {
              ...c,
              state: CardState.Missmatched,
            };
          } else {
            return c;
          }
        });
      }
      choices.current.length = 0;
    }
    setCards(nextState);
  };
  return (
    <div className="grid">
      {cards.map((card) => (
        <CardComponent key={card.id} card={card} onClick={handleClick} />
      ))}
    </div>
  );
}

export default App;
