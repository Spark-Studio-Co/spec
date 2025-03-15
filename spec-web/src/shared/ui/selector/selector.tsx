import SearchIcon from "../../assets/icons/search-icon"
import SelectorArrowIcon from "../../assets/icons/selector-arrow-icon"

import { useSelectorStore } from "../../model/selector-store"
import { useVisibleStore } from "../../model/visible-store"
import { useMemo, useState } from "react"

interface ISelectorProps {
    label: string
    className?: string
    storeKey: string
    options: any[]
    isIcon?: boolean
    isPerformer?: boolean
}

export const Selector = ({ label, className, options, storeKey, isIcon, isPerformer }: ISelectorProps) => {
    const { selected, setSelected, setSelectedName } = useSelectorStore(storeKey)
    const { toggle, isVisible } = useVisibleStore(storeKey)
    const [searchText, setSearchText] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchText(value)
        if (!options.includes(value)) {
            setSelected(0)
        }
    }

    const filteredOptions = useMemo(() => {
        return options?.filter((option: { name: string }) =>
            option?.name?.toLowerCase().includes(searchText.toLowerCase())
        )
    }, [options, searchText])

    const filteredPerformers = useMemo(() => {
        return options?.filter((option: { fullname: string }) =>
            option?.fullname?.toLowerCase()?.includes(searchText.toLowerCase())
        )
    }, [options, searchText])

    const handleOptionSelect = (optionId: number, option: string) => {
        setSelected(optionId)
        setSelectedName(option)
        setSearchText(option)
        toggle()
    }

    return (
        <div className="flex flex-col relative">
            <div
                className={`${className} w-full h-[48px] border border-[#737373] rounded-[8px] flex items-center justify-between pl-2 pr-3 ${isVisible ? 'border-b-0 rounded-b-none' : ''}`}
            >
                <div className="flex flex-row items-center gap-x-2 flex-1">
                    {isIcon && <SearchIcon />}
                    <input
                        className="flex-1 outline-none text-[16px] font-[400] placeholder:text-[#737373]"
                        placeholder={label}
                        value={searchText}
                        onChange={handleInputChange}
                        onClick={() => !isVisible && toggle()}
                    />
                </div>
                <div
                    onClick={toggle}
                    className={`transform transition-transform ${isVisible ? 'rotate-180' : ''}`}
                >
                    <SelectorArrowIcon />
                </div>
            </div>
            {isVisible && (
                <div className="absolute w-full z-10 top-[48px] bg-white border border-[#737373] rounded-b-[8px] shadow-lg max-h-[200px] overflow-y-auto">
                    <div className="flex flex-col py-1">
                        {isPerformer ? (
                            filteredPerformers.length > 0 ? (
                                filteredPerformers.map((option: any, index: number) => (
                                    <span
                                        key={index}
                                        onClick={() => handleOptionSelect(option.id, option.fullname)}
                                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selected === option ? 'bg-gray-50' : ''}`}
                                    >
                                        {option.fullname}
                                    </span>
                                ))
                            ) : (
                                <span className="px-4 py-2 text-[#737373]">Нет результатов</span>
                            )
                        ) : (
                            filteredOptions.length > 0 ? (
                                filteredOptions.map((option: any, index: number) => (
                                    <span
                                        key={index}
                                        onClick={() => handleOptionSelect(option.id, option.name)}
                                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selected === option ? 'bg-gray-50' : ''}`}
                                    >
                                        {option.name}
                                    </span>
                                ))
                            ) : (
                                <span className="px-4 py-2 text-[#737373]">Нет результатов</span>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
