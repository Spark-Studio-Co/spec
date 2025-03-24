import { useQuery } from "@tanstack/react-query";
import { noApplicationText } from "./no-application-text.api";

export const useGetNoApplicationText = () => {
    return useQuery({
        queryKey: ['no-application-text'],
        queryFn: noApplicationText,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
