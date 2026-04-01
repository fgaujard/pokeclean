import type { Card } from "./card";

export interface CardOwned {
  card: Card;
  quantity: number;
  discoveredAt: string;
}
