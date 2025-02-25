import { useMutation } from "@tanstack/react-query";
import { sendCode } from "./send-code.api";
import { ISendCodeRDO } from "./auth-user.rdo";

export const useSendCode = () => {
    return useMutation<ISendCodeRDO, Error, ISendCodeRDO>({
        mutationFn: (data) => sendCode(data),
    })
}