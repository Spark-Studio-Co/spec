import { useMutation } from "@tanstack/react-query";
import { payComission } from "./pay-comission.api";
import { IPayComissionRDO } from "./rdo/pay-comission.rdo";

export const usePayComission = () => {
    return useMutation<IPayComissionRDO, Error, IPayComissionRDO>({
        mutationFn: (data) => payComission(data)
    })
}