"use client";

import { useRouter } from "next/navigation";

import { Game } from "@/types";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import MediaItem from "@/components/MediaItem";
import LikeGameButton from "@/components/LikeGameButton";
import useOnGamePlay from "@/hooks/useOnGamePlay";

interface LikedContentProps {
    games: Game[];
};

const LikedContent: React.FC<LikedContentProps> = ({
    games
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const onGamePlay = useOnGamePlay(games);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/'); // redirect if not loading and no user
        }
    }, [isLoading, user, router]);

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
                No liked games.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
           {games.map((game) => (
            <div
            key={game.id}
            className="flex items-center gap-x-4 w-full"
            >
                <div className="flex-1">
                    <MediaItem 
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

export default LikedContent;