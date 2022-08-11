import { useEffect, useState } from "react";

import api from "../../../services/api";

interface Props {
    pokemon: {
        specie: string;
    };
}

interface SpecieProps {
    capture_rate: string;
    base_happiness: string;
    growth_rate: string;
}

export function Training({ pokemon }: Props) {
    const [pokemonSpecie, setPokemonSpecie] = useState<SpecieProps>(
        {} as SpecieProps,
    );

    useEffect(() => {
        if (pokemon.specie) {
            api.get(`/pokemon-species/${pokemon.specie}`).then(response => {
                const { capture_rate, base_happiness, growth_rate } = response.data;

                setPokemonSpecie({
                    capture_rate,
                    base_happiness,
                    growth_rate: growth_rate.name.replace('-', ' '),
                });
            });
        }
    }, [pokemon]);

    return (
        <>
            <div className="w-full p-3 border-b">
                <h3 className="text-lg font-bold">
                    Training
                </h3>
            </div>
            <ul className="w-full p-3 flex flex-col gap-3">
                <li className="w-full flex flex-row gap-3">
                    <strong className="text-zinc-500">
                        Catch Rate:
                    </strong>
                    <span className="capitalize font-medium">
                        {pokemonSpecie.capture_rate}
                    </span>
                </li>
                <li className="w-full flex flex-row gap-3">
                    <strong className="text-zinc-500">
                        Base Friendship:
                    </strong>
                    <span className="font-medium">
                        {pokemonSpecie.base_happiness}
                    </span>
                </li>
                <li className="w-full flex flex-row gap-3">
                    <strong className="text-zinc-500">
                        Growth Rate:
                    </strong>
                    <span className="font-medium">
                        {pokemonSpecie.growth_rate}
                    </span>
                </li>
            </ul>
        </>
    );
}