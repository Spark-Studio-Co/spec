import { Outlet, useMatches, useNavigate } from "react-router-dom";
import BackArrowIcon from "../../shared/assets/icons/back-arrow-icon";

interface AppMatch {
    handle: any;
    isBack?: boolean;
}

export const AuthLayout = () => {
    const matches = useMatches() as AppMatch[];
    const isBack = matches.some(match => match.handle?.isBack);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/', { replace: true });
    };

    return (
        <div className="flex flex-col relative">
            {isBack && (
                <button
                    onClick={handleBack}
                    className="bg-[#F5F5F5] w-10 h-10 rounded-[8px] absolute left-4 top-5 flex items-center justify-center"
                >
                    <BackArrowIcon />
                </button>
            )}
            <div className="flex flex-col h-screen px-4 py-20">
                <main className="flex-grow"><Outlet /></main>
            </div>
        </div>
    );
};