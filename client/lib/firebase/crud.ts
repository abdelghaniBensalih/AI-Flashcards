import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Deck } from "../interfaces/interfaces";
import { CreateDeckRequestParams } from "@/app/api/createDeck/route";

export const getDecks = async (
  userId: string,
  setDecks: React.Dispatch<React.SetStateAction<Deck[] | undefined>>
): Promise<void> => {
  await fetch("/api/getDecks", {
    body: JSON.stringify({ userId: userId }),
    method: "POST",
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data: Deck[]) => {
      console.log(data);

      setDecks(data);
    });
};

export const getDeck = async (
  userId: string,
  deckName: string,
  setCards: React.Dispatch<React.SetStateAction<Deck | undefined>>
): Promise<void> => {
  await fetch("/api/getDeck", {
    body: JSON.stringify({ userId: userId, deckName: deckName }),
    method: "POST",
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data: Deck) => setCards(data));
};

export const createDeck = async (newDeckParams: CreateDeckRequestParams) => {
  await fetch("/api/createDeck", {
    method: "POST",
    body: JSON.stringify(newDeckParams),
    cache: "force-cache",
  });
};

export const deleteDeck = async (userId: string, deckName: string) => {
  await fetch("/api/deleteDeck", {
    method: "POST",
    body: JSON.stringify({ userId: userId, deckName: deckName }),
    cache: "force-cache",
  });
};
