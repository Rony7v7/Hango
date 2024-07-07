const API_URL = 'http://localhost:8000/hangman/api/v1/';

export async function getGameData(id: string) {
    const res = await fetch(`${API_URL}hangman/${id}`);
    const data = await res.json();
    return {id: data.id, word: data.word, guesses: data.guesses, status: data.status};
}

export async function newGame() {
    const res = await fetch(`${API_URL}new_game`)
    const data = await res.json();
    return {id: data.id, word: data.word, guesses: data.guesses, status: data.status};
}

export async function guessLetter(id:string, letter:string) {
    const res = await fetch(`${API_URL}guess_letter/${id}/${letter}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}
