"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 

const flashcards = [
  { question: "What is SWOT?", answer: "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats." },
  { question: "What is ROI?", answer: "ROI stands for Return on Investment." },

];

function Flashcard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    setIsFlipped(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleBackToDashboard = () => {
    console.log("Back to dashboard");
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Button onClick={handleBackToDashboard} className="self-start ml-4 mt-4">
        ← Back to Dashboard
      </Button>
      <Card
        className={`w-80 h-48 text-center cursor-pointer transition-transform duration-700 mt-10 ${
          isFlipped ? "transform rotate-y-180" : ""
        }`}
        onClick={handleFlip}
      >
        <CardHeader>
          {/* Should get this from previous click just for now */}
          <h3 className="text-xl font-bold">Business</h3>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center h-full">
          <div>
            {isFlipped ? (
              <div className="text-lg">
                <p>{flashcards[currentCardIndex].answer}</p>
              </div>
            ) : (
              <div className="text-lg">
                <p>{flashcards[currentCardIndex].question}</p>
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
          {currentCardIndex + 1}/{flashcards.length}
        </p>
        <Button
          onClick={handleNextCard}
          disabled={currentCardIndex === flashcards.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

export default Flashcard;
