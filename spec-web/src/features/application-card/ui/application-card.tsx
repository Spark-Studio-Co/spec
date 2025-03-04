import { Button } from "../../../shared/button/button"

import { usePopupStore } from "../../../shared/model/popup-store"
import { useTakenApplicationStore } from "../model/taken-application-store"
import { useExecutionApplicationStore } from "../model/execution-application-store"

// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"
import { useState } from "react"

interface IApplicationCard {
    id: number
    title: string,
    description: string,
    price_min: string,
    price_max: string,
    commission: string
    phone: string
    execute_at: string
    address: string
    status?: string
    onClick?: () => void
    onRefund?: () => void
    onReject?: () => void
    index: number
    isPaid?: boolean
}

export const ApplicationCard = ({ title, description, price_min, price_max, commission, phone, execute_at, address, onClick, onRefund, onReject, index, isPaid }: IApplicationCard) => {
    const popupStore = usePopupStore('phone-popup')
    const [showButton, setShowButton] = useState<boolean>(false)
    const { taken } = useTakenApplicationStore()
    const { execution } = useExecutionApplicationStore()



    const isTaken = taken.includes(index)
    const isExecuting = execution === index

    const handlePhoneClick = () => {
        popupStore.setPassedValue(phone)
        popupStore.open()
    }


    const isoDate = execute_at;
    const humanReadable = new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC"
    }).format(new Date(isoDate));

    return (
        <div
            className="w-full min-h-[80px] py-4 px-3 flex flex-col items-start bg-white rounded-[12px] cursor-pointer"
            onClick={(e) => {
                if (e.target === e.currentTarget || e.target instanceof Element && e.currentTarget.contains(e.target) && !e.target.closest('button, a')) {
                    setShowButton(!showButton);
                }
            }}
        >
            <span className="font-[600] text-[18px] text-dark">{title}</span>
            <p className="text-[16px] text-[#404040] font-[400] leading-[20px] mt-1">{description}</p>
            <div className="flex flex-row items-center mt-2 gap-x-2">
                <span className="font-[600] text-[16px] text-dark">{price_min} - {price_max} ₸</span>
                <span className="text-[14px] font-[400] text-dark">Комиссия {parseInt(price_min) / parseInt(commission)} - {parseInt(price_max) / parseInt(commission)} ₸</span>
            </div>
            {isTaken && <div className="flex flex-row items-center mt-3 gap-x-1.5" onClick={handlePhoneClick}>
                <PhoneIcon />
                <a className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{phone}</a>
            </div>}
            <div className="flex flex-row items-center mt-1.5 gap-x-1">
                <ClockIcon />
                <span className="text-[16px] text-[#262626] font-[400]">{humanReadable}</span>
            </div>
            <div className="flex flex-row items-center mt-2 gap-x-1">
                <NavigationIcon />
                <span className="text-[16px] text-[#007AFF] font-[400]">{address}</span>
            </div>
            {isTaken &&
                <div className="flex flex-row justify-between mt-4">
                    <span className="text-[16px] text-[#00A6F4] font-[500]">Взят</span>
                    {isPaid &&
                        <span className="text-[14px] font-[400]flex flex-row gap-x-1 items-center text-[#262626]"><div className="w-[8px] h-[8px] rounded-full bg-[#FB2C36]" />Не оплачено</span>
                    }
                </div>
            }
            {isTaken &&
                <div className="w-full flex flex-row items-center justify-between mt-5 gap-x-2">
                    <Button label="Возврат" variant="transparent" height="h-[36px]" onClick={onRefund} />
                    <Button label="Отказ клиента" variant="red" height="h-[36px]" onClick={onReject} />
                </div>
            }
            {showButton && (
                <Button
                    label={isExecuting ? 'Выполнить' : isTaken ? 'Начать исполнять' : 'Взять'}
                    variant={isExecuting ? "green" : "default"}
                    height="h-[36px]"
                    className={`${isTaken ? 'mt-2' : 'mt-5'}`}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when clicking button
                        onClick?.();
                    }}
                />
            )}
        </div>
    )
}
