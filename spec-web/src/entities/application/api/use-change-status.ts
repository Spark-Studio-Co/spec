import { changeStatus } from "./change-status.api";
import { useMutation } from "@tanstack/react-query";
import { IChangeStatusRDO } from "./rdo/change-status.rdo";

export const useChangeStatus = () => {
    return useMutation<IChangeStatusRDO, Error, { data: IChangeStatusRDO, task_id: number }>({
        mutationFn: ({ data, task_id }) => changeStatus(data, task_id)
    })
}