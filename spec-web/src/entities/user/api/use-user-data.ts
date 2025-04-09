import { useAuthData } from "../../auth-user/api/use-auth-data";
import { useQuery } from "@tanstack/react-query";
import { userData } from "./user-data.api";

export const useUserData = () => {
    const { userId } = useAuthData()

    return useQuery({
        queryKey: ['userData'],
        queryFn: () => userData(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}