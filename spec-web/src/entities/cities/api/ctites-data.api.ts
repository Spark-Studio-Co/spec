import { apiClient } from "../../../app/config/apiClient";

export const citiesData = async () => {
    try {
        const response = await apiClient.get('/api/cities');
        console.log("Cities:", response.data)
        return response.data
    } catch (error: any) {
        console.log(error?.message)
        throw error
    }
}
