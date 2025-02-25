import { apiClient } from "../../../app/config/apiClient";
import { IRecieveCodeDTO } from "./auth-user.dto";

export const receiveCode = async (data: IRecieveCodeDTO) => {
    try {
        const response = await apiClient.post("/api/user/receive-sms", data);

        console.log("SMS recieved", response.data)
    } catch {
        console.log("Problems with SMS")
    }
}