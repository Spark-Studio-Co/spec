import { useQuery } from "@tanstack/react-query";
import { userData } from "./user-data.api";
import { useAuthStore } from "../../auth-user/api/use-auth-data";

export const useUserData = () => {
    const { token } = useAuthStore()
    return useQuery({
        queryKey: ['userData'],
        queryFn: () => userData(token ?? ''),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}