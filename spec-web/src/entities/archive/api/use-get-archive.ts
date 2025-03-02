import { useQuery } from "@tanstack/react-query";
import { archiveData } from "./archive-data.api";

export const useGetArchive = () => {
    return useQuery({
        queryKey: ["archive"],
        queryFn: archiveData,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}