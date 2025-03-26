export interface ISendSmsRDO {
    phone: string
}

export interface IVerifySmsRDO {
    phone: string
    code: string
    request_id: string
    temporaryKey: string
}