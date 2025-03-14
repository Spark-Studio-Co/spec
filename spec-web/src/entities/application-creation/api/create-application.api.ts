import { apiClient } from "../../../app/config/apiClient"
import { ICreateApplicationRDO } from "./create-application.rdo"

export const createApplication = async (data: ICreateApplicationRDO) => {
    try {
        const response = await apiClient.post("/api/tasks", data);
        console.log('Application Created:', response.data);
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        throw error
    }
}
