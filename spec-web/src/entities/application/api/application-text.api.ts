import { apiClient } from "../../../app/config/apiClient";

export const applicationText = async () => {
    try {
        const response = await apiClient.get('/api/application-text');
        console.log('Application text', response.data)
        return response.data
    } catch (error: any) {
        console.log(error.message)
        throw error
    }
}
