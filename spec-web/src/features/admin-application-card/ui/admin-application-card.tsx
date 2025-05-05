import { Button } from "../../../shared/ui/button/button"


// icons
import ClockIcon from "../../../shared/assets/icons/clock-icon"
import NavigationIcon from "../../../shared/assets/icons/navigation-icon"
import PhoneIcon from "../../../shared/assets/icons/phone-icon"

interface IApplicationCard {
    id: number,
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
    users_tasks_performer_user_idTousers: any
    emergency_call: boolean,
    title: string
}

export const AdminApplicationCard = ({ description, price_min, title, price_max, commission, phone, execute_at, address, onClick, status_id, users_tasks_performer_user_idTousers, emergency_call }: IApplicationCard) => {
    const formatPrice = (price: string): string => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const formatPhoneNumber = (phone: string): string => {
        // Remove all non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        // Format as +7 XXX XXX XX XX
        if (cleaned.length === 11) {
            return `+${cleaned.substring(0, 1)} ${cleaned.substring(1, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7, 9)} ${cleaned.substring(9, 11)}`;
        }
        return phone; // Return original if not 11 digits
    };
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
            className="w-full min-h-[80px] py-4 px-3 flex flex-col items-start bg-white rounded-[12px] cursor-pointer"
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
            <div className="flex flex-row items-center mt-3 gap-x-1.5">
                <PhoneIcon />
                <a href={`tel:${phone}`} className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{formatPhoneNumber(phone)}</a>
            </div>
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
            {users_tasks_performer_user_idTousers &&
                <>
                    <span className="text-dark font-[400] text-[14px] mt-2">
                        {users_tasks_performer_user_idTousers?.fullname}
                    </span>
                    <div className="flex flex-row items-center gap-x-1.5">
                        <PhoneIcon />
                        <a href={`tel:${users_tasks_performer_user_idTousers?.phone}`} className="text-[18px] text-[#007AFF] font-[400] cursor-pointer">{formatPhoneNumber(users_tasks_performer_user_idTousers.phone)}</a>
                    </div>
                </>
            }
            <div className={` ${status_id === 2 && 'mt-2'} flex flex-row justify-between`}>
                <span className={`text-[16px] font-[500] ${status_id === 2 && 'text-[#00A6F4]'} `}>
                    {status_id === 2 && 'Взят'}
                </span>
            </div>
            <div className={` ${status_id === 3 && 'mt-2'} flex flex-row justify-between`}>
                <span className={`text-[16px] font-[500] ${status_id === 3 && 'text-[#00A6F4]'} `}>
                    {status_id === 3 && 'На исполнении'}
                </span>
            </div>
            {emergency_call && <span className="text-[16px] text-[#262626] font-[400] mt-2">🔥 Аварийный вызов</span>}
            {status_id === 1 && <Button
                label={'Начать исполнять'}
                variant="default"
                height="h-[36px]"
                className='mt-5'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick?.();
                }}
            />}
        </div>
    )
}
