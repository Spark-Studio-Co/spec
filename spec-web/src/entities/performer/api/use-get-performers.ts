import { useQuery } from "@tanstack/react-query";
import { performersData } from "./performers-data.api";


export const useGetPerformers = (fullname: string = '', city_id: number = 0) => {
    return useQuery({
        queryKey: ["performers", fullname, city_id],
        queryFn: () => performersData(fullname, city_id),
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
}
