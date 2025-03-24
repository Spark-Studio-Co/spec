import { apiClient } from "../../../app/config/apiClient";

export const noApplicationText = async () => {
    try {
        const response = await apiClient.post('/api/application-text', {
            text: 'No applications available'
        })
        console.log('No application text:', response.data)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}


