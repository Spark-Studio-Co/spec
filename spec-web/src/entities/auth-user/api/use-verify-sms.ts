import { useMutation } from "@tanstack/react-query";
import { verifySms } from "./verify-sms.api";
import { IVerifySmsRDO } from "./rdo/auth-user.rdo";
import { IPerformerDataDTO } from "./dto/performer-data.dto";

export const useSendCode = () => {
    return useMutation<IPerformerDataDTO, Error, IVerifySmsRDO>({
        mutationFn: (data) => verifySms(data),
    })
}