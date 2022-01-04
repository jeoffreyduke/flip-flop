import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/first.jpg", matched: false },
  { src: "/img/second.jpg", matched: false },
  { src: "/img/third.jpg", matched: false },
  { src: "/img/fourth.jpg", matched: false },
  { src: "/img/fifth.jpg", matched: false },
  { src: "/img/sixth.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Flip-flop</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="box">
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              handleChoice={handleChoice}
              card={card}
              key={card.id}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <p>Flips: {turns}</p>
      <Footer />
    </div>
  );
}

export default App;
