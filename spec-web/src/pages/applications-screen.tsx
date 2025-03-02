import { useState } from "react";
import { ApplicationCard } from "../features/application-card/ui/application-card";
import { Popup } from "../widgets/popup/popup";

import { usePopupStore } from "../shared/model/popup-store";
import { useTakenApplicationStore } from "../features/application-card/model/taken-application-store";
import { useExecutionApplicationStore } from "../features/application-card/model/execution-application-store";
import { useGetApplications } from "../entities/application/api/use-get-applications";

import { useChangeStatus } from "../entities/application/api/use-change-status";
import { IChangeStatusRDO } from "../entities/application/api/rdo/change-status.rdo";

export const ApplicationScreen = () => {
    const [refundReason, setRefundReason] = useState<string>("")
    const [denyReason, setDenyReason] = useState<string>("")

    const { mutate } = useChangeStatus()

    const { data: applications, isLoading, error } = useGetApplications();

    const { isOpen, passedValue, open: openPhonePopup, setPassedValue: setPhoneValue } = usePopupStore("phone-popup");
    const { isOpen: isOpenTaken, open: openTakenPopup } = usePopupStore("taken-popup");
    const { isOpen: isOpenExecution, open: openExecutionPopup, close: closeExecutionPopup } = usePopupStore("execution-popup");
    const { isOpen: isOpenComplete, open: openCompletePopup, close: closeCompletePopup } = usePopupStore("complete-popup");
    const { isOpen: isOpenRefund, open: openRefundPopup, close: closeRefundPopup } = usePopupStore("refund-popup");
    const { isOpen: isOpenReject, open: openRejectPopup, close: closeRejectPopup } = usePopupStore("reject-popup");

    const { setTaken, taken, removeTaken } = useTakenApplicationStore();
    const { setExecution, execution, closeExecution } = useExecutionApplicationStore();

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
        setTaken(index);
    };

    const handleStartExecution = () => {
        if (currentCard !== null && applications) {
            handleChangeStatus(applications[currentCard].id, { status_id: 3 })
            setExecution(currentCard);
            setCurrentCard(null);
            closeExecutionPopup();
        }
    }

    const takenApplication = applications?.[taken[0]];

    const handleChangeStatus = (task_id: number, status: IChangeStatusRDO) => {
        mutate(
            { data: status, task_id },
            {
                onSuccess: () => console.log("Status successfully updated"),
                onError: (error) => console.error("Error:", error.message)
            }
        );
    }

    const reloadPage = () => {
        window.location.reload();
    }

    const handleRefund = () => {
        if (currentCard !== null && applications) {
            handleChangeStatus(applications[currentCard].id, { status_id: 4, comment: refundReason })
            closeExecution();
            setTimeout(() => reloadPage(), 1500)
        }
    }

    const handleClientDeny = () => {
        if (currentCard !== null && applications) {
            handleChangeStatus(applications[currentCard].id, { status_id: 5, comment: denyReason })
            closeExecution();
            setTimeout(() => reloadPage(), 1500)
        }
    }

    const handleComplete = () => {
        if (currentCard !== null && applications) {
            handleChangeStatus(applications[currentCard].id, { status_id: 6 })
            closeExecution();
            setTimeout(() => reloadPage(), 1500)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications?.map((application: any, index: number) => {
                    const isTaken = taken.includes(index);
                    const isExecuting = execution === index;

                    return (
                        <ApplicationCard
                            key={index}
                            {...application}
                            index={index}
                            onReject={() => {
                                setCurrentCard(index);
                                openRejectPopup();
                            }}
                            onRefund={() => {
                                setCurrentCard(index);
                                openRefundPopup();
                            }}
                            onClick={() => {
                                if (isExecuting) {
                                    setCurrentCard(index);
                                    openCompletePopup();
                                } else if (isTaken) {
                                    setCurrentCard(index);
                                    openExecutionPopup();
                                } else if (taken.length >= 1) {
                                    openTakenPopup();
                                } else {
                                    handleChangeStatus(application.id, { status_id: 2 })
                                    handleTakeApplication(index, application.phone);
                                }
                            }}
                        />
                    );
                })}
            </div>

            {isOpen && (
                <Popup
                    title="Звонок клиенту"
                    storeKey="phone-popup"
                    actionLabel={passedValue || "Продолжить"}
                    onClick={() => {
                        window.location.href = `tel:${passedValue}`;
                    }}
                />
            )}

            {isOpenTaken && (
                <Popup
                    isCenter={false}
                    title={`Для взятия следующего заказа, оплатите комиссию за предыдущий заказ по адресу ${takenApplication?.address}`}
                    storeKey="taken-popup"
                    closeLabel="Отмена"
                    actionLabel={takenApplication?.comission || "Продолжить"}
                />
            )}

            {isOpenExecution && (
                <Popup
                    title="Вы начали исполнять данную заявку?"
                    storeKey="execution-popup"
                    closeLabel="Нет"
                    actionLabel="Да"
                    onClick={handleStartExecution}
                />
            )}

            {isOpenComplete && (
                <Popup
                    title="Вы выполнили данную заявку?"
                    storeKey="complete-popup"
                    closeLabel="Нет"
                    actionLabel="Да"
                    onClick={() => {
                        if (currentCard !== null) {
                            handleComplete()
                            removeTaken(currentCard);
                            setCurrentCard(null);
                            closeCompletePopup();
                        }
                    }}
                />
            )}

            {isOpenRefund && (
                <Popup
                    isCenter={false}
                    title="Укажите причину возврата заказа"
                    storeKey="refund-popup"
                    closeLabel="Отмена"
                    actionLabel="Отправить"
                    isInput={true}
                    inputPlaceholder="Причина возврата"
                    inputValue={refundReason}
                    setInputValue={setRefundReason}
                    onClick={(reason) => {
                        if (currentCard !== null && reason) {
                            handleRefund()
                            removeTaken(currentCard);
                            setCurrentCard(null);
                            closeRefundPopup();
                        }
                    }}
                />
            )}

            {isOpenReject && (
                <Popup
                    inputValue={denyReason}
                    setInputValue={setDenyReason}
                    isCenter={false}
                    title="Укажите причину отказа клиента"
                    storeKey="reject-popup"
                    closeLabel="Отмена"
                    actionLabel="Отправить"
                    isInput={true}
                    inputPlaceholder="Причина отказа"
                    onClick={(reason) => {
                        if (currentCard !== null && reason) {
                            handleClientDeny()
                            removeTaken(currentCard);
                            setCurrentCard(null);
                            closeRejectPopup();
                        }
                    }}
                />
            )}
        </>
    );
};

