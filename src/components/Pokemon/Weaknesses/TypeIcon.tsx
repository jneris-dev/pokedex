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
            <>
                {iconTypePokemon[type]}
            </>
        </div>
    );
}