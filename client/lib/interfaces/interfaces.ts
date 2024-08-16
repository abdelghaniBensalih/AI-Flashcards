export interface Card {
  front: string;
  back: string;
}

export interface Deck {
  cards: Card[];
  description: string;
  name: string;
}