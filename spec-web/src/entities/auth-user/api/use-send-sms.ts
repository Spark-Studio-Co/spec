import { useMutation } from "@tanstack/react-query";
import { sendSms } from "./send-sms.api";
import { ISendSmsRDO } from "./rdo/auth-user.rdo";

export const useSendSms = () => {
    return useMutation<ISendSmsRDO, Error, ISendSmsRDO>({
        mutationFn: (data) => sendSms(data),
    });
};