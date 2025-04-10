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
        password: string,
        user_agent: string,
        saveToken: (token: string) => void,
        saveUserId: (userId: number) => void,
        navigate: () => void,
    ) => void;
}

export const useVerifySmsStore = create<IVerifySmsStore>((set) => ({
    token: '',
    isLoading: false,
    error: null,
    submit: async (e, mutate, code, phone, request_id, user_agent, password, saveToken, saveUserId, navigate) => {
        e.preventDefault();
        set({ isLoading: true, error: null });

        mutate(
            { code, phone, request_id, user_agent, password },
            {
                onSuccess: (response: any) => {
                    const data = response?.data || response;
                    if (data?.token && data?.id) {
                        console.log("✅ Token received:", data.token);
                        saveToken(data.token);
                        console.log("✅ Id received:", data.id);
                        saveUserId(data.id)
                        navigate()
                    } else if (data?.token) {
                        console.log("✅ Token received:", data.token);
                        saveToken(data.token);
                        navigate()
                    }
                    else {
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