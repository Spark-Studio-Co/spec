import CalendarIcon from "../../../shared/assets/icons/calendar-icon"

interface IStatisticsCardProps {
    date: string
    applications: number
    totalEarned: number
    commission: number
    earned: number
}

export const StatisticsCard = ({ date, applications, totalEarned, commission, earned }: IStatisticsCardProps) => {
    return (
        <>
            <div
                className="flex flex-row items-center justify-between cursor-pointer mt-4"
            >
                <span className="text-[14px] font-[500] text-dark">Статистика</span>
                <div className='flex flex-row items-center justify-center gap-x-1 w-[101px] py-1 bg-white rounded-[8px]'>
                    <span className='font-[400] text-[14px] text-[#404040]'>{date}</span>
                    <CalendarIcon />
                </div>
            </div>
            <div className='w-full bg-white rounded-[12px] p-3 mt-2'>
                <div className="flex flex-col gap-y-1.5">
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-[14px] text-[#404040] font-[400]">Заявок</span>
                        <span className="text-[14px] text-[#404040] font-[400]">{applications}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-[14px] text-[#404040] font-[400]">Общий заработок</span>
                        <span className="text-[14px] text-[#404040] font-[400]">{totalEarned.toLocaleString()} <span className="font-[700]">₸</span></span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-[14px] text-[#404040] font-[400]">Комиссия</span>
                        <span className="text-[14px] text-[#404040] font-[400]">{commission.toLocaleString()} <span className="font-[700]">₸</span></span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-[16px] text-[#171717] font-[500]">Заработано</span>
                        <span className="text-[16px] text-[#171717] font-[500]">{earned.toLocaleString()} ₸</span>
                    </div>
                </div>
            </div>
        </>
    )
}
