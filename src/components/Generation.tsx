import { GenerationsProps } from "../interfaces/interfaces";

interface Props extends GenerationsProps {
    poke_one: string;
    poke_two: string;
    poke_three: string;
    currentGeneration: GenerationsProps;
    setGeneration(generation: GenerationsProps): void;
    closeModal(value: boolean): void;
    removeFilterByType(value: any): void;
}

export function Generation({ poke_one, poke_two, poke_three, currentGeneration, setGeneration, text, limit, offset, closeModal, removeFilterByType }: Props) {
    const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/"
    const urlSec = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

    function handleSelectGeneration() {
        removeFilterByType('')

        setGeneration({
            text: text,
            offset: offset,
            limit: limit,
        })

        closeModal(false)
    }

    return (
        <button
            type="button"
            className="bg-zinc-700 p-3 rounded text-center hover:ring-2 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-zinc-800 ring-zinc-600 cursor-pointer flex-1"
            onClick={handleSelectGeneration}
        >
            <div className="flex flex-row items-end justify-center">
                <figure className="overflow-hidden h-16 w-16 flex items-center justify-center">
                    <img src={`${urlSec}${poke_one}.png`} className="max-w-[150%]" alt="" />
                </figure>
                <figure className="overflow-hidden h-16 w-16 flex items-center justify-center">
                    <img src={`${urlSec}${poke_two}.png`} className="max-w-[150%]" alt="" />
                </figure>
                <figure className="overflow-hidden h-16 w-16 flex items-center justify-center">
                    <img src={`${urlSec}${poke_three}.png`} className="max-w-[150%]" alt="" />
                </figure>
            </div>
            <span className="text-sm">Generation {text}</span>
        </button>
    );
}