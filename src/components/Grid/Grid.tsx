import { useState, useRef, useEffect } from "react";
import "./Grid.css";
import CardComponent, { Card, CardState } from "../Card/Card";

type Timer = {
  timerId: number;
  timerCallback: (card: Card[]) => void;
};
interface GridComponentProps {
  initCards: Card[]; // Replace YourCardType with the actual type of your cards
}

function GridComponent({ initCards }: GridComponentProps) {
  const [cards, setCards] = useState<Card[]>(initCards);
  useEffect(() => {
    setCards(initCards);
  }, [initCards]);
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
        // timer is set -> 2 cards are opened
        clearTimeout(timerRef.current.timerId);
        timerRef.current = undefined;

        nextState = nextState.map((c) => {
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

        if (nextState[id].state !== CardState.Matched) {
          choices.current.push(id);
          nextState = nextState.map((c) => {
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

        const hideCb = (currentState: Card[]) => {
          // cards is passed as argument - not the same as above
          nextState = currentState.map((c) => {
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

        const timerId = setTimeout(hideCb, 1500, cards);
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

export default GridComponent;
