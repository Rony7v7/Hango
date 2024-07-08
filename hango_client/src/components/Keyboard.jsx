import Backspace from "./icons/Backspace.astro";

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["SEND", "Z", "X", "C", "V", "B", "N", "M", "<-"],
];

function Keyboard() {
    return (
        <div id="keyboard" class="flex max-w-lg flex-col gap-2 w-fit items-center">
            {keys.map((row) => (
                <div class="flex gap-2 max-w-[472px]">
                    {row.map((key) => (
                        <button key={key} class="flex items-center justify-center min-w-[40px] h-[40px] px-4 rounded-md bg-gray-200 hover:bg-gray-400/50">
                            {!key ? <Backspace /> : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;