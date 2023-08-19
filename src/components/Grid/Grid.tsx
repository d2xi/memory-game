import { useState, useRef, useEffect } from "react";
import "./Grid.css";
import CardComponent, { Card, CardState } from "../Card/Card";

type Timer = {
  timerId: number;
  timerCallback: (card: Card[]) => void;
};
interface GridComponentProps {
  initCards: Card[];
  onWinner: () => void;
  onFirstSelection: () => void;
}

function GridComponent({
  initCards,
  onWinner,
  onFirstSelection,
}: GridComponentProps) {
  const gameIsActiveRef = useRef<boolean>(false);
  const [cards, setCards] = useState<Card[]>(initCards);
  useEffect(() => {
    setCards(initCards);
  }, [initCards]);
  const pairsLeftRef = useRef(initCards.length / 2);
  const choices = useRef<number[]>([]);
  const timerRef = useRef<Timer | undefined>();
  const handleClick = (id: number) => {
    let nextState = cards;
    if (!gameIsActiveRef.current) {
      onFirstSelection();
      gameIsActiveRef.current = true;
    }
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
        pairsLeftRef.current -= 1;
        if (pairsLeftRef.current == 0) {
          console.log("You won");
          onWinner();
        }
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
