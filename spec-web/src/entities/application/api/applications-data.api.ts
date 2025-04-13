import { apiClient } from "../../../app/config/apiClient";

export const applicationsData = async (id?: number | null, city_id?: number | null) => {
    try {
        const response = await apiClient.get(`/api/tasks?status_id=1&status_id=2&status_id=3&performer_user_id=${id}&city_id=${city_id}`)
        console.log("Applications", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching applications data:", error);
        throw error;
    }
};