import { apiClient } from "../../../app/config/apiClient"
import { ICreateApplicationRDO } from "./create-application.rdo"

export const createApplication = async (data: ICreateApplicationRDO) => {
    // Validate the city_id before making the API call
    if (!data.city_id || data.city_id === 0) {
        console.error('Invalid city_id in createApplication:', data.city_id);
        throw new Error('Пожалуйста, выберите город');
    }
    
    console.log('Creating application with data:', JSON.stringify(data, null, 2));
    
    try {
        const response = await apiClient.post("/api/tasks", data);
        console.log('Application Created:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error creating application:', error.response?.data || error.message);
        throw error;
    }
}
