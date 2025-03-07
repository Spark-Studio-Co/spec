import { ReactElement } from 'react'
import { Link } from 'react-router'




interface IBottomTabProps {
    label: string
    icon: ReactElement
    isActive?: boolean
    setActiveTab: (tab: string) => void
    link: string
}

export const BottomTab = ({ label, icon, isActive, setActiveTab, link }: IBottomTabProps) => {
    return (
        <Link
            to={link}
        >
            <div className='flex flex-col items-center gap-y-1.5' onClick={() => setActiveTab(label)}>
                {icon}
                <span className={`${isActive ? 'text-main' : 'text-[#737373]'} text-[16px] font-[500]`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}
