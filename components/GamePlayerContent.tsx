"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Game } from "@/types";
import useGamePlayer from "@/hooks/useGamePlayer";

import LikeGameButton from "./LikeGameButton";
import GameMediaItem from "./GameMediaItem";
import Slider from "./Slider";


interface GamePlayerContentProps {
    game: Game;
    gameUrl: string;
};

const GamePlayerContent: React.FC<GamePlayerContentProps> = ({
    game,
    gameUrl
}) => {
    const gamePlayer = useGamePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (gamePlayer.ids.length === 0) {
            return;
        }

        const currentIndex = gamePlayer.ids.findIndex((id) => id === gamePlayer.activeId);
        const nextGame = gamePlayer.ids[currentIndex + 1];

        if (!nextGame) {
            return gamePlayer.setId(gamePlayer.ids[0]);
        }

        gamePlayer.setId(nextGame);
    }

    const onPlayPrevious = () => {
        if (gamePlayer.ids.length === 0) {
            return;
        }

        const currentIndex = gamePlayer.ids.findIndex((id) => id === gamePlayer.activeId);
        const previousGame = gamePlayer.ids[currentIndex - 1];

        if (!previousGame) {
            return gamePlayer.setId(gamePlayer.ids[gamePlayer.ids.length - 1]);
        }

        gamePlayer.setId(previousGame);
    }

    const [play, { pause, sound }] = useSound(
        gameUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <GameMediaItem data={game} />
                    <LikeGameButton gameId={game.id} />
                </div>
            </div>

            <div
                className="
            flex
            md:hidden
            col-auto
            w-full
            justify-end
            items-center
            "
            >
                <div
                    onClick={handlePlay}
                    className="
                h-10
                w-10
                flex
                items-center
                justify-center
                rounded-full
                bg-white
                p-1
                cursor-pointer
                "
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div
                className="
            hidden
            h-full
            md:flex
            justify-center
            items-center
            w-full
            max-w-[722px]
            gap-x-6
            "
            >
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                        "
                />
                <div
                    onClick={handlePlay}
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                        "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon 
                    onClick={toggleMute}
                    className="cursor-pointer"
                    size={34}
                    />
                    <Slider 
                    value={volume}
                    onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>

        </div>
    );
}

export default GamePlayerContent;