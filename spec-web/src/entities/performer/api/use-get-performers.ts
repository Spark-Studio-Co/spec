import { useQuery } from "@tanstack/react-query";
import { performersData } from "./performers-data.api";


export const useGetPerformers = () => {
    return useQuery({
        queryKey: ["performers"],
        queryFn: performersData,
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
}
