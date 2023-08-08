"use client"

import useLoadImage from "@/hooks/useLoadImage";
import useLoadGameImage from "@/hooks/useLoadImage";
import useGamePlayer from "@/hooks/usePlayer";
import { Game } from "@/types";

import Image from "next/image";

interface MediaItemProps {
    data: Game;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const gamePlayer = useGamePlayer();
    const imageURL = useLoadGameImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        // do we need the below?
        return gamePlayer.setId(data.id);
    }

    return (
        <div
            onClick={handleClick}
            className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
        "
        >
            <div
                className="
            relative
            rounded-md
            min-h-[48px]
            min-w-[48px]
            overflow:hidden
            ">
                <Image
                    fill
                    src={imageURL || '/images/liked.png'}
                    alt="Media Item"
                    className="object-cover"
                />
            </div>
            <div className="
            flex
            flex-col
            gap-y-1
            overflow-hidden
            ">
                <p className="text-white truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;