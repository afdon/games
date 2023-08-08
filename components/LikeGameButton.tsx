"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

import useAuthModal from "@/hooks/UseAuthModal";
import { useUser } from "@/hooks/useUser";

interface LikeButtonProps {
    gameId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    gameId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_games')
                .select('*')
                .eq('user_id', user.id)
                .eq('game_id', gameId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [gameId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_games')
                .delete()
                .eq('user_id', user.id)
                .eq('game_id', gameId)

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient
            .from('liked_games')
            .insert({
                game_id: gameId,
                user_id: user.id
            });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked!');
            }
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike} 
            className="
        hover:opacity-75
        transition
        ">
            <Icon color={isLiked ? '#f97316' : 'white'} size={25} />
        </button>
    );
}


export default LikeButton;