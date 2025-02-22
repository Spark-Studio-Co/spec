import { useActiveTabStore } from "../../model/active-tab-store"

import { BottomTab } from "../bottom-tab/bottom-tab"

import ApplicationIcon from "../../../../shared/assets/icons/application-icon"
import ArchiveIcon from "../../../../shared/assets/icons/archive-icon"
import ProfileIcon from "../../../../shared/assets/icons/profile-icon"



export const BottomPanel = () => {
    const { activeTab, setActiveTab } = useActiveTabStore()

    const tabs = [
        { icon: <ApplicationIcon stroke={activeTab === 'Заявки' ? '#6271EB' : '#737373'} />, label: "Заявки" },
        { icon: <ArchiveIcon stroke={activeTab === 'Архив' ? '#6271EB' : '#737373'} />, label: "Архив" },
        { icon: <ProfileIcon stroke={activeTab === 'Профиль' ? '#6271EB' : '#737373'} />, label: "Профиль" },
    ]

    return (
        <div className="flex flex-row justify-between w-full bg-white h-[82px] px-10 pt-2 fixed bottom-0">
            {tabs.map(tab => (
                <BottomTab
                    key={tab.label}
                    label={tab.label}
                    icon={tab.icon}
                    isActive={activeTab === tab.label}
                    setActiveTab={setActiveTab}
                />
            ))}
        </div>
    )
}
