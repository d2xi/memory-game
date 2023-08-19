import React, { useRef, useState } from "react";
import "./App.css";
import { Card, CardState } from "./components/Card/Card";
import GridComponent from "./components/Grid/Grid";
import StopwatchComponent, {
  StopwatchControls,
} from "./components/Stopwatch/Stopwatch";

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
  const lables = "abc".repeat(2).split("");
  // const lables = "我你他是的在现在时间工作习学校天电影音乐食物旅行"
  //   .repeat(2)
  //   .split("");
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

function App() {
  const [cards, setCards] = useState(prepareCards());
  const [isWon, setIsWon] = useState<boolean>(false);
  const stopwatchControlsRef = useRef<StopwatchControls>();
  const gameRef = useRef<number>(0);
  const handleWin = () => {
    setIsWon(true);
    stopwatchControlsRef.current?.stop();
  };
  const handleNewGameButtonClick = () => {
    setCards(prepareCards());
    setIsWon(false);
    gameRef.current += 1;
  };
  const handleFirstSelection = () => {
    stopwatchControlsRef.current?.start();
  };
  const getStopwatchControls = (controls: StopwatchControls) => {
    stopwatchControlsRef.current = controls;
  };
  return (
    <>
      <div className="display-container">
        <button className="btn-new-game" onClick={handleNewGameButtonClick}>
          new game
        </button>
        <StopwatchComponent
          key={"swc" + gameRef.current}
          onInit={getStopwatchControls}
        />
        {isWon && <div>"Woohoo! Your win!"</div>}
      </div>
      <GridComponent
        key={"gc" + gameRef.current}
        initCards={cards}
        onFirstSelection={handleFirstSelection}
        onWinner={handleWin}
      />
    </>
  );
}

export default App;
