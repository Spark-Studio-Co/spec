import { useEffect, useState } from "react";
import { ApplicationCard } from "../features/application-card/ui/application-card";
import { Popup } from "../widgets/popup/popup";

import { usePopupStore } from "../shared/model/popup-store";
import { useTakenApplicationStore } from "../features/application-card/model/taken-application-store";
import { useGetApplications } from "../entities/application/api/use-get-applications";
import { useChangeStatus } from "../entities/application/api/use-change-status";
import { useGetNoApplicationText } from "../entities/application/api/use-get-no-application-text";

import { useNavigate } from "react-router";

import { IChangeStatusRDO } from "../entities/application/api/rdo/change-status.rdo";
import { useGetArchive } from "../entities/archive/api/use-get-archive";
import { useLinkFCM } from "../entities/link-fcm/api/use-link-fcm";
import { useAuthData } from "../entities/auth-user/api/use-auth-data";
import { useQueryClient } from "@tanstack/react-query";
import { useUserData } from "../entities/user/api/use-user-data";

export const ApplicationScreen = () => {
    const navigate = useNavigate()
    const [refundReason, setRefundReason] = useState<string>("")
    const [denyReason, setDenyReason] = useState<string>("")
    const { userId } = useAuthData()
    const queryClient = useQueryClient();
    const { mutate } = useChangeStatus()
    const { mutate: linkFCM } = useLinkFCM()
    const { data: userData } = useUserData()


    const { data: applications, isLoading, error, refetch } = useGetApplications(userData?.id, userData?.city_id);
    const { data: archive, isLoading: isArchiveLoading } = useGetArchive()
    const { data: noApplicationText, isLoading: isTextLoading } = useGetNoApplicationText()

    const { isOpen, passedValue, open: openPhonePopup, setPassedValue: setPhoneValue } = usePopupStore("phone-popup");
    const { isOpen: isOpenTaken, open: openTakenPopup } = usePopupStore("taken-popup");
    const { isOpen: isOpenExecution, open: openExecutionPopup, close: closeExecutionPopup } = usePopupStore("execution-popup");
    const { isOpen: isOpenComplete, open: openCompletePopup, close: closeCompletePopup } = usePopupStore("complete-popup");
    const { isOpen: isOpenRefund, open: openRefundPopup, close: closeRefundPopup } = usePopupStore("refund-popup");
    const { isOpen: isOpenReject, open: openRejectPopup, close: closeRejectPopup } = usePopupStore("reject-popup");

    const { setTaken, taken, } = useTakenApplicationStore();
    const [currentApplicationId, setCurrentApplicationId] = useState<number | null>(null);

    const temporaryKey = localStorage.getItem("temporaryKey");

    console.log("Temporary Key:", temporaryKey);

    useEffect(() => {
        if (temporaryKey && userId) {
            linkFCM({
                temporaryKey: temporaryKey,
                id: userId
            }, {
                onSuccess: (data: any) => {
                    console.log("FCM Linked", data)
                },
                onError: (error: any) => {
                    console.log(error)
                }
            });
        }
    }, [temporaryKey, userId, linkFCM]);

    if (isLoading || isArchiveLoading) return <p className="text-center">Загрузка заявок...</p>;
    if (error) return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;

    if (!applications) return <p className="text-center">Нет доступных заявок</p>;
    if (!archive) return <p className="text-center">Загрузка архива...</p>;

    const getUnpaidApplications = () => {
        return archive?.filter((app: any) =>
            app.balance_history?.length === 0
        ) || [];
    };

    const unpaidApplications = getUnpaidApplications();

    // const handleTakeApplication = (index: number, phone: string) => {
    //     if (taken.includes(index)) return;

    //     const unpaid = getUnpaidApplications();

    //     if (unpaid.length >= 2) {
    //         openTakenPopup();
    //         return;
    //     }

    //     setPhoneValue(phone);
    //     openPhonePopup();
    //     setTaken(index);
    // };

    const handleStartExecution = () => {
        if (currentApplicationId !== null) {
            handleChangeStatus(currentApplicationId, { status_id: 3 })
            setCurrentApplicationId(null);
            closeExecutionPopup();
        }
    }

    const takenApplication = applications?.[taken[0]];

    const handleChangeStatus = (task_id: number, status: IChangeStatusRDO) => {
        mutate(
            { data: status, task_id },
            {
                onSuccess: () => {
                    console.log("Status successfully updated");
                    refetch();
                    queryClient.invalidateQueries({
                        queryKey: ['archive'],
                    });
                },
                onError: (error) => console.error("Error:", error.message)
            }
        );
    }


    const handleRefund = () => {
        if (currentApplicationId !== null) {
            handleChangeStatus(currentApplicationId, { status_id: 4, comment: refundReason })
            setCurrentApplicationId(null);
            closeRefundPopup();
        }
    }

    const handleClientDeny = () => {
        if (currentApplicationId !== null) {
            handleChangeStatus(currentApplicationId, { status_id: 5, comment: denyReason })
            setCurrentApplicationId(null);
            closeRejectPopup();
        }
    }

    const handleComplete = () => {
        if (currentApplicationId !== null) {
            handleChangeStatus(currentApplicationId, { status_id: 6 })
            setCurrentApplicationId(null);
            closeCompletePopup();
        }
    }

    if (applications.length === 0) {
        return (
            <div className="w-full px-3 py-4 flex flex-col bg-white rounded-[12px]">
                <span className="text-[#171717] font-[500] text-[20px] leading-6">
                    {userData?.role == "performer" ? 'Здесь скоро появятся заявки' : isTextLoading ? "Загрузка..." :
                        (Array.isArray(noApplicationText) ? noApplicationText?.map((text: any) => (
                            <span key={text.id} className="text-[#171717] font-[500] text-[20px] leading-tight">
                                {text.text}
                            </span>
                        )) : "Нет доступных заявок")}
                </span>
            </div>
        )
    }


    const notPaid = unpaidApplications.length
        ? unpaidApplications.map((app: any) => app.address).join(', ')
        : "";

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications?.slice()
                    .sort((a: any, b: any) => (a.status_id === 2 && a.status_id === 3 ? -1 : b.status_id === 2 ? 1 : 0))
                    .map((application: any) => {
                        return (
                            <ApplicationCard
                                key={application.id}
                                {...application}
                                onReject={() => {
                                    setCurrentApplicationId(application.id);
                                    openRejectPopup();
                                }}
                                onRefund={() => {
                                    setCurrentApplicationId(application.id);
                                    openRefundPopup();
                                }}
                                onClick={() => {
                                    setCurrentApplicationId(application.id);

                                    if (application.status_id === 3) {
                                        openCompletePopup();
                                        return;
                                    }

                                    if (application.status_id === 2) {
                                        openExecutionPopup();
                                        return;
                                    }

                                    const unpaid = getUnpaidApplications();

                                    if (unpaid.length >= 2) {
                                        openTakenPopup(); // показать попап с адресами
                                        return; // 👈 не даём ничего менять
                                    }

                                    if (application.status_id === 1) {
                                        setPhoneValue(application.phone);
                                        setTaken(application.id);
                                        openPhonePopup();

                                        // теперь можно менять статус
                                        handleChangeStatus(application.id, { status_id: 2 });
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

            {isOpenExecution && (
                <Popup
                    title="Вы начали исполнять данную заявку?"
                    storeKey="execution-popup"
                    closeLabel="Нет"
                    actionLabel="Да"
                    onClick={handleStartExecution}
                />
            )}

            {isOpenTaken && (
                <Popup
                    isCenter={false}
                    title={`Для взятия следующего заказа, оплатите комиссию за предыдущие заказы по адресу ${notPaid}`}
                    storeKey="taken-popup"
                    closeLabel="Отмена"
                    actionLabel={takenApplication?.comission || "Продолжить"}
                    onClick={() => navigate('/archive')}
                />
            )}


            {isOpenComplete && (
                <Popup
                    title="Вы выполнили данную заявку?"
                    storeKey="complete-popup"
                    closeLabel="Нет"
                    actionLabel="Да"
                    onClick={() => {
                        if (currentApplicationId !== null) {
                            handleComplete()
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
                    onClick={(reason) => {
                        if (currentApplicationId !== null && reason) {
                            handleRefund()
                            closeRefundPopup();
                        }
                    }}
                    children={
                        <textarea
                            className="w-full px-4 py-3 border border-[#737373] rounded-[8px] mb-4 outline-none h-[88px]"
                            placeholder='Причина возврата'
                            value={refundReason}
                            onChange={(e) => setRefundReason(e.target.value)}
                        />
                    }
                    disabled={!refundReason.trim()}
                />
            )}

            {isOpenReject && (
                <Popup
                    isCenter={false}
                    title="Укажите причину отказа клиента"
                    storeKey="reject-popup"
                    closeLabel="Отмена"
                    actionLabel="Отправить"
                    onClick={(reason) => {
                        if (currentApplicationId !== null && reason) {
                            handleClientDeny()
                            closeRejectPopup();
                        }
                    }}
                    children={
                        <textarea
                            className="w-full px-4 py-3 border border-[#737373] rounded-[8px] mb-4 outline-none h-[88px]"
                            placeholder='Причина отказа'
                            value={denyReason}
                            onChange={(e) => setDenyReason(e.target.value)}
                        />
                    }
                    disabled={!denyReason.trim()}
                />
            )}
        </>
    );
};
