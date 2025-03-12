import { ReactElement } from "react";
import { Link, useNavigate } from "react-router";

interface IBottomTabProps {
    label: string;
    icon: ReactElement;
    isActive?: boolean;
    setActiveTab: (tab: string) => void;
    link: string;
}

export const BottomTab = ({ label, icon, isActive, setActiveTab, link }: IBottomTabProps) => {
    const navigate = useNavigate(); // ✅ Ensure navigation works

    const handleClick = () => {
        setActiveTab(label);
        navigate(link); // ✅ Ensure route changes
    };

    return (
        <Link to={link} onClick={handleClick} className="flex flex-col items-center gap-y-1.5">
            {icon}
            <span className={`${isActive ? "text-main" : "text-[#737373]"} text-[16px] font-[500]`}>
                {label}
            </span>
        </Link>
    );
};