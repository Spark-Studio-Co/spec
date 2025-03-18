import { apiClient } from "../../../app/config/apiClient";
import { IAdminLoginRDO } from "./rdo/admin-login.rdo";

export const adminLogin = async (data: IAdminLoginRDO) => {
    try {
        const response = await apiClient.post('api/admin/login', data)
        console.log('Admin login', response.data)
        return response.data
    }
    catch (error: any) {
        console.error('Failed to login:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Ошибка авторизации");
    }
}
