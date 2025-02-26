import { apiClient } from "../../../app/config/apiClient";
import { IRecieveCodeRDO } from "./rdo/auth-user.rdo";

export const receiveCode = async (data: IRecieveCodeRDO) => {
    try {
        const response = await apiClient.post("/api/users/receive-sms", data);
        console.log("SMS recieved", response.data)
        return response.data
    } catch {
        console.log("Problems with SMS")
    }
}