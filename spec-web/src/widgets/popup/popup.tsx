import { Button } from "../../shared/button/button";

import { usePopupStore } from "../../shared/model/popup-store";

interface IPopup {
    title: string
    isCenter?: boolean
    closeLabel?: string
    actionLabel?: string
    storeKey: string
    onClick?: () => void
}

export const Popup = ({ title, isCenter = true, closeLabel = "Закрыть", actionLabel = "Продолжить", storeKey, onClick }: IPopup) => {
    const { close } = usePopupStore(storeKey)

    return (
        <div className="fixed inset-0 bg-[#0000004D] flex items-center justify-center z-50">
            <div className={`bg-white px-4 min-h-[220px] mx-4 w-full flex flex-col ${isCenter ? 'items-center' : 'items-start'} justify-center rounded-[8px]`}>
                <span className="text-dark font-[500] text-[20px] my-8">{title}</span>
                <Button variant="transparent" label={closeLabel} onClick={close} height="h-[48px]" />
                <Button label={actionLabel} variant="default" onClick={onClick} height="h-[48px]" className="mt-2 mb-6" />
            </div>
        </div>
    )
}
