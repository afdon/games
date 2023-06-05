"use client";

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import uesAuthModal from "@/hooks/UseAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = uesAuthModal();

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    
    return (
        <Modal
        title="Welcome back"
        description="Log in to your account"
        isOpen={isOpen}
        onChange={onChange}
        >
            <Auth 
                theme="dark"
                magicLink
                providers={["github", "google"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}
export default AuthModal;