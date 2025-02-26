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
        <div className="flex flex-col relative max-w-[90%] m-auto">
            {isBack && (
                <button
                    onClick={handleBack}
                    className="bg-[#F5F5F5] w-10 h-10 rounded-[8px] absolute left-0 top-14 flex items-center justify-center"
                >
                    <BackArrowIcon />
                </button>
            )}
            <div className="flex flex-col h-screen w-full  pt-28 pb-14">
                <main className="flex-grow"><Outlet /></main>
            </div>
        </div>
    );
};