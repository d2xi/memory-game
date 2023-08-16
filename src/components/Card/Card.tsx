import { useState } from "react";
import "./Card.css";
export interface Card {
  getLabel: () => string;
  hide: () => void;
  missmatched: () => void;
  matched: () => void;
}

export interface CardProps {
  cardLabel: string;
  onClick: (card: Card) => void;
}

enum CardState {
  Matched = "matched",
  Missmatched = "missmatched",
  Hidden = "hidden",
  Selected = "selected",
}

function getCardStyle(cardSate: CardState) {
  let cardStyle = "card";
  switch (cardSate) {
    case CardState.Matched:
      cardStyle = "card matched";
      break;
    case CardState.Missmatched:
      cardStyle = "card missmatched";
      break;
    case CardState.Selected:
      cardStyle = "card";
      break;
  }
  return cardStyle;
}

export default function CardComponent({ cardLabel, onClick }: CardProps) {
  const [cardSate, setCardState] = useState<CardState>(CardState.Hidden);
  let curretCardState: CardState = cardSate;
  const card: Card = {
    getLabel: () => cardLabel,
    hide: () => setCardState(CardState.Hidden),
    missmatched: () => setCardState(CardState.Missmatched),
    matched: () => setCardState(CardState.Matched),
  };
  const handleClick = () => {
    console.log("click");
    if (curretCardState === CardState.Hidden) {
      console.log("non-hidden");
      curretCardState = CardState.Selected;
      setCardState(curretCardState);
      onClick(card);
    } else {
      console.log("hidden");
    }
  };
  return (
    <div className={getCardStyle(curretCardState)} onClick={handleClick}>
      {curretCardState !== CardState.Hidden && cardLabel}
    </div>
  );
}
