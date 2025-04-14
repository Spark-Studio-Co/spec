import { apiClient } from "../../../app/config/apiClient";
import { IPayComissionRDO } from "./rdo/pay-comission.rdo";

export const payComission = async (data: IPayComissionRDO) => {
    try {
        const response = await apiClient.patch("api/tasks/set-paid", data)
        console.log("Pay commission response:", response)

        return response.data ?? null
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || error.message || "Failed to pay commission"

        console.error("Pay commission error:", errorMessage)
        throw new Error(errorMessage)
    }
}