
import { ReactElement } from 'react'

interface IBottomTabProps {
    label: string
    icon: ReactElement
    isActive?: boolean
    setActiveTab: (tab: string) => void
}

export const BottomTab = ({ label, icon, isActive, setActiveTab }: IBottomTabProps) => {
    return (
        <div className='flex flex-col items-center gap-y-1.5' onClick={() => setActiveTab(label)}>
            {icon}
            <span className={`${isActive ? 'text-main' : 'text-[#737373]'} text-[16px] font-[500]`}>
                {label}
            </span>
        </div>
    )
}
