import { useEffect, useState } from "react";

import api from "../../../services/api";
import { Varieties } from "./Varieties";
import { PokemonFormsProps } from "../../../interfaces/interfaces";

interface Props {
    pokemon: {
        id: number;
        specie: string;
        forms: PokemonFormsProps[];
    };
    name: string;
    showDetail: (value: string) => void;
}

interface SpecieProps {
    pokemon: {
        name: string;
        url: string;
        form?: boolean;
    };
}

export function SpeciesVarieties({ pokemon, name, showDetail }: Props) {
const [pokemonSpeciesVarieties, setPokemonSpeciesVarieties] = useState<SpecieProps[]>([]);

useEffect(() => {
    const getVarieties = async () => {
        setPokemonSpeciesVarieties([]);

        const otherForms: SpecieProps[] =
            pokemon.forms?.filter((form) => form.name !== name).map((form) => ({
                pokemon: {
                    name: form.name,
                    url: form.url,
                    form: true
                }
            })) || [];

        try {
            if (pokemon.specie) {
                const response = await api.get(`/pokemon-species/${pokemon.specie}`);

                let varieties = response.data.varieties.filter(
                    (pk: SpecieProps) => pk.pokemon.name !== name
                );

                if (pokemon.specie === "pikachu") {
                    varieties = varieties.slice(-1);
                }

                setPokemonSpeciesVarieties([
                    ...varieties,
                    ...otherForms
                ]);
            } else {
                setPokemonSpeciesVarieties(otherForms);
            }
        } catch (error) {
            setPokemonSpeciesVarieties(otherForms);
        }
    };

    getVarieties();

    window.scrollTo(0, 0);
}, [pokemon, name]);

return (
    <>
        {pokemonSpeciesVarieties.length > 0 ? (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 p-5">
                {pokemonSpeciesVarieties.map((variety, index) => (
                    <Varieties
                        key={index}
                        pokemon={variety.pokemon}
                        showDetail={variety.pokemon.form ? () => {} : showDetail}
                        form={variety.pokemon.form || false}
                    />
                ))}
            </div>
        ) : (
            <div className="p-3">
                <p className="capitalize font-medium">
                    <strong>{name.replace("-", " ")}</strong> currently has no different SpeciesVarieties.
                </p>
            </div>
        )}
    </>
);

}