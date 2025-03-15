import { useMutation } from "@tanstack/react-query";
import { takeApplication } from "./take-application.api";
import { ITakeApplicationRDO } from "./rdo/take-application.rdo";

interface ITakeApplication {
    data: ITakeApplicationRDO,
    id: number | null
}

export const useTakeApplication = () => {
    return useMutation<ITakeApplicationRDO, Error, ITakeApplication>({
        mutationFn: ({ data, id }) => takeApplication(data, id)
    })
}
