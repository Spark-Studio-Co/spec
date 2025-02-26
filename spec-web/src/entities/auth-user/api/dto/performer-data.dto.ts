export interface IPerformerDataDTO {
    user: {
        id: number;
        username: string | null;
        fullname: string | null;
        phone: string;
        role: string;
    };
    token: string;
}