import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../app/config/apiClient";


export const useAdminCheck = (id: number | null) => {
    return useQuery({
        queryKey: ["isAdmin", id],
        queryFn: async ({ queryKey }) => {
            const [, rawId] = queryKey;
            const numericId = Number(rawId);
            const { data } = await apiClient.get(`api/admin/is-admin/${numericId}`)
            return data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
