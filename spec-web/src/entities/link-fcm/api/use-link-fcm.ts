import { useMutation } from "@tanstack/react-query";
import { linkFCM } from "./link-fcm.api";
import { ILinkFCMRDO } from "./rdo/link-fcm.rdo";


export const useLinkFCM = () => {
    return useMutation<ILinkFCMRDO, Error, ILinkFCMRDO>({
        mutationFn: (data) => linkFCM(data)
    })
}
