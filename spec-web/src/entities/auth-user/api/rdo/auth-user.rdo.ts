export interface ISendSmsRDO {
    phone: string
}

export interface IVerifySmsRDO {
    phone: string
    code: string
    requet_id: string
}