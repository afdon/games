import { useSupabaseClient } from "@supabase/auth-helpers-react"

import { Game } from "@/types"

const useLoadGameImage = (game: Game) => {
    const supabaseClient = useSupabaseClient();

    if (!game) {
        return null;
    }

    const { data: gameData } = supabaseClient
        .storage
        // .from('game-images')
        .from('game')
        .getPublicUrl(game.game_path);

    return gameData.publicUrl;
};

export default useLoadGameImage;