"use server";

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

export const getDecks = async (userId: string): Promise<Deck[]> => {
  const usersQuery = query(collection(db, "users"));
  const querySnapshot = (await getDocs(usersQuery)).docs.filter(
    (doc) => doc.id === userId
  )[0];

  return querySnapshot.data().decks;
};
