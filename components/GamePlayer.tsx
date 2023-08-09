"use client"

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import PlayerContent from "./PlayerContent";

import useLoadGameUrl from "@/hooks/useLoadGameUrl";
import useGetGameById from "@/hooks/useGetGameById";
import useGamePlayer from "@/hooks/useGamePlayer";
import GamePlayerContent from "./GamePlayerContent";

const GamePlayer = () => {
    const gamePlayer = useGamePlayer();
    const { game } = useGetGameById(gamePlayer.activeId);

    const gameUrl = useLoadGameUrl(game!);

    if (!game || !gameUrl || !gamePlayer.activeId) {
        return null;
    }
    
    return (
        <div
        className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[40vh]
        px-4
        "
        >
            <GamePlayerContent
                key={gameUrl}
                game={game}
                gameUrl={gameUrl}
            />
        </div>
    );
}

export default GamePlayer;