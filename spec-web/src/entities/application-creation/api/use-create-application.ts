import { useMutation } from "@tanstack/react-query";
import { ICreateApplicationRDO } from "./create-application.rdo";
import { createApplication } from "./create-application.api";


export const useCreateApplication = () => {
    return useMutation<ICreateApplicationRDO, Error, ICreateApplicationRDO>({
        mutationFn: (data) => createApplication(data)
    })
}
