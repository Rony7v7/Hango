/* empty css                         */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from './astro/server_Bc31avQS.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './Layout_CB96KpjB.mjs';
import { useState, useEffect } from 'preact/hooks';
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';

const API_URL = "http://localhost:8000/hangman/api/v1/";
async function newGame() {
  const res = await fetch(`${API_URL}new_game`);
  const data = await res.json();
  return {
    id: data.id,
    word: data.word,
    guesses: data.guessed_letters,
    attempts: data.attempts
  };
}
async function guessLetter(id, letter) {
  const res = await fetch(`${API_URL}guess_letter/${id}/${letter}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return {
    id: data.id,
    word: data.word,
    guesses: data.guessed_letters,
    attempts: data.attempts,
    message: data.message,
    status: data.game_won
  };
}
async function exitGame(id) {
  const res = await fetch(`${API_URL}hangman/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;
}

const WordDisplay = ({
  word,
  guessedLetters
}) => {
  guessedLetters = guessedLetters.split("").map((letter) => letter.toUpperCase());
  const displayWord = word.toUpperCase().split("").map((letter) => jsx("span", {
    class: "mx-2 text-3xl font-light p-2 rounded-lg bg-black/10 ",
    children: guessedLetters.includes(letter) ? letter : "_"
  }));
  return jsx("div", {
    className: "word-display",
    children: displayWord
  });
};

const Gallow = ({
  attempts
}) => {
  if (attempts >= 8) {
    attempts--;
  }
  return jsx("img", {
    src: `/img/gallow/gallow_${attempts}.svg`,
    alt: `Gallow ${attempts}`
  });
};

const keys = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"], ["SEND", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]];
function Keyboard({
  onKeyClick,
  guessedLetters,
  typedLetters
}) {
  guessedLetters = guessedLetters.split("").map((letter) => letter.toUpperCase());
  typedLetters = typedLetters.split("").map((letter) => letter.toUpperCase());
  return jsx("div", {
    id: "keyboard",
    class: "flex max-w-lg flex-col gap-2 w-fit items-center",
    children: keys.map((row) => jsx("div", {
      class: "flex gap-2 max-w-[472px]",
      children: row.map((key) => jsx("button", {
        class: `flex items-center font-medium justify-center min-w-[40px] h-[40px] px-4 rounded-md ` + (guessedLetters.includes(key) ? " bg-[#43A047] text-white hover:bg-[#3b883f]" : " bg-gray-200 hover:bg-gray-400/50") + (typedLetters.includes(key) && !guessedLetters.includes(key) ? " bg-gray-500 text-white hover:bg-gray-600" : ""),
        onClick: () => onKeyClick(key),
        children: key === "BACKSPACE" ? jsx("img", {
          src: "/img/icons/Backspace.svg",
          alt: "Backspace",
          class: "size-7 m-0"
        }) : key
      }, key))
    }))
  });
}

const GameOverModal = ({
  gameId,
  show,
  gameStatus,
  word
}) => {
  const imgSrc = gameStatus ? "/img/gallow/gallow_1.svg" : "/img/gallow/gallow_7.svg";
  if (!show) {
    return null;
  }
  exitGame(gameId);
  return jsx("div", {
    id: "modal",
    class: "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center",
    children: jsxs("div", {
      class: "bg-white rounded-lg shadow-lg w-1/3",
      children: [jsx("div", {
        class: "flex justify-center items-center border-b p-4",
        children: jsx("h2", {
          class: "text-xl font-semibold",
          children: gameStatus ? "Congratulations! You Win" : "Game Over"
        })
      }), jsxs("div", {
        class: "flex flex-col justify-center items-center p-4 gap-5",
        children: [jsx("img", {
          src: imgSrc,
          alt: ""
        }), jsx("p", {
          children: gameStatus ? "You've guessed the word correctly. Well done!" : `Better luck next time! The word was: ${word} `
        })]
      }), jsxs("div", {
        class: "flex justify-around border-t p-4",
        children: [jsx("a", {
          href: "/singleplayer",
          class: "bg-gray-600 text-white px-4 py-2 rounded",
          children: "Try Again"
        }), jsx("a", {
          href: "/",
          class: "bg-gray-600 text-white px-4 py-2 rounded",
          children: "Main Menu"
        })]
      })]
    })
  });
};

const GameComponent = ({
  gameData
}) => {
  const [game, setGame] = useState(gameData);
  const [typedLetter, setTypedLetter] = useState("");
  const [lettersHistory, setLettersHistory] = useState("");
  const handleGuess = async () => {
    if (typedLetter) {
      const res = await guessLetter(game.id, typedLetter.toLowerCase());
      console.log(res);
      setGame(res);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGuess();
      setLettersHistory(lettersHistory + typedLetter);
      setTypedLetter("");
    } else if (event.key === "Backspace") {
      setTypedLetter("");
    } else if (event.key.length === 1 && event.key.match(/[a-z,ñ]/i)) {
      setTypedLetter(event.key);
    }
  };
  const handleKeyClick = (key) => {
    if (key === "SEND") {
      handleGuess();
      setLettersHistory(lettersHistory + typedLetter);
      setTypedLetter("");
    } else if (key === "BACKSPACE") {
      setTypedLetter("");
    } else {
      setTypedLetter(key);
    }
  };
  useEffect(() => {
    setGame(gameData);
  }, [gameData]);
  useEffect(() => {
    const handleKeyDownRef = (event) => handleKeyDown(event);
    document.addEventListener("keydown", handleKeyDownRef);
    return () => {
      document.removeEventListener("keydown", handleKeyDownRef);
    };
  }, [typedLetter]);
  return jsxs(Fragment, {
    children: [jsx(GameOverModal, {
      gameId: game.id,
      show: game.status || game.attempts == 0,
      gameStatus: game.status,
      word: game.word
    }), jsx(Gallow, {
      attempts: 8 - game.attempts
    }), jsxs("div", {
      class: "flex flex-col items-center gap-8",
      children: [jsx("span", {
        class: "text-9xl flex justify-center font-medium h-36 w-40 border-b-2 mb-2",
        name: "slot",
        children: typedLetter.toUpperCase()
      }), jsx(WordDisplay, {
        word: game.word,
        guessedLetters: game.guesses
      }), jsx(Keyboard, {
        onKeyClick: handleKeyClick,
        guessedLetters: game.guesses,
        typedLetters: lettersHistory
      }), jsxs("div", {
        children: ["Attempts: ", game.attempts]
      })]
    })]
  });
};

const prerender = false;
const $$Singleplayer = createComponent(async ($$result, $$props, $$slots) => {
  const gameData = await newGame();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex w-fit m-auto p-5 rounded-md bg-white/60 justify-center items-center"> ${renderComponent($$result2, "GameComponent", GameComponent, { "gameData": gameData, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Usuario/Desktop/Rony/Hango/hango_client/src/components/GameComponent.jsx", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/Usuario/Desktop/Rony/Hango/hango_client/src/pages/singleplayer.astro", void 0);

const $$file = "C:/Users/Usuario/Desktop/Rony/Hango/hango_client/src/pages/singleplayer.astro";
const $$url = "/singleplayer";

export { $$Singleplayer as default, $$file as file, prerender, $$url as url };
