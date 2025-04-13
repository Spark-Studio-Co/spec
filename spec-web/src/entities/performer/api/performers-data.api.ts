import { apiClient } from "../../../app/config/apiClient";

export const performersData = async (fullname: string, city_id: number) => {
    try {
        const response = await apiClient.get(`/api/users?city_id=${city_id}`, {
            params: {
                fullname: fullname,
            }
        })
        console.log("Performers:", response.data)
        return response.data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}
