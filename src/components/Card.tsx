import { useState } from "react";

interface CardProps {
  cardLabel: string;
  // onClick: () => void;
}
export default function Card({ cardLabel }: CardProps) {
  const [isSelected, setState] = useState(false);
  return (
    <div className="card" onClick={() => setState(!isSelected)}>
      {isSelected && cardLabel}
    </div>
  );
}
