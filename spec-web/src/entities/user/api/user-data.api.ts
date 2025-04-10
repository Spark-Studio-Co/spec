import axios from "axios";

export const userData = async (token: string) => {
    try {
        const response = await axios.get(
            `https://spec-backend-production.up.railway.app/api/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("User data", response.data);
        return response.data;
    } catch (error: any) {
        return error.response?.data;
    }
};