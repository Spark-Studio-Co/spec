import { Button } from "../../../shared/ui/button/button"

import CommentIcon from "../../../shared/assets/icons/comment-icon"

import { usePopupStore } from "../../../shared/model/popup-store"
// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"

interface IApplicationCard {
    id: number
    title: string,
    description: string,
    price: string,
    price_min: string,
    price_max: string,
    commission: string,
    phone: string
    execute_at: string
    address: string
    status_id?: number
    onClick?: () => void
    comment?: string
    balance_history: number[]
    isLoading: boolean
}

export const ArchiveCard = ({ title, description, commission, price_min, price_max, phone, execute_at, address, onClick, status_id, comment, balance_history, id, isLoading }: IApplicationCard) => {
    const formatPrice = (price: string): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    const popupStore = usePopupStore('phone-popup')

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
        <div className="w-full min-h-[234px] py-4 px-3 flex flex-col items-start bg-white rounded-[12px]">
            <span className="font-[600] text-[18px] text-dark">{title}</span>
            <p className="text-[16px] text-[#404040] font-[400] leading-[20px] mt-1">{description}</p>
            <div className="flex flex-row items-center mt-2 gap-x-2">
                {price_min === price_max ?
                    <span className="font-[600] text-[16px] text-dark">{formatPrice(price_min)} ₸</span> :
                    <span className="font-[600] text-[16px] text-dark">{formatPrice(price_min)} - {formatPrice(price_max)} ₸</span>
                }
                <span className="text-[14px] font-[400] text-dark">Комиссия {formatPrice(commission)} ₸</span>
            </div>
            <div className="flex flex-row items-center gap-x-1.5" onClick={handlePhoneClick}>
                <PhoneIcon />
                <a href={`tel:${phone}`} className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{phone}</a>
            </div>
            <div className="flex flex-row items-center mt-2.5 gap-x-1">
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
                </a>
            </div>
            <div className="flex flex-row justify-between mt-4 w-full">
                <span className={`text-[16px] ${status_id === 6 && 'text-[#00C950]'} ${status_id === 4 && 'text-[#FFBB00]'} ${status_id === 5 && 'text-[#FB2C36]'} font-[500]`}>{status_id === 6 && "Выполнен"} {status_id === 4 && "Возврат"} {status_id === 5 && "Отказ клиента"}</span>
                {balance_history?.length === 0 ?
                    <span className="text-[14px] font-[400] flex flex-row gap-x-1 items-center text-[#262626]"><div className="w-[8px] h-[8px] rounded-full bg-[#FB2C36]" />Не оплачено</span>
                    :
                    <span className="text-[14px] font-[400] flex flex-row gap-x-1 items-center text-[#262626]"><div className="w-[8px] h-[8px] rounded-full bg-[#008235]" />Оплачено</span>
                }
            </div>
            {status_id === 6 && (balance_history?.length === 0 || (balance_history && balance_history.includes(id))) && (
                <Button type="button" label={isLoading ? 'Загрузка...' : `Оплатить  ${formatPrice(commission)} ₸`} variant={isLoading ? 'disabled' : 'default'} height="h-[36px]" className='mt-5' onClick={onClick} />
            )}
            {status_id === 4 &&
                <div className="flex flex-row items-start gap-x-1.5 mt-3">
                    <CommentIcon />
                    <span className="text-[16px] text-[#404040] font-[400] -mt-1.5">{comment}</span>
                </div>
            }
            {status_id === 5 &&
                <div className="flex flex-row items-start gap-x-1.5 mt-3">
                    <CommentIcon />
                    <span className="text-[16px] text-[#404040] font-[400] -mt-1.5">{comment}</span>
                </div>
            }
        </div>
    )
}
