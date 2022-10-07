import { useCallback, useEffect, useState } from "react";
import { X } from "phosphor-react";

import api from "../services/api";
import React from "react";
import { TypeIcon } from "./Pokemon/Weaknesses/TypeIcon";
import iconTypePokemon from '../util/Types';
import { typeDataKeys } from "../util/typesEffectiveness";

interface Props {
    state: boolean;
    show(value: boolean): void;
    filtered(value: any): void;
    filter: typeDataKeys;
    clearSearch(): void;
}

interface PokeTypes {
    name: keyof typeof iconTypePokemon;
    url: string;
}

export function Filters({ state, show, filtered, filter, clearSearch }: Props) {
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

    useEffect(() => {
        handleTypeList();
    }, [state]);

    return (
        <div id="modalFilters" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center bg-opacity-80 bg-zinc-200 dark:bg-zinc-900 dark:bg-opacity-80">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
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
                    <div className="p-6 space-y-6 flex-1 mb-6">
                        <strong className="font-semibold text-zinc-500">
                            Types:
                        </strong>
                        <div className="flex flex-row flex-wrap items-center gap-2">
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
                    <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t dark:border-zinc-700">
                        <button
                            type="button"
                            className="font-medium rounded text-sm px-5 py-2.5 text-center text-zinc-50 bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => { filtered(''), show(false) }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}