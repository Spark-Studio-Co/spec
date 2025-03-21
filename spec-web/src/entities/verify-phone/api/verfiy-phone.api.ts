import { apiClient } from "../../../app/config/apiClient";
import { IVerifyPhoneRDO } from "./rdo/verify-phone.rdo";

export const verifyPhone = async (phone: IVerifyPhoneRDO) => {
    try {
        const response = await apiClient.post("/api/users/verify-phone", phone);
        console.log("Phone verified", response.data);
        return response.data
    } catch (error: any) {
        return error.response.data;
    }
}
