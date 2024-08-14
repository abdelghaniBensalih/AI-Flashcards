import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export async function POST(request: Request) {
  const userId = (await request.json()).userId;
  const usersQuery = query(collection(db, "users"));
  const querySnapshot = (await getDocs(usersQuery)).docs.filter(
    (doc) => doc.id === userId
  )[0];

  return new Response(JSON.stringify(querySnapshot.data().decks));
}
