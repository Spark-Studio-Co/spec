import { apiClient } from "../../../app/config/apiClient";
import { ITakeApplicationRDO } from "./rdo/take-application.rdo";

export const takeApplication = async (data: ITakeApplicationRDO, id: number | null) => {
    try {
        const response = await apiClient.patch(`/api/tasks/${id}`, data);
        console.log('Taken app admin:', response.data);
        return response.data;
    } catch (error: any) {
        console.error("❌ Error taking application:", error.message);
        throw error;
    }
};