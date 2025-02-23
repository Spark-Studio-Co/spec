import NavigationIcon from "../../../shared/assets/icons/navigation-icon"


interface IProfileHeader {
    name: string
    phone: string
    city: string
}

export const ProfileHeader = ({ name, phone, city }: IProfileHeader) => {
    return (
        <div className="flex flex-col bg-white px-3 w-full py-4 rounded-[12px] min-h-[84px]">
            <span className="font-[600] text-[24px] text-dark">{name}</span>
            <div className="flex flex-row items-center gap-x-3 mt-1">
                <span className="text-[16px] text-[#262626] font-[500]">{phone}</span>
                <div className="flex flex-row items-center gap-x-1">
                    <NavigationIcon />
                    <span className="text-[14px] text-[#404040] font-[500]">{city}</span>
                </div>
            </div>
        </div>
    )
}
