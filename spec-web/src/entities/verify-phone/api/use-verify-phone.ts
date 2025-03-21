import { useMutation } from "@tanstack/react-query";
import { verifyPhone } from "./verfiy-phone.api";
import { IVerifyPhoneRDO } from "./rdo/verify-phone.rdo";

export const useVerifyPhone = () => {
    return useMutation<any, Error, IVerifyPhoneRDO>({
        mutationFn: verifyPhone
    });
}