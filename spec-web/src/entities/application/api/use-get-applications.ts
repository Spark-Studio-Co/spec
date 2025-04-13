import { useQuery } from "@tanstack/react-query";
import { applicationsData } from "./applications-data.api";

export const useGetApplications = (id?: number | null, city_id?: number | null) => {
    return useQuery({
        queryKey: ["applications", id, city_id],
        queryFn: () => applicationsData(id, city_id),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: true,
    });
};