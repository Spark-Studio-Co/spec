import SearchIcon from "../../assets/icons/search-icon"
import SelectorArrowIcon from "../../assets/icons/selector-arrow-icon"

import { useSelectorStore } from "../../model/selector-store"
import { useVisibleStore } from "../../model/visible-store"

interface ISelectorProps {
    label: string
    className?: string
    storeKey: string
    options: string[]
}

export const Selector = ({ label, className, options, storeKey }: ISelectorProps) => {
    const { selected, setSelected } = useSelectorStore(storeKey)
    const { toggle, isVisible } = useVisibleStore(storeKey)

    return (
        <div className="flex flex-col">
            <div className={`${className} w-full h-[48px] border border-[#737373] rounded-[8px] flex items-center justify-between pl-2 pr-3 ${!isVisible && 'mb-8'}`}>
                <div className="flex flex-row items-center gap-x-2 flex-1" onClick={toggle}>
                    <SearchIcon />
                    <input
                        className="flex-1 outline-none text-[16px] font-[400] placeholder:text-[#737373]"
                        placeholder={label}
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    />
                </div>
                <SelectorArrowIcon />
            </div>
            {isVisible && <div className="flex flex-col gap-y-2 mb-8">
                {options.map((option, index) => (
                    <span key={index} onClick={() => setSelected(option)}>{option}</span>
                ))}
            </div>}
        </div>
    )
}
