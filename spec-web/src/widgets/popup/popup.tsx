import { useState } from 'react';
import { Button } from "../../shared/button/button";
import { usePopupStore } from "../../shared/model/popup-store";

interface IPopup {
    title: string
    isCenter?: boolean
    closeLabel?: string
    actionLabel?: string
    storeKey: string
    onClick?: (inputValue?: string) => void
    isInput?: boolean
    inputPlaceholder?: string
}

export const Popup = ({ title, isCenter = true, closeLabel = "Закрыть", actionLabel = "Продолжить", storeKey, onClick, isInput, inputPlaceholder }: IPopup) => {
    const { close } = usePopupStore(storeKey)
    const [inputValue, setInputValue] = useState('')

    return (
        <div className="fixed inset-0 bg-[#0000004D] flex items-center justify-center z-50">
            <div className={`bg-white px-4 min-h-[220px] mx-4 w-full flex flex-col justify-center rounded-[8px]`}>
                <span className={`${isCenter ? 'text-center' : 'text-left'} text-dark font-[500] text-[20px] my-8`}>{title}</span>
                {isInput && (
                    <textarea
                        className="w-full px-4 py-3 border border-[#737373] rounded-[8px] mb-4 outline-none h-[88px]"
                        placeholder={inputPlaceholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                )}
                <Button variant="transparent" label={closeLabel} onClick={close} height="h-[48px]" />
                <Button
                    label={actionLabel}
                    variant={isInput && !inputValue.trim() ? "disabled" : "default"}
                    onClick={() => onClick?.(isInput ? inputValue : undefined)}
                    height="h-[48px]"
                    className="mt-2 mb-6"
                    disabled={isInput && !inputValue.trim()}
                />
            </div>
        </div>
    )
}
