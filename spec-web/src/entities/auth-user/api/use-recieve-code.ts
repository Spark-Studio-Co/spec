import { useMutation } from "@tanstack/react-query";
import { receiveCode } from "./recieve-code.api";
import { IRecieveCodeRDO } from "./auth-user.rdo";

export const useRecieveCode = () => {
    return useMutation<IRecieveCodeRDO, Error, IRecieveCodeRDO>({
        mutationFn: (data) => receiveCode(data),
    });
};