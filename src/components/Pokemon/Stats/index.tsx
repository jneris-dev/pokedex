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

                            <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-zinc-700 overflow-hidden">
                                <div
                                    className={`
                                            h-2.5 rounded-full
                                            ${pokemon.stats[stat.field] <= 25 ? "bg-red-500" :
                                            pokemon.stats[stat.field] <= 59 ? "bg-orange-500" :
                                                pokemon.stats[stat.field] <= 89 ? "bg-yellow-500" :
                                                    pokemon.stats[stat.field] <= 119 ? "bg-lime-500" :
                                                        pokemon.stats[stat.field] <= 149 ? "bg-green-500" :
                                                            pokemon.stats[stat.field] >= 150 && "bg-cyan-500"
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
    );
}