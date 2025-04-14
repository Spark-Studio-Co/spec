import { Button } from "../../../shared/ui/button/button"

import { usePopupStore } from "../../../shared/model/popup-store"

// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"
import { useState } from "react"

interface IApplicationCard {
    id: number,
    status_id: 1 | 2 | 3 | 4 | 5 | 6,
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
    emergency_call: boolean
    title: string
}

export const ApplicationCard = ({ description, title, price_min, price_max, commission, phone, execute_at, address, onClick, onRefund, onReject, status_id, emergency_call }: IApplicationCard) => {
    const formatPrice = (price: string): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    const popupStore = usePopupStore('phone-popup')
    const [showButton, setShowButton] = useState<boolean>(false)

    const handlePhoneClick = () => {
        popupStore.setPassedValue(phone)
        popupStore.open()
    }

    const humanReadable = execute_at === "Сейчас"
        ? "Сейчас"
        : new Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC"
        }).format(new Date(execute_at));

    return (
        <div
            className="w-full py-4 px-3 flex flex-col items-start bg-white rounded-[12px] cursor-pointer"
            onClick={(e) => {
                if (e.target === e.currentTarget || e.target instanceof Element && e.currentTarget.contains(e.target) && !e.target.closest('button, a')) {
                    setShowButton(!showButton);
                }
            }}
        >
            <span className="font-[600] text-[18px] text-dark">{title}</span>
            <p className="text-[16px] text-[#404040] font-[400] leading-[20px] mt-1">{description}</p>
            <div className="flex flex-row items-center mt-2 gap-x-2">
                {price_min === price_max ?
                    <span className="font-[600] text-[16px] text-dark">{formatPrice(price_min)} ₸</span> :
                    <span className="font-[600] text-[16px] text-dark">{formatPrice(price_min)} - {formatPrice(price_max)} ₸</span>
                }
                <span className="text-[14px] font-[400] text-dark">
                    Комиссия {formatPrice(commission)} ₸
                </span>
            </div>
            {(status_id === 2 || status_id === 3) && (
                <div className="flex flex-row items-center mt-3 gap-x-1.5" onClick={handlePhoneClick}>
                    <PhoneIcon />
                    <a className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{phone}</a>
                </div>
            )}
            <div className="flex flex-row items-center mt-1.5 gap-x-1">
                <ClockIcon />
                <span className="text-[16px] text-[#262626] font-[400]">{humanReadable}</span>
            </div>
            <div className="flex flex-row items-center mt-2 gap-x-1">
                <NavigationIcon />
                <a
                    href={`https://2gis.kz/search/${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-[#007AFF] font-[400] underline"
                >
                    {address}
                </a>            </div>
            <div className={`${status_id === 2 && 'mt-2'} flex flex-row justify-between`}>
                <span className={`text-[16px] font-[500] ${status_id === 2 && 'text-[#00A6F4]'} `}>
                    {status_id === 2 && 'Взят'}
                </span>
            </div>
            {emergency_call && <span className="text-[16px] text-[#262626] font-[400] mt-2">🔥 Аварийный вызов</span>}
            {(status_id === 2 || status_id === 3) && (
                <div className="w-full flex flex-row items-center justify-between mt-5 gap-x-2">
                    <Button label="Возврат" variant="transparent" height="h-[36px]" onClick={onRefund} />
                    <Button label="Отказ клиента" variant="red" height="h-[36px]" onClick={onReject} />
                </div>
            )}
            {(showButton || status_id === 2 || status_id === 3) && (
                <Button
                    type="button"
                    label={status_id === 3 ? 'Выполнить' : status_id === 2 ? 'Начать исполнять' : 'Взять'}
                    variant={status_id === 3 ? "green" : "default"}
                    height="h-[36px]"
                    className={`${status_id === 2 ? 'mt-2' : 'mt-5'}`}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation();
                        onClick?.();
                    }}
                />
            )}
        </div>
    )
}
