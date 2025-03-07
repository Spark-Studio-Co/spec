import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "./admin-login";
import { IAdminLoginRDO } from "./rdo/admin-login.rdo";

export const useAdminLogin = () => {
    return useMutation<IAdminLoginRDO, Error, IAdminLoginRDO>({
        mutationFn: (data) => adminLogin(data)
    })
}