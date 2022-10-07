import { useState } from "react";
import Pokeball from "../../Pokeball";

interface Props {
    name: string;
    pokemon: {
        image: string;
        shiny: string;
        shiny_f: string;
        not_shiny: string;
    }
}

export function Shiny({ name, pokemon }: Props) {
    const [showShiny, setShowShiny] = useState(false)

    return (
        <>
            {pokemon.shiny ?
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 p-5">
                    <figure className="block mx-auto relative figure-varieties-poke" onClick={() => setShowShiny(!showShiny)}>
                        <img
                            src={pokemon.shiny}
                            alt={`Imagem do pokémon ${name}`}
                            className="w-full z-10 relative"
                        />
                        <img
                            src="https://pokemon.gameinfo.io/images/male_shiny_l.png"
                            alt="male_shiny_icon"
                            className="absolute left-[calc(50%-16px)] -top-3 z-20 w-8"
                        />
                        <Pokeball />
                    </figure>
                    {pokemon.shiny_f &&
                        <figure className="block mx-auto relative figure-varieties-poke" onClick={() => setShowShiny(!showShiny)}>
                            <img
                                src={pokemon.shiny_f}
                                alt={`Imagem do pokémon ${name}`}
                                className="w-full z-10 relative"
                            />
                            <img
                                src="https://pokemon.gameinfo.io/images/female_shiny_l.png"
                                alt="male_shiny_icon"
                                className="absolute left-[calc(50%-16px)] -top-3 z-20 w-8"
                            />
                            <Pokeball />
                        </figure>
                    }
                </div>
                :
                <div className="p-3">
                    <p className="capitalize font-medium">
                        <strong>{name}</strong> currently has no shiny forms.
                    </p>
                </div>
            }
        </>
    );
}