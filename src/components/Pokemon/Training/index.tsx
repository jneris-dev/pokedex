import { useEffect, useState } from "react";

import api from "../../../services/api";

interface Props {
    pokemon: {
        specie: string;
        baseExperience: number;
    };
}

interface SpecieProps {
    captureRate: number;
    baseHappiness: string;
    growthRate: string;
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
                    captureRate: capture_rate,
                    baseHappiness: base_happiness,
                    growthRate: growth_rate.name.replace('-', ' '),
                });
            });
        }
    }, [pokemon]);

    return (
        <ul className="w-full p-3 flex flex-col gap-3">
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Base Exp:
                </strong>
                <span className="font-medium">
                    {pokemon.baseExperience}
                </span>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Base Friendship:
                </strong>
                <span className="font-medium">
                    {pokemonSpecie.baseHappiness}
                </span>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Catch Rate:
                </strong>
                <span className="capitalize font-medium">
                    {`${((pokemonSpecie.captureRate / 255) * 100).toFixed(1)}%`}
                </span>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500">
                    Growth Rate:
                </strong>
                <span className="font-medium capitalize">
                    {pokemonSpecie.growthRate}
                </span>
            </li>
        </ul>
    );
}