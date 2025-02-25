import { useState } from 'react'
import { ApplicationCard } from "../features/application-card/ui/application-card"
import { Popup } from "../widgets/popup/popup"

import { usePopupStore } from "../shared/model/popup-store"
import { useTakenApplicationStore } from "../features/application-card/model/taken-application-store"
import { useExecutionApplicationStore } from "../features/application-card/model/execution-application-store"

export const AdminApplicationScreen = () => {

    const { isOpen, passedValue, open: openPhonePopup, setPassedValue: setPhoneValue } = usePopupStore('phone-popup')
    const { isOpen: isOpenTaken, open: openTakenPopup } = usePopupStore('taken-popup')
    const { isOpen: isOpenExecution, open: openExecutionPopup, close: closeExecutionPopup } = usePopupStore('execution-popup')
    const { isOpen: isOpenComplete, open: openCompletePopup, close: closeCompletePopup } = usePopupStore('complete-popup')
    const { isOpen: isOpenRefund, open: openRefundPopup, close: closeRefundPopup } = usePopupStore('refund-popup')
    const { isOpen: isOpenReject, open: openRejectPopup, close: closeRejectPopup } = usePopupStore('reject-popup')

    const { setTaken, taken, removeTaken } = useTakenApplicationStore()
    const { setExecution, execution, closeExecution } = useExecutionApplicationStore()

    const applications = [
        {
            title: 'Двухкомнатная квартира',
            description: 'Площадь 54м2, 2/5 этаж, 2 спальни, 1 ванная',
            price: '15 000 000',
            comission: '10%',
            phone: '+7 (495) 123-45-67',
            date: '12.02.2023',
            address: 'г. Москва, ул. Ленина, д. 12'
        },
    ]

    const handleTakeApplication = (index: number, phone: string) => {
        if (taken.includes(index)) return
        if (taken.length >= 1) {
            openTakenPopup()
            return
        }
        setPhoneValue(phone)
        openPhonePopup()
        setTaken(index)
    }

    const [currentCard, setCurrentCard] = useState<number | null>(null)

    const handleStartExecution = () => {
        if (currentCard !== null) {
            setExecution(currentCard)
            setCurrentCard(null)
            closeExecutionPopup()
        }
    }


    const takenApplication = applications[taken[0]]


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {applications.map((application, index) => (
                    <ApplicationCard
                        key={index}
                        {...application}
                        index={index}
                        onReject={() => {
                            setCurrentCard(index)
                            openRejectPopup()
                        }}
                        onRefund={() => {
                            setCurrentCard(index)
                            openRefundPopup()
                        }}
                        onClick={() => {
                            if (execution === index) {
                                setCurrentCard(index)
                                openCompletePopup()
                            } else if (taken.includes(index)) {
                                setCurrentCard(index)
                                openExecutionPopup()
                            } else {
                                handleTakeApplication(index, application.phone)
                            }
                        }}
                    />
                ))}
            </div>


            {isOpen && (
                <Popup
                    title="Звонок клиенту"
                    storeKey="phone-popup"
                    actionLabel={passedValue || "Продолжить"}
                    onClick={() => { window.location.href = `tel:${passedValue}` }}
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
                            removeTaken(currentCard)
                            closeExecution()
                            setCurrentCard(null)
                            closeCompletePopup()
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
                    onClick={(reason) => {
                        if (currentCard !== null && reason) {
                            removeTaken(currentCard)
                            closeExecution()
                            setCurrentCard(null)
                            closeRefundPopup()
                        }
                    }}
                />
            )}

            {isOpenReject && (
                <Popup
                    isCenter={false}
                    title="Укажите причину отказа клиента"
                    storeKey="reject-popup"
                    closeLabel="Отмена"
                    actionLabel="Отправить"
                    isInput={true}
                    inputPlaceholder="Причина отказа"
                    onClick={(reason) => {
                        if (currentCard !== null && reason) {
                            removeTaken(currentCard)
                            closeExecution()
                            setCurrentCard(null)
                            closeRejectPopup()
                        }
                    }}
                />
            )}
        </>
    )
}
