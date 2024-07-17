const API_URL = 'http://localhost:8000/hangman/api/v1/';

export async function getGameData(id: string) {
    try {
        const res = await fetch(`${API_URL}hangman/${id}`);
        const data = await res.json();
        return {id: data.id, word: data.word, guesses: data.guessed_letters, status: data.status};
    } catch (error) {
        console.error('Error in getGameData:', error);
        throw new Error('Failed to fetch game data');
    }
}

export async function newGame() {
    try {
        const res = await fetch(`${API_URL}new_game`);
        const data = await res.json();    
        return {id: data.id, word: data.word, guesses: data.guessed_letters, attempts: data.attempts};
    } catch (error) {
        console.error('Error in newGame:', error);
        throw new Error('Failed to create a new game');
    }
}

export async function guessLetter(id:string, letter:string) {
    try {
        const res = await fetch(`${API_URL}guess_letter/${id}/${letter}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();    
        return {id: data.id, word: data.word, guesses: data.guessed_letters, attempts: data.attempts, message: data.message, status: data.game_won};
    } catch (error) {
        console.error('Error in guessLetter:', error);
        throw new Error('Failed to guess the letter');
    }
}

export async function exitGame(id:string) {
    try {
        const res = await fetch(`${API_URL}hangman/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in exitGame:', error);
        throw new Error('Failed to exit the game');
    }
}