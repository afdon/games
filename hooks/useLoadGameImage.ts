import { useSupabaseClient } from "@supabase/auth-helpers-react"

import { Game } from "@/types"

const useLoadGameImage = (game: Game) => {
    const supabaseClient = useSupabaseClient();

    if (!game) {
        return null;
    }

    const { data: gameData } = supabaseClient
        .storage
        .from('game-images')
        .getPublicUrl(game.image_path);

    return gameData.publicUrl;
};

export default useLoadGameImage;