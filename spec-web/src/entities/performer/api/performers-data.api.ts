import { apiClient } from "../../../app/config/apiClient";

export const performersData = async () => {
    try {
        const response = await apiClient.get("/api/users")
        console.log("Performers:", response.data)
        return response.data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}
