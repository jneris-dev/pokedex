import { useEffect, useState } from "react";

import api from "../../../services/api";
import { Varieties } from "./Varieties";

interface Props {
    pokemon: {
        id: number;
    }
    name: string;
    showDetail: (value: string) => void;
}

interface SpecieProps {
    pokemon: {
        name: string;
        url: string;
    }
}

export function Forms({ pokemon, name, showDetail }: Props) {
    const [pokemonForms, setPokemonForms] = useState<SpecieProps[]>([]);

    useEffect(() => {
        if (pokemon.id) {
            api.get(`/pokemon-species/${pokemon.id}`).then(response => {
                const varieties = response.data.varieties;
                setPokemonForms(varieties);
            }).catch(error => {
                if (error)
                    setPokemonForms([])
            });
        }
        window.scrollTo(0, 0);
    }, [pokemon]);

    return (
        <>
            {pokemonForms.length > 1 ?
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 p-5">
                    {pokemonForms.map((varieties, index) => (
                        <Varieties
                            key={index}
                            pokemon={varieties.pokemon}
                            showDetail={showDetail}
                        />
                    ))}
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