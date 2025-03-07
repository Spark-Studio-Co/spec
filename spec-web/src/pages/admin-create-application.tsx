import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BackArrowIcon from "../shared/assets/icons/back-arrow-icon";
import { Button } from "../shared/ui/button/button";
import { Selector } from "../shared/ui/selector/selector";
import { Input } from "../shared/ui/input/input";
import { Checkbox } from "../shared/ui/checkbox/checkbox";

import BigCalendarIcon from '../shared/assets/icons/big-calendar-icon';

import { useVisibleStore } from "../shared/model/visible-store";
import { useNavigate } from "react-router";

const cities = ['Almaty', 'Karaganda', 'Astana']

export const AdminCreateApplication = () => {
    const { isVisible, toggle, open } = useVisibleStore('time')
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    useEffect(() => {
        open()
    }, [])

    const navigate = useNavigate()

    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) : '01.12.2025'

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    navigate(-1)
                }}
                className="bg-[#F5F5F5] w-10 h-10 rounded-[8px] absolute left-4 top-10 flex items-center justify-center"
            >
                <BackArrowIcon />
            </button>
            <div className="mt-16 h-full">
                <Selector isIcon={false} label="Город" options={cities} storeKey="citiesSelector" />
                <Input placeholder="Адрес" baseStyle="applicationStyle" className="mt-2" />
                <Input placeholder="Категория" baseStyle="applicationStyle" className="mt-2" />
                <textarea
                    className="w-full mt-2 px-4 py-2 border border-[#737373] rounded-[8px] outline-none h-[88px]"
                    placeholder='Причина возврата'
                />
                <Input placeholder="Категория" variant="phone" baseStyle="applicationStyle" className="mt-2" />
                <div className="w-fill justify-between items-center flex mt-4">
                    <span className="text-[#171717] font-[500] text-[18px]">Цена</span>
                    <span className="text-[#171717] font-[500] text-[18px]">Комиссия</span>
                </div>
                <div className="flex flex-row justify-baseline items-center gap-x-2">
                    <Input placeholder="Макс." baseStyle="applicationStyle" className="mt-2" />
                    <Input placeholder="Мин." baseStyle="applicationStyle" className="mt-2" />
                    <Input placeholder="0" baseStyle="applicationStyle" className="mt-2" />
                </div>
                <div className="flex flex-row items-center mt-5 gap-x-2">
                    <Checkbox storeKey="emergency" onClick={(e: any) => {
                        e.stopPropagation()
                    }} />
                    <span className="text-dark text-[16px] font-[400]">🔥 Аварийный вызов</span>
                </div>
                <span className="mt-4 block text-[#171717] font-[500] text-[18px]">Время</span>
                <div className="mt-3 flex flex-row items-center w-full">
                    <div className="flex flex-row items-center gap-x-2">
                        <Checkbox storeKey="time" onClick={(e: any) => {
                            toggle()
                            e.stopPropagation()
                        }} />
                        <span className="text-dark text-[16px] font-[400]">Сейчас</span>
                    </div>
                    {isVisible &&
                        <div className="flex flex-row ml-auto gap-x-2 w-[60%]">
                            <div className="w-[55%]">
                                <Input placeholder="18:00" baseStyle="applicationStyle" width="w-full px-3.5" />
                            </div>
                            <div className="w-[65%] relative">
                                <div
                                    className="w-full h-[48px] border border-[#737373] gap-x-1.5 rounded-[8px] px-2 flex items-center justify-between cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsDatePickerOpen(!isDatePickerOpen)
                                    }}
                                >
                                    <span className="text-[16px] font-[400]">{formattedDate}</span>
                                    <BigCalendarIcon />
                                </div>
                                {isDatePickerOpen && (
                                    <div
                                        className="absolute z-10 top-full right-0 mt-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date: Date | null) => {
                                                setSelectedDate(date)
                                                setIsDatePickerOpen(false)
                                            }}
                                            inline
                                            popperClassName="z-50"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>}
                </div>
            </div>
            <Button variant="default" className="mt-20" label="Создать" type="submit" />
        </form >
    )
}
