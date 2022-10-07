import React, { useEffect, useState } from "react";

import { PokemonTypesProps } from "../../../interfaces/interfaces";
import { typesData } from "../../../util/typesEffectiveness";
import { TypeIcon } from "./TypeIcon";
import iconTypePokemon from '../../../util/Types';

interface Props {
    pokemon: {
        type: PokemonTypesProps[];
    }
}

interface EffectivenessProps {
    name: keyof typeof iconTypePokemon;
    effect: number;
}

export function Weaknesses({ pokemon }: Props) {
    const [effectiveness, setEffectiveness] = useState<EffectivenessProps[]>([])

    useEffect(() => {
        if (pokemon.type) {
            let weaknesses = {} as any;

            pokemon.type.forEach(item => {
                let defense = typesData[item.name].defense;

                Object.entries(defense).forEach(([key, value]) => {
                    switch (key) {
                        case ('double'):
                            value.forEach((i: string | number) => { weaknesses[i] ? weaknesses[i] *= 2 : weaknesses[i] = 2 });
                            break;
                        case ('half'):
                            value.forEach((i: string | number) => { weaknesses[i] ? weaknesses[i] *= .5 : weaknesses[i] = .5 });
                            break;
                        case ('zero'):
                            value.forEach((i: string | number) => { weaknesses[i] = 0 });
                            break;
                    }
                });

                const weaknessDisplay = [] as any;
                Object.entries(weaknesses).forEach(([key, value]) => {
                    weaknessDisplay.push({ name: key, effect: value });
                });

                setEffectiveness(weaknessDisplay)
            });
        }
    }, [pokemon.type]);

    return (
        <div>
            <div>
                <strong className="mt-4 pl-3 block">Weaknesses:</strong>
                <div className="flex flex-row flex-wrap items-center mt-1 gap-2 p-3">
                    {effectiveness &&
                        effectiveness.map((weaknesses, index) => (
                            <React.Fragment key={index}>
                                {weaknesses.effect >= 2 &&
                                    <TypeIcon rounded="md" padding="4" addClass="weaknesses-type-pokemon" type={weaknesses.name} effect={weaknesses.effect} />
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
            <div>
                <strong className="mt-4 pl-3 block">Resistances:</strong>
                <div className="flex flex-row flex-wrap items-center mt-1 gap-2 p-3">
                    {effectiveness &&
                        effectiveness.map((weaknesses, index) => (
                            <React.Fragment key={index}>
                                {weaknesses.effect < 1 &&
                                    <TypeIcon rounded="md" padding="4" addClass="weaknesses-type-pokemon" type={weaknesses.name} effect={weaknesses.effect} />
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}