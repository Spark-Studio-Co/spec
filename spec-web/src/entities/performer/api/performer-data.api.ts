import { apiClient } from "../../../app/config/apiClient";
import { IPerformerDataDTO } from "./performer-data.dto";
import { ISendCodeRDO } from "../../auth-user/api/rdo/auth-user.rdo";

export const performerData = async (data: ISendCodeRDO): Promise<IPerformerDataDTO> => {
    try {
        const response = await apiClient.post("/api/users/send-sms", data);
        console.log("✅ Performer Data Fetched:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("🚨 Failed to fetch performer data:", error.response?.data || error.message);
        throw error;
    }
};