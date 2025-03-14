export interface ICreateApplicationRDO {
    city_id: number;
    city_area: string;
    category_id: number;
    execute_at: string;
    title: string;
    description: string;
    price_min: number;
    price_max: number;
    commission: number;
    phone: string;
    address: string;
    status_id: number;
    creator_user_id: number | null;
    performer_user_id: number | null;
    emergency_call: boolean;
}