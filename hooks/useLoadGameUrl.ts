import { Game } from "@/types";
import { 
    useSessionContext, 
    // useSupabaseClient 
} from "@supabase/auth-helpers-react"

const useLoadGameUrl = (game: Game) => {
    // const supabaseClient = useSupabaseClient();

    // useSessionContext instead of useSupabaseClient 4:10
    const { supabaseClient } = useSessionContext();

    if (!game) {
        return '';
    }

    const { data: gameData } = supabaseClient
    .storage
    .from('games')
    .getPublicUrl(game.game_path);

    return gameData.publicUrl;
}

export default useLoadGameUrl;