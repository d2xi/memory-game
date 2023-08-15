import { useState } from "react";

export interface CardProps {
  cardLabel: string;
  onClick: (card: ICard) => void;
}
export interface ICard {
  getLabel: () => string;
  hide: () => void;
  foundMatch: () => void;
}
export default function Card({ cardLabel, onClick }: CardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasMatch, setHasMatch] = useState(false);
  const theCard: ICard = {
    hide: () => {
      setIsRevealed(false);
    },
    getLabel: () => cardLabel,
    foundMatch: () => setHasMatch(true),
  };
  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onClick(theCard);
    }
  };
  return (
    <div className={hasMatch ? "card matched" : "card"} onClick={handleClick}>
      {isRevealed && cardLabel}
    </div>
  );
}
