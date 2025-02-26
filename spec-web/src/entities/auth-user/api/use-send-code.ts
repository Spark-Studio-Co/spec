import { useMutation } from "@tanstack/react-query";
import { sendCode } from "./send-code.api";
import { ISendCodeRDO } from "./rdo/auth-user.rdo";
import { IPerformerDataDTO } from "./dto/performer-data.dto";

export const useSendCode = () => {
    return useMutation<IPerformerDataDTO, Error, ISendCodeRDO>({
        mutationFn: (data) => sendCode(data),
    })
}