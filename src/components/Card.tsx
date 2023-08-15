import { useState } from "react";

export interface CardProps {
  cardLabel: string;
  onClick: (card: ICard) => void;
}
export interface ICard {
  getLabel: () => string;
  hide: () => void;
  missmatched: () => void;
  matched: () => void;
}

enum CardState {
  Matched = "matched",
  Missmatched = "missmatched",
  Hidden = "hidden",
  Selected = "selected",
}

function getCssClass(cardSate: CardState) {
  let cssClass = "card";
  switch (cardSate) {
    case CardState.Matched:
      cssClass = "card matched";
      break;
    case CardState.Missmatched:
      cssClass = "card missmatched";
      break;
    case CardState.Selected:
      cssClass = "card";
      break;
  }
  return cssClass;
}

export default function Card({ cardLabel, onClick }: CardProps) {
  const [cardSate, setCardState] = useState<CardState>(CardState.Hidden);

  const theCard: ICard = {
    getLabel: () => cardLabel,
    hide: () => setCardState(CardState.Hidden),
    missmatched: () => setCardState(CardState.Missmatched),
    matched: () => setCardState(CardState.Matched),
  };
  const handleClick = () => {
    if (cardSate === CardState.Hidden) {
      setCardState(CardState.Selected);
      onClick(theCard);
    }
  };
  return (
    <div className={getCssClass(cardSate)} onClick={handleClick}>
      {cardSate !== CardState.Hidden && cardLabel}
    </div>
  );
}
