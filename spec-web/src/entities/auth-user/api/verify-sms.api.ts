import { apiClient } from "../../../app/config/apiClient";
import { IPerformerDataDTO } from "./dto/performer-data.dto";
import { IVerifySmsRDO } from "./rdo/auth-user.rdo";

export const verifySms = async (data?: IVerifySmsRDO): Promise<IPerformerDataDTO> => {
    try {
        const response = await apiClient.post('/api/users/verify-sms', data);
        console.log('Code sent successfully:', response.data);
        return response.data
    } catch (error: any) {
        console.error('Failed to send code:', error.response?.data || error.message);
        throw error;
    }
}