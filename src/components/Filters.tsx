import React from "react";
import { useCallback, useEffect, useState } from "react";
import { X } from "phosphor-react";

import api from "../services/api";
import { GenerationsProps } from "../interfaces/interfaces";
import iconTypePokemon from '../util/Types';
import { typeDataKeys } from "../util/typesEffectiveness";

import { TypeIcon } from "./Pokemon/Weaknesses/TypeIcon";
import { Generation } from "./Generation";

interface Props {
    state: boolean;
    show(value: boolean): void;
    filtered(value: any): void;
    filter: typeDataKeys;
    clearSearch(): void;
    currentGeneration: GenerationsProps;
    setGeneration(generation: GenerationsProps): void;
}

interface PokeTypes {
    name: keyof typeof iconTypePokemon;
    url: string;
}

export function Filters({ state, show, filtered, filter, clearSearch, currentGeneration, setGeneration }: Props) {
    const [types, setTypes] = useState<PokeTypes[]>([])

    const handleTypeList = useCallback(async () => {
        const response = await api.get('/type');
        const data = response.data.results

        const removeUnknownType = data.findIndex((item: { name: string; }) => {
            return item.name === "unknown";
        });

        const removeShadowType = data.findIndex((item: { name: string; }) => {
            return item.name === "unknown";
        });

        if (removeUnknownType !== -1 && removeShadowType !== -1) {
            data.splice(removeUnknownType, 1);
            data.splice(removeShadowType, 1);
            setTypes(data);
        }

    }, []);

    function resetFilters() {
        filtered('')
        show(false)
        setGeneration({} as GenerationsProps)
    }

    useEffect(() => {
        handleTypeList();
    }, [state]);

    return (
        <div id="modalFilters" tabIndex={-1} aria-hidden="true" className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 w-full h-full bg-opacity-80 bg-zinc-200 dark:bg-zinc-900 dark:bg-opacity-80 py-4">
            <div className="relative p-4 w-full max-w-2xl min-h-[calc(100%-1rem)] flex items-center mx-auto">
                <div className="relative bg-zinc-50 rounded-lg shadow dark:bg-zinc-800">
                    <div className="flex justify-between items-start p-6 rounded-t border-b dark:border-zinc-700">
                        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                            Filters
                        </h3>
                        <button
                            type="button"
                            className="text-zinc-400 bg-transparent hover:bg-indigo-500 hover:text-zinc-50 rounded text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="modalFilters"
                            onClick={() => show(false)}
                        >
                            <X size={15} weight="bold" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 flex-1 mb-6">
                        <div className="space-y-4 mb-5">
                            <strong className="font-semibold text-zinc-500">
                                Types:
                            </strong>
                            <div className="flex flex-row flex-wrap items-center gap-3">
                                {types.map((type, index) => (
                                    <React.Fragment key={index}>
                                        <button
                                            className={`hover:ring-2 hover:ring-offset-1 dark:hover:ring-offset-zinc-800 hover:ring-offset-zinc-50 dark:hover:ring-zinc-600 hover:ring-zinc-400 rounded
                                        ${type.name === filter && "opacity-50 pointer-events-none"}`}
                                            onClick={() => { filtered(type.name), show(false), clearSearch() }}
                                        >
                                            <TypeIcon rounded="md" padding="4" addClass="weaknesses-type-pokemon" type={type.name} />
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <strong className="font-semibold text-zinc-500">
                                Generation:
                            </strong>
                            <div className="grid gap-3 md:grid-cols-3 sm:grid-cols-2">
                                <Generation
                                    poke_one="1"
                                    poke_two="4"
                                    poke_three="7"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"I"}
                                    offset={0}
                                    limit={151}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="152"
                                    poke_two="155"
                                    poke_three="158"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"II"}
                                    offset={151}
                                    limit={100}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="252"
                                    poke_two="255"
                                    poke_three="258"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"III"}
                                    offset={251}
                                    limit={135}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="387"
                                    poke_two="390"
                                    poke_three="393"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"IV"}
                                    offset={386}
                                    limit={107}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="495"
                                    poke_two="498"
                                    poke_three="501"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"V"}
                                    offset={493}
                                    limit={156}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="650"
                                    poke_two="653"
                                    poke_three="656"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"VI"}
                                    offset={649}
                                    limit={72}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="722"
                                    poke_two="725"
                                    poke_three="728"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"VII"}
                                    offset={721}
                                    limit={88}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                                <Generation
                                    poke_one="810"
                                    poke_two="813"
                                    poke_three="816"
                                    currentGeneration={currentGeneration}
                                    setGeneration={setGeneration}
                                    text={"VIII"}
                                    offset={809}
                                    limit={89}
                                    closeModal={show}
                                    removeFilterByType={filtered}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t dark:border-zinc-700">
                        <button
                            type="button"
                            className="font-medium rounded text-sm px-5 py-2.5 text-center text-zinc-50 bg-indigo-600 hover:bg-indigo-700"
                            onClick={resetFilters}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}