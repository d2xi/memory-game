interface CardProps {
  cardLabel: string;
}
export default function Card({ cardLabel }: CardProps) {
  return <div className="card">{cardLabel}</div>;
}
