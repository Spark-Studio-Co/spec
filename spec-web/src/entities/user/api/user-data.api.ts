import axios from "axios";

export const userData = async (id: number | null) => {

    try {
        const response = await axios.get(`https://spec-backend-production.up.railway.app/api/users/me/${id}`)
        console.log("User data", response.data);
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}
