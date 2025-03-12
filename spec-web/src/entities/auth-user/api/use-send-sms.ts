import { useMutation } from "@tanstack/react-query";
import { sendSms } from "./send-sms.api";
import { ISendSmsRDO } from "./rdo/auth-user.rdo";

export const useSendSms = () => {
    return useMutation<ISendSmsRDO | { success: false; message: string }, Error, ISendSmsRDO>({
        mutationFn: async (data) => {
            const result = await sendSms(data);
            if (!result.success) {
                throw new Error(result.message);
            }
            return result;
        },
    });
};