import { useState } from 'react'
import DropdownArrowIcon from '../../../shared/assets/icons/dropdown-arrow-icon'

interface ICategoriesListProps {
    categories: string[]
}

export const CategoriesList = ({ categories }: ICategoriesListProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div
                className="flex flex-row items-center justify-between cursor-pointer mt-6"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-[14px] font-[500] text-dark">Категории</span>
                <div className='flex flex-row items-center justify-center gap-x-1 w-[88px] py-1 bg-white rounded-[8px]'>
                    <span className='font-[400] text-[14px] text-[#404040]'>{isOpen ? 'Скрыть' : 'Открыть'}</span>
                    <div className={`mt-0.5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <DropdownArrowIcon />
                    </div>
                </div>
            </div>
            <div className="w-full bg-white rounded-[12px] p-3 mt-2 relative">
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px]' : 'h-[90px]'}`}
                >
                    <div className="flex flex-col gap-y-2">
                        {categories.map((category, index) => (
                            <span
                                key={index}
                                className="text-[16px] font-[400] text-dark cursor-pointer"
                            >
                                {category}
                                <div className='w-full h-[1px] bg-[#F5F5F5] mt-1' />
                            </span>
                        ))}
                    </div>
                </div>
                {!isOpen && (
                    <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-transparent to-white pointer-events-none rounded-b-[12px]" />
                )}
            </div>
        </>
    )
}
