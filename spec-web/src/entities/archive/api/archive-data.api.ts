import { apiClient } from "../../../app/config/apiClient";

export const archiveData = async () => {
    try {
        const response = await apiClient.get("/api/tasks?status_id=6&status_id=5&status_id=4")
        console.log("Archive", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching archive data:", error);
        throw error;
    };
}