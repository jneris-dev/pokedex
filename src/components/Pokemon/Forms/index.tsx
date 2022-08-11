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
            <div className="w-full p-3 border-b">
                <h3 className="text-lg font-bold">
                    Varieties
                </h3>
            </div>
            {pokemonForms.length > 1 ?
                <div className="grid grid-cols-3 gap-10 p-5">
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