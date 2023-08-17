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
  const lables = "abcdefghijklmnqrstuvwxyz".repeat(2).split("");
  // const lables = "ab".repeat(2).split("");
  shuffleArray(lables);
  let cardId = 0;
  const cards: Card[] = lables.map((label) => ({
    id: cardId++,
    label: label,
    state: CardState.Hidden,
  }));
  return cards;
}

type Timer = {
  timerId: number;
  timerCallback: (card: Card[]) => void;
};
function App() {
  const [cards, setCards] = useState<Card[]>(prepareCards());
  const choices = useRef<number[]>([]);
  const timerRef = useRef<Timer | undefined>();
  const handleClick = (id: number) => {
    let nextState = cards;
    if (choices.current.length < 2) {
      if (
        cards[id].state === CardState.Hidden &&
        !choices.current.includes(id)
      ) {
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
      setCards(nextState);
    }
    if (choices.current.length == 2) {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current.timerId);
        timerRef.current.timerCallback(cards);
        timerRef.current = undefined;
      } else if (
        cards[choices.current[0]].label === cards[choices.current[1]].label
      ) {
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
        choices.current.length = 0;
        setCards(nextState);
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
        setCards(nextState);

        const hideCb = (cards: Card[]) => {
          nextState = cards.map((c) => {
            if (choices.current.includes(c.id)) {
              return {
                ...c,
                state: CardState.Hidden,
              };
            } else {
              return c;
            }
          });
          choices.current.length = 0;
          setCards(nextState);
          timerRef.current = undefined;
        };
        const timerId = setTimeout(hideCb, 1000, cards);
        timerRef.current = { timerId: timerId, timerCallback: hideCb };
      }
    }
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
