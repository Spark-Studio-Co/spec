import { apiClient } from "../../../app/config/apiClient";

export const applicationsData = async () => {
    try {
        const response = await apiClient.get("/api/tasks?status_id=1&status_id=2&status_id=3")
        console.log("Applications", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching applications data:", error);
        throw error;
    }
};