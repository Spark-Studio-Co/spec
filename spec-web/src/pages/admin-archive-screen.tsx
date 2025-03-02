import { useGetApplications } from "../entities/application/api/use-get-applications"
import { usePopupStore } from "../shared/model/popup-store"
import { useTakenApplicationStore } from "../features/application-card/model/taken-application-store"
import { ApplicationCard } from "../features/application-card/ui/application-card"
import { useState } from "react"

export const AdminArchiveScreen = () => {
    const { data: applications, isLoading, error } = useGetApplications();

    const { isOpen, passedValue, open: openPhonePopup, setPassedValue: setPhoneValue } = usePopupStore("phone-popup");
    const { isOpen: isOpenTaken, open: openTakenPopup } = usePopupStore("taken-popup");
    const { isOpen: isOpenRefund, open: openRefundPopup, close: closeRefundPopup } = usePopupStore("refund-popup");
    const { isOpen: isOpenReject, open: openRejectPopup, close: closeRejectPopup } = usePopupStore("reject-popup");

    const { setTaken, taken, removeTaken } = useTakenApplicationStore();

    const [currentCard, setCurrentCard] = useState<number | null>(null);

    if (isLoading) return <p className="text-center">Загрузка заявок...</p>;
    if (error) return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;

    const handleTakeApplication = (index: number, phone: string) => {
        if (taken.includes(index)) return;
        if (taken.length >= 1) {
            openTakenPopup();
            return;
        }
        setPhoneValue(phone);
        openPhonePopup();
        setCurrentCard(index);
    };

    return (
        <div className="flex flex-col gap-3">
            {applications?.map((application: any, index: number) => (
                <ApplicationCard
                    key={index}
                    {...application}
                    index={index}
                    onClick={() => handleTakeApplication(index, application.phone)}
                    onRefund={() => {
                        setCurrentCard(index);
                        openRefundPopup();
                    }}
                    onReject={() => {
                        setCurrentCard(index);
                        openRejectPopup();
                    }}
                />
            ))}
        </div>
    );
};
