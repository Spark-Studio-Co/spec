import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payComission } from "./pay-comission.api";
import { IPayComissionRDO } from "./rdo/pay-comission.rdo";

export const usePayComission = () => {
    const queryClient = useQueryClient();
    
    return useMutation<IPayComissionRDO, Error, IPayComissionRDO>({
        mutationFn: (data) => payComission(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["archive"] })
        }
    })
}