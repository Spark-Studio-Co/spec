import { apiClient } from "../../../app/config/apiClient";

export const categoriesData = async () => {
    try {
        const response = await apiClient.get("/api/categories");
        console.log("Categories:", response.data)
        return response.data
    } catch (error: any) {
        console.log(error?.message)
        throw error
    }
}
