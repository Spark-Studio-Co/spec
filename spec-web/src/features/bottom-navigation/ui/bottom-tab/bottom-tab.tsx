import { ReactElement } from 'react'
import { Link } from 'react-router'


const getRoutePath = (link: string) => {
    switch (link) {
        case 'archive':
            return '/archive' as const
        case 'profile':
            return '/profile' as const
        case 'admin-applications':
            return '/admin-applications' as const
        default:
            return '/application' as const
    }
}

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
            to={getRoutePath(link)}
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
