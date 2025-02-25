import { apiClient } from "../../../app/config/apiClient";

export const sendCode = async () => {
    try {
        const response = await apiClient.post('/api/user/send-sms')
        console.log('Code sended', response.data)
    } catch {
        console.error('Code was not sended')
    }
}