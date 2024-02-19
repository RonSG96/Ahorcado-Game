import './App.css';
import { letters } from './helpers/letters';
import { HangImage } from './components/HangImage';
import { useEffect, useState } from 'react';
import { getRandowmWord } from './helpers/getRandomWord';

function App() {
  const [word, setWord] = useState(getRandowmWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));

  const [intentos, setIntentos] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (intentos >= 9) {
      setLose(true);
    }
  }, [intentos]);

  //Determinar si la persona ganó

  useEffect(() => {
    const currentHiddentWord = hiddenWord.split(' ').join('');
    if (currentHiddentWord === word) {
      setWon(true);
    }
  }, [hiddenWord, word]);

  const checkLetter = (letter: string) => {
    if (lose) return;

    if (!word.includes(letter)) {
      setIntentos(Math.min(intentos + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
        // console.log(hiddenWordArray);
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
    // console.log(letter);
  };

  const newGame = () => {
    const newWord = getRandowmWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setIntentos(0);
    setLose(false);
    setWon(false);
  };

  return (
    <div className="App">
      {/* Imagenes */}
      <HangImage imageNumber={intentos} />

      {/* Palabra oculta */}
      <h3>{hiddenWord}</h3>

      {/* Contador de intentos */}
      <h3>Intentos: {intentos}</h3>

      {/* Mensaje de que perdio */}
      {lose ? <h2>Perdiste, la palabra era: {word}</h2> : ''}

      {/* Mensaje si gano */}
      {won ? <h2>Felicidades, GANASTE!</h2> : ''}
      {/* Botones del juego */}
      {letters.map((letter) => (
        <button
          onClick={() => {
            checkLetter(letter);
          }}
          key={letter}
        >
          {letter}
        </button>
      ))}
      <br />
      <br />
      <button onClick={newGame} className="again">
        Volver a Jugar
      </button>
    </div>
  );
}

export default App;
