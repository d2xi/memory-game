interface CardProps {
  cardLabel: string;
  onClick: () => void;
}
export default function Card({ cardLabel, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick}>
      {cardLabel}
    </div>
  );
}
