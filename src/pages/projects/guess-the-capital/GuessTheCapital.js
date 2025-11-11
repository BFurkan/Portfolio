import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import capitalData from './data.json';
import './style.css';

function GuessTheCapital() {
  const [country, setCountry] = useState('');
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [gameState, setGameState] = useState('playing'); // 'playing', 'correct', 'wrong'
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const generateGame = () => {
    try {
      const max = capitalData.length;
      const countryIndex = Math.floor(Math.random() * max);
      const selectedCountry = capitalData[countryIndex];
      setCountry(selectedCountry.country);
      setCorrectAnswer(selectedCountry.capital);

      // Generate wrong answers
      const wrongAnswers = [];
      while (wrongAnswers.length < 3) {
        const wrongIndex = Math.floor(Math.random() * max);
        if (wrongIndex !== countryIndex && 
            !wrongAnswers.includes(capitalData[wrongIndex].capital)) {
          wrongAnswers.push(capitalData[wrongIndex].capital);
        }
      }

      // Insert correct answer at random position
      const correctIndex = Math.floor(Math.random() * 4);
      wrongAnswers.splice(correctIndex, 0, selectedCountry.capital);
      setOptions(wrongAnswers);
      
      setGameState('playing');
      setIsNextDisabled(true);
    } catch (err) {
      console.error('Error generating game:', err);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setGameState('correct');
    } else {
      setGameState('wrong');
    }
    setIsNextDisabled(false);
  };

  const handleNext = () => {
    generateGame();
  };

  useEffect(() => {
    generateGame();
  }, []);

  return (
    <div className="game-container">

      <main className="container">
        <div className="row">
          <div className="col-12 py-5">
            <h1 className="text-center" id="main-h">Guess the Capital</h1>
            <div className="row py-5">
              <div className="col-12 col-md-6 question-box py-5 text-center">
                <div className="question px-5">
                  <h2>What is the capital of <span id="country">{country}</span>?</h2>
                </div>
              </div>
              <div className="col-12 col-md-6 py-5 text-center ans-box">
                {options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-75 opt p-3 mb-3 ans-btn btn btn-outline-dark ${
                      gameState !== 'playing' && option === correctAnswer ? 'correct-ans' : ''
                    } ${
                      gameState === 'wrong' && option !== correctAnswer ? 'wrong-ans' : ''
                    }`}
                    onClick={() => gameState === 'playing' && handleAnswer(option)}
                    disabled={gameState !== 'playing'}
                  >
                    {option}
                  </button>
                ))}
                <div className="text-center">
                  <button
                    type="button"
                    id="nxt-btn"
                    className="btn text-center btn-dark p-2 w-25"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                  >
                    {gameState === 'wrong' ? 'Play Again' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3">
        <p>Created by <Link to="/">Furkan Bayar</Link></p>
      </footer>
    </div>
  );
}

export default GuessTheCapital; 