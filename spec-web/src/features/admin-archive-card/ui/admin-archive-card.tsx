import CommentIcon from "../../../shared/assets/icons/comment-icon"

// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"

interface IApplicationCard {
    id: number
    title: string,
    description: string,
    price_min: string,
    price_max: string,
    commission: string,
    phone: string
    execute_at: string
    address: string
    status_id?: number
    comment?: string
    balance_history: number[]
    performer_name: string
    performer_phone: string
}

export const AdminArchiveCard = ({ title, description, commission, price_min, price_max, phone, execute_at, address, status_id, comment, balance_history, performer_name, performer_phone }: IApplicationCard) => {

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
        <div className="w-full min-h-[234px] py-4 px-3 flex flex-col items-start bg-white rounded-[12px]">
            <span className="font-[600] text-[18px] text-dark">{title}</span>
            <p className="text-[16px] text-[#404040] font-[400] leading-[20px] mt-1">{description}</p>
            <div className="flex flex-row items-center mt-2 gap-x-2">
                <span className="font-[600] text-[16px] text-dark">{price_min} - {price_max} ₸</span>
                <span className="text-[14px] font-[400] text-dark">Комиссия {commission} ₸</span>
            </div>
            <div className="flex flex-row items-center gap-x-1.5">
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
                </a>            </div>

            <span className="text-dark font-[400] text-[14px] mt-4">
                {performer_name}
            </span>

            <div className="flex flex-row items-center gap-x-1.5">
                <PhoneIcon />
                <a href={`tel:${performer_phone}`} className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{performer_phone}</a>
            </div>

            <div className="flex flex-row justify-between mt-4 w-full">
                <span className={`text-[16px] ${status_id === 6 && 'text-[#00C950]'} ${status_id === 4 && 'text-[#FFBB00]'} ${status_id === 5 && 'text-[#FB2C36]'} font-[500]`}>{status_id === 6 && "Выполнен"} {status_id === 4 && "Возврат"} {status_id === 5 && "Отказ клиента"}</span>
                {balance_history?.length === 0 ?
                    <span className="text-[14px] font-[400] flex flex-row gap-x-1 items-center text-[#262626]"><div className="w-[8px] h-[8px] rounded-full bg-[#FB2C36]" />Не оплачено</span>
                    :
                    <span className="text-[14px] font-[400] flex flex-row gap-x-1 items-center text-[#262626]"><div className="w-[8px] h-[8px] rounded-full bg-[#008235]" />Оплачено</span>
                }
            </div>
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
