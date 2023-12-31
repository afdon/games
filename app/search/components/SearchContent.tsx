"use client";

import LikeGameButton from "@/components/LikeGameButton";
import GameMediaItem from "@/components/GameMediaItem";
import useOnGamePlay from "@/hooks/useOnGamePlay";
import { Game } from "@/types";

interface SearchContentProps {
    games: Game[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    games
}) => {
    const onGamePlay = useOnGamePlay(games);

    if (games.length === 0) {
        return (
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
            ">
                No games found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {games.map((game) => (
                <div
                key={game.id}
                className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <GameMediaItem 
                        onClick={(id: string) => onGamePlay(id)}
                        data={game}
                        />
                    </div>
                    <LikeGameButton gameId={game.id} />
                </div>
            ))}
        </div>
    )
}

export default SearchContent;