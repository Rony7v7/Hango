import { useState, useEffect } from 'preact/hooks';
import { guessLetter } from '../api/Hangman.api.ts';
import WordDisplay from './WordDisplay.jsx';
import Gallow from './Gallow.jsx';
import Keyboard from './Keyboard.jsx';
import GameOverModal from './GameOverModal.jsx';

const GameComponent = ({ gameData }) => {
    const [game, setGame] = useState(gameData);
    const [typedLetter, setTypedLetter] = useState('');
    const [lettersHistory, setLettersHistory] = useState('');
    const [error, setError] = useState(null);

    const handleGuess = async () => {
        try {
            if (typedLetter) {
                const res = await guessLetter(game.id, typedLetter.toLowerCase());
                setGame(res);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleKeyDown = (event) => {
        try {
            if (event.key === 'Enter') {
                handleGuess();
                setLettersHistory(lettersHistory + typedLetter);
                setTypedLetter('');
            } else if (event.key === 'Backspace') {
                setTypedLetter('');
            } else if (event.key.length === 1 && event.key.match(/[a-z,ñ]/i)) {
                setTypedLetter(event.key);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleKeyClick = (key) => {
        try {
            if (key === 'SEND') {
                handleGuess();
                setLettersHistory(lettersHistory + typedLetter);
                setTypedLetter('');
            } else if (key === 'BACKSPACE') {
                setTypedLetter('');
            } else {
                setTypedLetter(key);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        setGame(gameData);
    }, [gameData]);

    useEffect(() => {
        const handleKeyDownRef = (event) => handleKeyDown(event);
        document.addEventListener('keydown', handleKeyDownRef);
        return () => {
            document.removeEventListener('keydown', handleKeyDownRef);
        };
    }, [typedLetter]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <GameOverModal gameId={game.id} show={game.status || game.attempts === 0} gameStatus={game.status} word={game.word} />

            <Gallow attempts={8 - game.attempts} />
            <div className="flex flex-col items-center gap-8">
                <span className="text-9xl flex justify-center font-medium h-36 w-40 border-b-2 mb-2" name="slot">
                    {typedLetter.toUpperCase()}
                </span>
                <WordDisplay word={game.word} guessedLetters={game.guesses} />
                <Keyboard onKeyClick={handleKeyClick} guessedLetters={game.guesses} typedLetters={lettersHistory} />
                <div>Attempts: {game.attempts}</div>
            </div>
        </>
    );
};

export default GameComponent;
