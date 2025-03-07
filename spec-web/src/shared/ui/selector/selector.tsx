import SearchIcon from "../../assets/icons/search-icon"
import SelectorArrowIcon from "../../assets/icons/selector-arrow-icon"

import { useSelectorStore } from "../../model/selector-store"
import { useVisibleStore } from "../../model/visible-store"
import { useState } from "react"

interface ISelectorProps {
    label: string
    className?: string
    storeKey: string
    options: string[]
    isIcon?: boolean
}

export const Selector = ({ label, className, options, storeKey, isIcon }: ISelectorProps) => {
    const { selected, setSelected } = useSelectorStore(storeKey)
    const { toggle, isVisible } = useVisibleStore(storeKey)
    const [searchText, setSearchText] = useState(selected)

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchText.toLowerCase())
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchText(value)
        if (!options.includes(value)) {
            setSelected('')
        }
    }

    const handleOptionSelect = (option: string) => {
        setSelected(option)
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
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <span
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selected === option ? 'bg-gray-50' : ''}`}
                                >
                                    {option}
                                </span>
                            ))
                        ) : (
                            <span className="px-4 py-2 text-[#737373]">Нет результатов</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
