import { PokemonTypeMap } from '../../../util/pokemonTypeMap';
import iconTypePokemon from '../../../util/Types';

interface Props {
    type: keyof typeof iconTypePokemon;
    effect?: number;
    rounded: string;
    padding: string;
    addClass?: string;
}

export function TypeIcon({ type, effect, rounded, padding, addClass }: Props) {
    return (
        <div
            className={`flex relative flex-row p-${padding} items-center rounded-${rounded} gap-2 text-zinc-100 capitalize ${PokemonTypeMap[type].type} ${addClass}`}
        >
            {iconTypePokemon[type]}
            {effect === 4 && <span className="absolute left-1.5 -bottom-3 text-[.6rem] font-bold w-9 h-5 border border-red-500 rounded flex items-center justify-center bg-red-50 dark:bg-red-900 text-red-500 z-10">4×</span>}
            {effect === 0.25 && <span className="absolute left-1.5 -bottom-3 text-[.6rem] font-bold w-9 h-5 border border-sky-500 rounded flex items-center justify-center bg-sky-50 dark:bg-sky-900 text-sky-500 z-10">0.25×</span>}
            {effect === 0 && <span className="absolute left-1.5 -bottom-3 text-[.6rem] font-bold w-9 h-5 border border-stone-500 rounded flex items-center justify-center bg-stone-50 dark:bg-stone-900 text-stone-500 z-10">0×</span>}
        </div>
    );
}