import { useQuery } from "@tanstack/react-query";
import { citiesData } from "./ctites-data.api";

export const useGetCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: citiesData,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    })
}
