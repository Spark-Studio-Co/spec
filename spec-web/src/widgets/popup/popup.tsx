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
    onClick?: (argument: any) => void
    onClose?: () => void
    disabled?: boolean
    maxWidth?: string
}

export const Popup = ({
    title,
    isCenter = true,
    closeLabel = "Закрыть",
    actionLabel = "Продолжить",
    storeKey,
    onClick,
    onClose,
    children,
    disabled,
    maxWidth = 'max-w-[480px]'
}: IPopup) => {
    const { close } = usePopupStore(storeKey)

    const handleClose = () => {
        onClose?.();
        close();
    };

    return (
        <div className="fixed inset-0 bg-[#0000004D] flex items-center justify-center z-50">
            <div className={`bg-white px-4 min-h-[220px] mx-4 w-full ${maxWidth} flex flex-col justify-center rounded-[8px]`}>
                <span className={`${isCenter ? 'text-center' : 'text-left'} text-dark font-[500] text-[20px] mt-8 mb-4`}>{title}</span>
                {children}
                <Button
                    variant="transparent"
                    label={closeLabel}
                    onClick={handleClose}
                    height="h-[48px]"
                />
                <Button
                    label={actionLabel}
                    variant={disabled ? "disabled" : "default"}
                    onClick={onClick}
                    height="h-[48px]"
                    className="mt-2 mb-6"
                    disabled={disabled}
                />
            </div>
        </div>
    )
}
