import { apiClient } from "../../../app/config/apiClient";

export const noApplicationText = async () => {
    try {
        const response = await apiClient.get('/api/forms')
        console.log('No application text:', response.data)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}


