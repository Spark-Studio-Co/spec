import { apiClient } from "../../../app/config/apiClient";
import { IChangeStatusRDO } from "./rdo/change-status.rdo";

export const changeStatus = async (data: IChangeStatusRDO, task_id: number) => {
    try {
        const response = await apiClient.patch(`/api/tasks/${task_id}`, data);
        console.log('Status changed:', response.data);
        return response.data;
    } catch (error: any) {
        console.error("Error changing status:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Failed to change status");
    }
};