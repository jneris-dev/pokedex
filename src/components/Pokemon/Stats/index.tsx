export interface Props {
    pokemon: {
        stats: {
            hp: number;
            attack: number;
            defense: number;
            speed: number;
            specialAttack: number;
            specialDefense: number;
        };
    }
}

export function Stats({ pokemon }: Props) {
    const statsContent: { title: string; field: keyof typeof pokemon.stats }[] = [
        { title: 'HP', field: 'hp' },
        { title: 'Atk', field: 'attack' },
        { title: 'Def', field: 'defense' },
        { title: 'Spa', field: 'specialAttack' },
        { title: 'Spd', field: 'specialDefense' },
        { title: 'Spe', field: 'speed' },
    ];

    return (
        <>
            <div className="w-full p-3 border-b">
                <h3 className="text-lg font-bold">
                    Base Stats
                </h3>
            </div>
            <div className="flex flex-col gap-y-4 p-3">
                {pokemon.stats &&
                    statsContent.map(stat => (
                        <div key={stat.field}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-x-2 min-w-[80px]">
                                    <strong className="text-zinc-500">
                                        {stat.title}:
                                    </strong>
                                    <span className="capitalize font-medium">
                                        {pokemon.stats[stat.field] || 1}
                                    </span>
                                </div>

                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                                    <div
                                        className={`
                                            h-2.5 rounded-full
                                            ${pokemon.stats[stat.field] <= 50 ? "bg-red-600" :
                                                pokemon.stats[stat.field] <= 99 ? "bg-orange-600" :
                                                    pokemon.stats[stat.field] <= 124 ? "bg-yellow-600" :
                                                        pokemon.stats[stat.field] <= 199 ? "bg-green-600" :
                                                            pokemon.stats[stat.field] >= 200 && "bg-blue-600"
                                            }
                                        `}
                                        style={{ width: `${pokemon.stats[stat.field] < 200 ? (pokemon.stats[stat.field] / 200) * 100 : 200}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}