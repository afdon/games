import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

import { Game } from "@/types";

const useGetGameById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [game, setGame] = useState<Game | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        const fetchGame = async () => {
            const { data, error } = await supabaseClient
            .from('games')
            .select('*')
            .eq('id', id)
            .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setGame(data as Game);
            setIsLoading(false);
        }
        
        fetchGame();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        game: game
    }), [isLoading, game]);
}

export default useGetGameById;