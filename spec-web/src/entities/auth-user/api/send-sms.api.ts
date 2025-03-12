import { apiClient } from "../../../app/config/apiClient";
import { ISendSmsRDO } from "./rdo/auth-user.rdo";

export const sendSms = async (data: ISendSmsRDO) => {
    try {
        const response = await apiClient.post("/api/users/send-sms", data);
        console.log("SMS received", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Problems with SMS:", error.message);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};