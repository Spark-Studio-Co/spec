import { apiClient } from "../../../app/config/apiClient";
import { IPerformerDataDTO } from "./dto/performer-data.dto";
import { ISendCodeRDO } from "./rdo/auth-user.rdo";

export const sendCode = async (data: ISendCodeRDO): Promise<IPerformerDataDTO> => {
    try {
        const response = await apiClient.post('/api/users/send-sms', data);
        console.log('Code sent successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Failed to send code:', error.response?.data || error.message);
        throw error;
    }
}