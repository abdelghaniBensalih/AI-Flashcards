"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Deck } from "@/lib/interfaces/interfaces";
import { useEffect, useState } from "react";
import { getDeck } from "@/lib/firebase/crud";
import { Card,CardHeader,CardContent } from "@/components/ui/card";

export default function Page() {
  const deckName = (useParams().deck as string).replace("-", " ");
  const { user } = useUser();
  const userId = user?.id as string;

  const [deck, setDeck] = useState<Deck>();
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (userId) {
      getDeck(userId, deckName, setDeck);
    }
  }, [userId, deckName]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (deck && currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };


  useEffect(() => {
    if (userId) {
      getDeck(userId, deckName, setDeck);
    }
  }, [userId]);

  // return (
  //   <div>
  //     <div className="flex flex-row items-center justify-between">
  //       <Link href="/dashboard">
  //         <Button variant="outline" className="">
  //           <ChevronLeft />
  //         </Button>
  //       </Link>{" "}
  //       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
  //         {deckName}
  //       </h1>
  //       <div>
  //         <UserButton />
  //       </div>
  //     </div>
  //     <div>
  //       {deck &&
  //         deck.cards.map((card, index) => {
  //           return (
  //             <div key={index}>
  //               <h1>{card.front}</h1>
  //               <h2>{card.back}</h2>
  //             </div>
  //           );
  //         })}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-row items-center justify-between w-full p-4">
        <Link href="/dashboard">
          <Button variant="outline">
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          {deckName}
        </h1>
        <UserButton />
      </div>

      {deck && deck.cards.length > 0 ? (
        <div className="flex flex-col items-center w-full">
          <Card
            className={`w-80 h-48 text-center cursor-pointer transition-transform duration-700 mt-10 ${
              isFlipped ? "transform rotate-y-180" : ""
            }`}
            onClick={handleFlip}
          >
            <CardHeader>
              <h3 className="text-xl font-bold">Business</h3>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center h-full">
              <div>
                {isFlipped ? (
                  <div className="text-lg">
                    <p>{deck.cards[currentCardIndex].back}</p>
                  </div>
                ) : (
                  <div className="text-lg">
                    <p>{deck.cards[currentCardIndex].front}</p>
                  </div>
                )}
              </div>
              <p className="mt-4">Click card to flip</p>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-4 w-80">
            <Button onClick={handlePreviousCard} disabled={currentCardIndex === 0}>
              ← Previous
            </Button>
            <p>
              {currentCardIndex + 1}/{deck.cards.length}
            </p>
            <Button
              onClick={handleNextCard}
              disabled={currentCardIndex === deck.cards.length - 1}
            >
              Next →
            </Button>
          </div>
        </div>
      ) : (
        <p>No cards available for this deck.</p>
      )}
    </div>
  );
}
