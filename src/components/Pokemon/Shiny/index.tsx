import Pokeball from "../../Pokeball";

interface Props {
    name: string;
    pokemon: {
        shiny: string;
        shiny_f: string;
    }
}

export function Shiny({ name, pokemon }: Props) {
    return (
        <>
            {pokemon.shiny ?
                <div className="grid grid-cols-3 gap-10 p-5">
                    <figure className="block mx-auto relative figure-varieties-poke">
                        <img
                            src="https://pokemon.gameinfo.io/images/male_shiny_l.png"
                            alt="male_shiny_icon"
                            className="absolute left-0 top-0 z-10 w-10"
                        />
                        <img
                            src={pokemon.shiny}
                            alt={`Imagem do pokémon ${name}`}
                            className="w-full z-10 relative"
                        />
                        <Pokeball />
                    </figure>
                    {pokemon.shiny_f &&
                        <figure className="block mx-auto relative figure-varieties-poke">
                            <img
                                src="https://pokemon.gameinfo.io/images/female_shiny_l.png"
                                alt="male_shiny_icon"
                                className="absolute left-0 top-0 z-10 w-10"
                            />
                            <img
                                src={pokemon.shiny_f}
                                alt={`Imagem do pokémon ${name}`}
                                className="w-full z-10 relative"
                            />
                            <Pokeball />
                        </figure>
                    }
                </div>
                :
                <div className="p-3">
                    <p className="capitalize font-medium">
                        <strong>{name}</strong> currently has no different forms.
                    </p>
                </div>
            }
        </>
    );
}