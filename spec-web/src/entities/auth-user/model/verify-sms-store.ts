import { create } from "zustand";
import { SyntheticEvent } from "react";

interface IVerifySmsStore {
    token: string;
    isLoading: boolean;
    error: string | null;
    submit: (
        e: SyntheticEvent,
        mutation: any,
        code: string,
        phone: string,
        request_id: string,
        user_agent: string,
        saveToken: (token: string) => void,
        saveUserId: (userId: string) => void,
        navigate: () => void,
    ) => void;
}

export const useVerifySmsStore = create<IVerifySmsStore>((set) => ({
    token: '',
    isLoading: false,
    error: null,
    submit: async (e, mutate, code, phone, request_id, user_agent, saveToken, saveUserId, navigate) => {
        e.preventDefault();
        set({ isLoading: true, error: null });

        mutate(
            { code, phone, request_id, user_agent },
            {
                onSuccess: (data: any) => {
                    if (data?.token && data?.user?.id) {
                        console.log("✅ Token received:", data.token);
                        saveToken(data.token);
                        saveUserId(data.user.id)
                        navigate()
                    } else {
                        console.warn("⚠️ No token received in response!");
                        set({ error: "Неверный код подтверждения", isLoading: false });
                    }
                },
                onError: (error: any) => {
                    console.log("❌ Error:", error);
                    set({ error: "Ошибка проверки кода", isLoading: false });
                },
            }
        );
    }
}));