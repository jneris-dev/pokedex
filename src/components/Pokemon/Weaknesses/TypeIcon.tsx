import { PokemonTypeMap } from '../../../util/pokemonTypeMap';
import iconTypePokemon from '../../../util/Types';

interface Props {
    type: keyof typeof iconTypePokemon;
}

export function TypeIcon({ type }: Props) {
    return (
        <div
            className={`flex flex-row p-4 items-center rounded gap-2 text-zinc-100 weaknesses-type-pokemon capitalize ${PokemonTypeMap[type].type}`}
        >
            <>
                {iconTypePokemon[type]}
            </>
        </div>
    );
}