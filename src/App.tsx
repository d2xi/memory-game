import { useState, useRef } from "react";
import "./App.css";
import CardComponent, { Card, CardState } from "./components/Card/Card";
import GridComponent from "./components/Grid/Grid";

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

function App() {
  return (
    <>
      <div className="btn-container">
        <button className="btn-new-game" onClick={() => console.log("click")}>
          new game
        </button>
      </div>
      <div className="grid">
        <GridComponent initCards={prepareCards()} />
      </div>
    </>
  );
}

export default App;
