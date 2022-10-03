import { PokemonTypesProps } from "../../../interfaces/interfaces";

interface Props {
    pokemon: {
        type: PokemonTypesProps[];
    }
}

export function Type({ pokemon }: Props) {
    return (
        <>
            {pokemon.type && (
                <div className="flex flex-row items-center mt-1 gap-2 p-3">
                    {pokemon.type.map(pokemonType => (
                        <div
                            className={`flex flex-row px-4 py-3 items-center rounded gap-2 text-zinc-100 type-single-pokemon capitalize ${pokemonType.color.type}`}
                            key={pokemonType.name}
                        >
                            <>
                                {pokemonType.icon}
                            </>
                            <span className="drop-shadow text-lg">
                                {pokemonType.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}