import { Button } from "../../../shared/button/button"

import { usePopupStore } from "../../../shared/model/popup-store"
import { useTakenApplicationStore } from "../model/taken-application-store"
import { useExecutionApplicationStore } from "../model/execution-application-store"

// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"

interface IApplicationCard {
    title: string,
    description: string,
    price: string,
    comission: string
    phone: string
    date: string
    address: string
    status?: string
    onClick?: () => void
    onRefund?: () => void
    onReject?: () => void
    index: number
}

export const ApplicationCard = ({ title, description, price, comission, phone, date, address, onClick, onRefund, onReject, index }: IApplicationCard) => {
    const popupStore = usePopupStore('phone-popup')
    const { taken } = useTakenApplicationStore()
    const { execution } = useExecutionApplicationStore()

    const isTaken = taken.includes(index)
    const isExecuting = execution === index

    const handlePhoneClick = () => {
        popupStore.setPassedValue(phone)
        popupStore.open()
    }

    return (
        <div className="w-full min-h-[234px] py-4 px-3 flex flex-col items-start bg-white rounded-[12px]">
            <span className="font-[600] text-[18px] text-dark">{title}</span>
            <p className="text-[16px] text-[#404040] font-[400] leading-[20px] mt-1">{description}</p>
            <div className="flex flex-row items-center mt-2 mb-3 gap-x-2">
                <span className="font-[600] text-[16px] text-dark">{price}</span>
                <span className="text-[14px] font-[400] text-dark">{comission}</span>
            </div>
            <div className="flex flex-row items-center gap-x-1.5" onClick={handlePhoneClick}>
                <PhoneIcon />
                <a className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{phone}</a>
            </div>
            <div className="flex flex-row items-center mt-2.5 gap-x-1">
                <ClockIcon />
                <span className="text-[16px] text-[#262626] font-[400]">{date}</span>
            </div>
            <div className="flex flex-row items-center mt-2 gap-x-1">
                <NavigationIcon />
                <span className="text-[16px] text-[#007AFF] font-[400]">{address}</span>
            </div>
            {isTaken &&
                <span className="text-[16px] text-[#00A6F4] font-[500] mt-4">Взят</span>
            }
            {isTaken &&
                <div className="w-full flex flex-row items-center justify-between mt-5 gap-x-2">
                    <Button label="Возврат" variant="transparent" height="h-[36px]" onClick={onRefund} /> 
                    <Button label="Отказ клиента" variant="red" height="h-[36px]" onClick={onReject} />
                </div>
            }
            <Button label={isExecuting ? 'Выполнить' : isTaken ? 'Начать исполнять' : 'Взять'} variant={isExecuting ? "green" : "default"} height="h-[36px]" className={`${isTaken ? 'mt-2' : 'mt-5'}`} onClick={onClick} />
        </div>
    )
}
