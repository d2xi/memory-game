import { useState } from "react";

export interface CardProps {
  cardLabel: string;
  onClick: (card: ICard) => void;
}
export interface ICard {
  getLabel: () => string;
  hide: () => void;
}
export default function Card({ cardLabel, onClick }: CardProps) {
  const [isReviled, setIsReviled] = useState(false);
  const theCard: ICard = {
    hide: () => {
      setIsReviled(false);
      console.log("the card " + cardLabel + " was hidden");
    },
    getLabel: () => cardLabel,
  };
  const handleClick = () => {
    if (!isReviled) {
      setIsReviled(true);
      console.log("the card " + cardLabel + " was reviled");
      onClick(theCard);
    }
  };
  return (
    <div className="card" onClick={handleClick}>
      {isReviled && cardLabel}
    </div>
  );
}
