import { apiClient } from "../../../app/config/apiClient";
import { ILinkFCMRDO } from "./rdo/link-fcm.rdo";


export const linkFCM = async (data: ILinkFCMRDO) => {
    try {
        const response = await apiClient.post('/api/users/link-fcm', data)
        console.log("FCM Linked", response.data);
        return response.data
    } catch (error: any) {
        return error?.response?.data
    }
}
