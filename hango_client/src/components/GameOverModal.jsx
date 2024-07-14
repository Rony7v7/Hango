import { exitGame } from "../api/Hangman.api";

const GameOverModal = ({gameId, show, gameStatus, word }) => {

    const imgSrc = gameStatus ? "/img/gallow/gallow_1.svg" : "/img/gallow/gallow_7.svg";

    if (!show) {
        return null;
    } 

    exitGame(gameId);

    return (
        <div id="modal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-1/3">
            <div class="flex justify-center items-center border-b p-4">
                <h2 class="text-xl font-semibold">{gameStatus ? "Congratulations! You Win":"Game Over"}</h2>
            </div>
            <div class="flex flex-col justify-center items-center p-4 gap-5">
                <img src={imgSrc} alt="" />
                <p>{gameStatus ? "You've guessed the word correctly. Well done!":`Better luck next time! The word was: ${word} `}</p>
            </div>
            <div class="flex justify-around border-t p-4">
                <a href="/singleplayer" class="bg-gray-600 text-white px-4 py-2 rounded">Try Again</a>
                <a href="/" class="bg-gray-600 text-white px-4 py-2 rounded">Main Menu</a>
            </div>
        </div>
    </div>
    );
    }

export default GameOverModal;