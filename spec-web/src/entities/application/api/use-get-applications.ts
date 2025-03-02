import { useQuery } from "@tanstack/react-query";
import { applicationsData } from "./applications-data.api";

export const useGetApplications = () => {
    return useQuery({
        queryKey: ["applications"],
        queryFn: applicationsData,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
};