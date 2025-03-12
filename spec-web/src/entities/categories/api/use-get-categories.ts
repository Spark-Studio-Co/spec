import { categoriesData } from "./categories-data.api"
import { useQuery } from "@tanstack/react-query"

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categoriesData,
        staleTime: 5 * 60 * 1000,
        retry: 2
    })
}
