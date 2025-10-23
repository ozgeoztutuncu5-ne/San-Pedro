import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CoffeeType = "espresso" | "latte" | "cappuccino";

interface GameCard {
  id: number;
  type: CoffeeType;
  isFlipped: boolean;
  isMatched: boolean;
}

const COFFEE_TYPES: CoffeeType[] = [
  "espresso",
  "latte",
  "cappuccino",
];

const COFFEE_NAMES: Record<CoffeeType, string> = {
  espresso: "Espresso",
  latte: "Latte",
  cappuccino: "Cappuccino",
};

const COFFEE_IMAGES: Record<CoffeeType, string> = {
  espresso: "/espresso_branded.png",
  latte: "/latte_branded.png",
  cappuccino: "/cappuccino_branded.png",
};

export default function Home() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for matches
  useEffect(() => {
    if (flipped.length === 3) {
      const [id1, id2, id3] = flipped;
      const card1 = cards[id1];
      const card2 = cards[id2];
      const card3 = cards[id3];

      if (
        card1.type === card2.type &&
        card2.type === card3.type
      ) {
        // Match found!
        setMatched([...matched, id1, id2, id3]);
        setScore(score + 1);
        setFlipped([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  }, [flipped]);

  // Check if game is won
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const initializeGame = () => {
    // Create 3 sets of each coffee type (3 of each for matching)
    const gameCards: GameCard[] = [];
    let id = 0;

    COFFEE_TYPES.forEach((type) => {
      for (let i = 0; i < 3; i++) {
        gameCards.push({
          id: id++,
          type,
          isFlipped: false,
          isMatched: false,
        });
      }
    });

    // Shuffle cards
    gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (
      flipped.includes(id) ||
      matched.includes(id) ||
      flipped.length === 3
    ) {
      return;
    }

    setFlipped([...flipped, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2">
            ☕ San Pedro Kahve Oyunu
          </h1>
          <p className="text-lg text-amber-700">
            3 aynı kahveyi bul ve 1 kahve kazan!
          </p>
        </div>

        {/* Score and Reset */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="text-center flex-1">
            <p className="text-sm text-gray-600">Eşleşen Setler</p>
            <p className="text-3xl font-bold text-amber-600">{score}</p>
          </div>
          <Button
            onClick={initializeGame}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Yeni Oyun
          </Button>
        </div>
      </div>

      {/* Game Board */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg transition-all duration-300 transform hover:scale-105 ${
                flipped.includes(card.id) || matched.includes(card.id)
                  ? "bg-white shadow-lg"
                  : "bg-gradient-to-br from-amber-400 to-orange-500 shadow-md hover:shadow-lg"
              } ${matched.includes(card.id) ? "ring-2 ring-green-400" : ""}`}
              disabled={matched.includes(card.id)}
            >
              {(flipped.includes(card.id) || matched.includes(card.id)) && (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <img
                    src={COFFEE_IMAGES[card.type]}
                    alt={COFFEE_NAMES[card.type]}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
              {!flipped.includes(card.id) && !matched.includes(card.id) && (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  ☕
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Win Modal */}
      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white p-8 max-w-md text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">🎉 Tebrikler!</h2>
            <p className="text-lg text-gray-700 mb-2">
              Tüm kahveleri eşleştirdin!
            </p>
            <p className="text-2xl font-bold text-amber-600 mb-6">
              {score} Kahve Kazandın! ☕
            </p>
            <Button
              onClick={initializeGame}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-6"
            >
              Tekrar Oyna
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
