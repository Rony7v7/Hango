import Backspace from "./icons/Backspace.svg";

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["SEND", "Z", "X", "C", "V", "B", "N", "M", false],
];



function Keyboard({ onKeyClick, guessedLetters, typedLetters}) {

    guessedLetters = guessedLetters.split('').map(letter => letter.toUpperCase());
    typedLetters = typedLetters.split('').map(letter => letter.toUpperCase());

    return (
        <div id="keyboard" class="flex max-w-lg flex-col gap-2 w-fit items-center">
            {keys.map((row) => (
                <div class="flex gap-2 max-w-[472px]">
                    {row.map((key) => (
                        <button key={key} class={`flex items-center font-medium justify-center min-w-[40px] h-[40px] px-4 rounded-md `
                            + (guessedLetters.includes(key) ? ' bg-[#43A047] text-white hover:bg-[#3b883f]' : ' bg-gray-200 hover:bg-gray-400/50') 
                            + ((typedLetters.includes(key) && !guessedLetters.includes(key)) ? ' bg-gray-500 text-white hover:bg-gray-600' : '')
                        }
                        
                        onClick={() => onKeyClick(key)}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;