import { useEffect, useState } from "react";
import api from "../../../services/api";

interface Props {
    pokemon: {
        specie: string;
        height: number;
        weight: number;
    };
}

export type NamedAPIResource = {
    name: string;
    url: string;
};

interface SpecieProps {
    genera: {
        genus: string;
        language: NamedAPIResource;
    }[];
    habitat: string;
    legendary: boolean;
    mythical: boolean;
    flavorTextEntries: {
        flavor_text: string;
        language: NamedAPIResource;
        version: NamedAPIResource;
    }[];
}

export function About({ pokemon }: Props) {
    const heightInFeetInches = Math.floor(pokemon.height * 3.2808) + '"' + Math.round(((pokemon.height * 3.2808) % 1) * 12) + '\'';
    const widthInPounds = (pokemon.weight * 2.205).toFixed(1);

    const [pokeDetails, setPokeDetails] = useState({} as SpecieProps)

    useEffect(() => {
        if (pokemon.specie)
            api.get(`/pokemon-species/${pokemon.specie}`).then(response => {
                const {
                    genera,
                    habitat,
                    is_legendary,
                    is_mythical,
                    flavor_text_entries
                } = response.data;

                setPokeDetails({
                    genera: genera,
                    habitat: habitat,
                    legendary: is_legendary,
                    mythical: is_mythical,
                    flavorTextEntries: flavor_text_entries
                });
            });
    }, [pokemon.specie]);

    return (
        <ul className="w-full p-3 flex flex-col gap-3">
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500 min-w-[63px]">
                    About:
                </strong>
                <p className="capitalize font-medium">
                    {pokeDetails.flavorTextEntries &&
                        pokeDetails.flavorTextEntries.find(
                            (text) => text.language.name === "en"
                        )?.flavor_text
                    }
                </p>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500 min-w-[63px]">
                    Species:
                </strong>
                <p className="capitalize font-medium">
                    {pokeDetails && pokeDetails?.genera?.find((gen) => gen.language.name === "en")?.genus}
                </p>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500 min-w-[63px]">
                    Height:
                </strong>
                <p className="font-medium">
                    {pokemon.height}m ( {heightInFeetInches} )
                </p>
            </li>
            <li className="w-full flex flex-row gap-3">
                <strong className="text-zinc-500 min-w-[63px]">
                    Weight:
                </strong>
                <p className="font-medium">
                    {pokemon.weight}kg ( {widthInPounds}lbs. )
                </p>
            </li>
        </ul>
    );
}