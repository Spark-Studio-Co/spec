import { Button } from "../../../shared/ui/button/button"


// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"

interface IApplicationCard {
    id: number,
    title: string,
    status_id: number
    description: string,
    price_min: string,
    price_max: string,
    commission: string
    phone: string
    execute_at: string
    address: string
    onClick?: () => void
    performer_name: string
    performer_phone: string
}

export const AdminApplicationCard = ({ title, description, price_min, price_max, commission, phone, execute_at, address, onClick, performer_name, performer_phone }: IApplicationCard) => {
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
        >
            <span className="font-[600] text-[18px] text-dark">{title}</span>
            <p className="text-[16px] text-[#404040] font-[400] leading-[20px] mt-1">{description}</p>
            <div className="flex flex-row items-center mt-2 gap-x-2">
                <span className="font-[600] text-[16px] text-dark">{price_min} - {price_max} ₸</span>
                <span className="text-[14px] font-[400] text-dark">
                    Комиссия {Math.round(parseInt(price_min) / parseInt(commission))} -
                    {Math.round(parseInt(price_max) / parseInt(commission))} ₸
                </span>
            </div>
            <div className="flex flex-row items-center mt-3 gap-x-1.5">
                <PhoneIcon />
                <a href={`tel:${phone}`} className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{phone}</a>
            </div>
            <div className="flex flex-row items-center mt-1.5 gap-x-1">
                <ClockIcon />
                <span className="text-[16px] text-[#262626] font-[400]">{humanReadable}</span>
            </div>
            <div className="flex flex-row items-center mt-2 gap-x-1">
                <NavigationIcon />
                <span className="text-[16px] text-[#007AFF] font-[400]">{address}</span>
            </div>

            <span className="text-dark font-[400] text-[14px] mt-4">
                {performer_name}
            </span>

            <div className="flex flex-row items-center gap-x-1.5">
                <PhoneIcon />
                <a href={`tel:${performer_phone}`} className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{performer_phone}</a>
            </div>
            {/* <div className="flex flex-row justify-between mt-4">
                <span className={`text-[16px] font-[500] ${status_id === 2 && 'text-[#00A6F4]'} `}>
                    {status_id === 2 && 'Взят'}
                </span>
            </div> */}
            <Button
                label={'Начать исполнять'}
                variant="default"
                height="h-[36px]"
                className='mt-5'
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
            />
        </div>
    )
}
