const WordDisplay = ({ word, guessedLetters }) => {

  guessedLetters = guessedLetters.split('').map(letter => letter.toUpperCase());
  
  const displayWord = word.toUpperCase().split('').map((letter) =>
    <span class="mx-2 text-3xl font-light p-2 rounded-lg bg-black/10 ">
      {guessedLetters.includes(letter) ? letter : '_'}
    </span>
  )

  return <div className="word-display">{displayWord}</div>;
};

export default WordDisplay;
