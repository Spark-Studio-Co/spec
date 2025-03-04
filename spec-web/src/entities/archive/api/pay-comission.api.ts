import { apiClient } from "../../../app/config/apiClient";
import { IPayComissionRDO } from "./rdo/pay-comission.rdo";

export const payComission = async (data: IPayComissionRDO) => {
    try {
        const response = await apiClient.post("api/tasks/set-paid", data)
        console.log("Paid", response.data)
        return response.data
    } catch (error: any) {
        console.log(error.response.message, error)
    }
}