import { useSupabaseClient } from "@supabase/auth-helpers-react"

import { Game } from "@/types"

const useLoadImage = (game: Game) => {
    const supabaseClient = useSupabaseClient();

    if (!game) {
        return null;
    }

    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(game.image_path);

    return imageData.publicUrl;
};

export default useLoadImage;