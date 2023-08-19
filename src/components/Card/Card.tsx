import "./Card.css";

function getCardStyle(cardSate: CardState) {
  let baseClass = "card";
  switch (cardSate) {
    case CardState.Matched:
      baseClass += " matched";
      break;
    case CardState.Missmatched:
      baseClass += " missmatched";
      break;
    case CardState.Selected:
      break;
    case CardState.Hidden:
      baseClass += " hidden";
      break;
    default:
      throw new Error("Invalid card state");
  }
  return baseClass;
}

export enum CardState {
  Matched,
  Missmatched,
  Hidden,
  Selected,
}
export interface Card {
  id: number;
  label: string;
  state: CardState;
}

export interface CardProps {
  card: Card;
  onClick: (id: number) => void;
}

export default function CardComponent({
  card: card,
  onClick: handleClick,
}: CardProps) {
  return (
    <div
      className={getCardStyle(card.state)}
      onClick={() => handleClick(card.id)}
    >
      {card.state !== CardState.Hidden && card.label}
    </div>
  );
}
