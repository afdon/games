import { Game } from "@/types"

import { useUser } from "./useUser";
import useGamePlayer from "./usePlayer"
import useAuthModal from "./UseAuthModal";
import useSubscribeModal from "./useSubscribeModal";


const useOnGamePlay = (games: Game[]) => {
    const gamePlayer = useGamePlayer();
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const { user, subscription } = useUser();

    const onGamePlay = (id: string) => {
        // note: must be authenticated.
        if (!user) {
            return authModal.onOpen();
        }

        // only subscribed users can play songs
        //removed
        // if (!subscription) {
        //     return subscribeModal.onOpen();
        // }

        gamePlayer.setId(id);
        gamePlayer.setIds(games.map((game) => game.id));
    };

    return onGamePlay;
}

export default useOnGamePlay;