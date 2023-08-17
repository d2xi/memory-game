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
  // const lables = "abcdefghijklmnqrstuvwxyz".repeat(2).split("");
  const lables = "我你他是的在现在时间工作习学校天电影音乐食物旅行"
    .repeat(2)
    .split("");
  // const lables =
  //   "我你他是的在现在时间工作学习学校天气电影音乐食物旅行朋友家人爱情健康快乐成长梦想希望成功"
  //     .repeat(2)
  //     .split("");
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
    <>
      <div className="btn-container">
        <button className="btn-new-game" onClick={() => console.log("click")}>
          new game
        </button>
      </div>
      <div className="grid">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}

export default App;
