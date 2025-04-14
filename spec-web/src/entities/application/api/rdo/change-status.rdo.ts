export interface IChangeStatusRDO {
    status_id: number,
    performer_user_id: number | null,
    comment?: string | null,
}