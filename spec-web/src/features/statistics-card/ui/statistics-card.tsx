import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CalendarIcon from "../../../shared/assets/icons/calendar-icon"

interface IStatisticsCardProps {
    date: string
    applications: number
    totalEarned: number
    commission: number
    earned: number
    isNull?: boolean
    onDateChange?: (date: Date | null) => void
}

export const StatisticsCard = ({ date, applications, totalEarned, commission, earned, isNull, onDateChange }: IStatisticsCardProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
        if (date.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
            const [day, month, year] = date.split('.')
            const parsedDate = new Date(`${year}-${month}-${day}`)
            if (!isNaN(parsedDate.getTime())) {
                return parsedDate
            }
        }

        const parsedDate = new Date(date)
        return isNaN(parsedDate.getTime()) ? new Date() : parsedDate
    })

    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) : date
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    const handleClickOutside = () => {
        if (isDatePickerOpen) {
            setIsDatePickerOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isDatePickerOpen])

    return (
        <>
            <div
                className="flex flex-row items-center justify-between cursor-pointer mt-4"
            >
                <span className="text-[14px] font-[500] text-dark">Статистика</span>
                <div className='relative'>
                    <div
                        className='flex flex-row items-center justify-center gap-x-1 w-[101px] py-1 bg-white rounded-[8px] cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsDatePickerOpen(!isDatePickerOpen)
                        }}
                    >
                        <span className='font-[400] text-[14px] text-[#404040]'>{formattedDate}</span>
                        <CalendarIcon />
                    </div>
                    {isDatePickerOpen && (
                        <div
                            className='absolute z-10 top-full right-0 mt-1'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date: Date | null) => {
                                    setSelectedDate(date)
                                    setIsDatePickerOpen(false)
                                    if (onDateChange) {
                                        onDateChange(date)
                                    }
                                }}
                                inline
                                popperClassName='z-50'
                            />
                        </div>
                    )}
                </div>
            </div>
            {isNull ? null : <div className='w-full bg-white rounded-[12px] p-3 mt-2'>
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
            </div>}
        </>
    )
}
