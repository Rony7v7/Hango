import { useState, useEffect } from 'preact/hooks';
import { guessLetter } from '../api/Hangman.api.ts';
import WordDisplay from './WordDisplay.jsx';
import Gallow from './Gallow.jsx';
import Keyboard from './Keyboard.jsx';

const GameComponent = ({ gameData }) => {
    const [game, setGame] = useState(gameData);
    const [typedLetter, setTypedLetter] = useState('');
    const [lettersHistory, setLettersHistory] = useState('');

    const handleGuess = async () => {
        if (typedLetter.length ) {
            const res = await guessLetter(game.id, typedLetter);
            console.log(res);
            setGame(res);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleGuess();
            setLettersHistory(lettersHistory + typedLetter);
            setTypedLetter('');
        } else if(event.key === 'Backspace') {
            setTypedLetter('');
        }else if(event.key.length === 1 && event.key.match(/[a-z,ñ]/i)) {
            setTypedLetter(event.key);
        }
    };

    const handleKeyClick = (key) => {
        if (key === 'SEND') {
            handleGuess();
            setLettersHistory(lettersHistory + typedLetter);
            setTypedLetter('');
        } else if (key === 'BACKSPACE') {
            setTypedLetter('');
        } else {
            setTypedLetter(key.toLowerCase());
        }
    }

    useEffect(() => {
        setGame(gameData);
    }, [gameData]);

    useEffect(() => {
        const handleKeyDownRef = (event) => handleKeyDown(event);
        document.addEventListener('keydown', handleKeyDownRef);
        return () => {
            document.removeEventListener('keydown', handleKeyDownRef);
        };
    }, [typedLetter]); // Agregar typedLetter como dependencia para garantizar su actualización




    return (
        <>
            <Gallow attempts={8 - game.attempts} />
            <div class="flex flex-col items-center gap-8">
                <span class="text-9xl flex justify-center font-medium h-36 w-40 border-b-2 mb-2" name="slot">
                    {typedLetter.toUpperCase()}
                </span>
                <WordDisplay word={game.word} guessedLetters={game.guesses} />
                <Keyboard onKeyClick={handleKeyClick} guessedLetters={game.guesses} typedLetters={lettersHistory}/>
                <div>Attempts: {game.attempts}</div>
            </div>
        </>
    );
};

export default GameComponent;
