import { useQuery } from "@tanstack/react-query";
import { applicationText } from "./application-text.api";

export const useGetApplicationText = () => {
    return useQuery({
        queryKey: ['application-text'],
        queryFn: applicationText,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
