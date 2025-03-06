import { Button } from "../../shared/ui/button/button";
import { usePopupStore } from "../../shared/model/popup-store";
import { ReactNode } from "react";

interface IPopup {
    children?: ReactNode
    title: string
    isCenter?: boolean
    closeLabel?: string
    actionLabel?: string
    storeKey: string
    onClick?: (inputValue?: string) => void
    isInput?: boolean
    isSelector?: boolean
    inputValue?: string
    disabled?: boolean
}

export const Popup = ({ disabled, inputValue, title, isCenter = true, closeLabel = "Закрыть", actionLabel = "Продолжить", storeKey, onClick, children }: IPopup) => {
    const { close } = usePopupStore(storeKey)

    return (
        <div className="fixed inset-0 bg-[#0000004D] flex items-center justify-center z-50">
            <div className={`bg-white px-4 min-h-[220px] mx-4 w-full flex flex-col justify-center rounded-[8px]`}>
                <span className={`${isCenter ? 'text-center' : 'text-left'} text-dark font-[500] text-[20px] mt-8 mb-4`}>{title}</span>
                {children}
                <Button variant="transparent" label={closeLabel} onClick={close} height="h-[48px]" />
                <Button
                    label={actionLabel}
                    variant={disabled ? "disabled" : "default"}
                    onClick={() => onClick?.(inputValue)}
                    height="h-[48px]"
                    className="mt-2 mb-6"
                    disabled={disabled}
                />
            </div>
        </div>
    )
}
