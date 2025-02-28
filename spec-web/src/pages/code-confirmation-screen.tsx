import { SingleValueInput } from "../shared/single-value-input/single-value-input";
import { Button } from "../shared/button/button";
import { ChangeEvent, SyntheticEvent, useRef, useState, useEffect } from "react";

import { useAuthStore } from "../app/model/use-auth-store";
import { useSendSmsStore } from "../entities/auth-user/model/send-sms-store";
import { useVerifySmsStore } from "../entities/auth-user/model/verify-sms-store";
import { useAuthData } from "../entities/auth-user/api/use-auth-token";

import { useSendCode } from "../entities/auth-user/api/use-verify-sms";

export const CodeConfirmationScreen = () => {
    const { mutate } = useSendCode();
    const { submit, isLoading } = useVerifySmsStore();
    const { phone } = useSendSmsStore();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [values, setValues] = useState<string[]>(Array(6).fill(""));

    const { setAuth } = useAuthStore();
    const { saveToken, requestId } = useAuthData();

    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    // ⏳ State for Rate Limiting
    const [smsAttempts, setSmsAttempts] = useState<number>(0);
    const [lastSmsTime, setLastSmsTime] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (lastSmsTime) {
            const now = Date.now();
            const timeDiff = now - lastSmsTime;

            if (timeDiff < 5 * 60 * 1000) {
                setErrorMessage("Слишком частое обращение, повторите попытку позже");
                setDisabled(true);
            } else {
                // ✅ Reset only after 5 minutes
                setErrorMessage(null);
                setDisabled(false);
                setSmsAttempts(0);
            }
        }
    }, [lastSmsTime]);

    const handleSetValue = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newValues = [...values];
        newValues[index] = e.target.value || "";
        setValues(newValues);
        setDisabled(newValues.some(val => val === ""));
        const inputValue = e.target.value.replace(/\D/g, "").slice(0, 1);

        if (inputValue && index < 6 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }

        if (!inputValue && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    let formattedValue = values.join("");
    console.log(formattedValue);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        // ✅ First attempt should not show rate limit error
        if (smsAttempts >= 3 && lastSmsTime) {
            setErrorMessage("Слишком частое обращение, повторите попытку позже");
            setDisabled(true);
            return;
        }

        setDisabled(true);
        setSmsAttempts(prev => prev + 1);
        setLastSmsTime(Date.now());

        submit(e, mutate, formattedValue, phone, requestId!, saveToken, setAuth);
    };

    return (
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <span className="text-dark font-semibold text-[24px] leading-[28px]">
                    Мы отправили SMS на номер
                </span>
                <span className="text-[20px] text-dark font-normal leading-[28px] mt-3">
                    {phone}
                </span>

                <div className="w-full mt-8">
                    <span className="text-dark font-medium text-[16px] leading-[28px] w-full items-center justify-center flex mb-2">
                        Для ввода кода перейдите в Telegram
                    </span>
                    <div className="flex gap-1 flex-row justify-between w-full">
                        {Array(6).fill(null).map((_, index) => (
                            <SingleValueInput
                                key={index}
                                ref={el => { inputRefs.current[index] = el; }}
                                placeholder="X"
                                value={values[index] || ""}
                                onChange={handleSetValue(index)}
                            />
                        ))}
                    </div>
                    {errorMessage && (
                        <span className="text-red-500 text-[14px] mt-2 w-full flex items-center justify-center">{errorMessage}</span>
                    )}
                </div>
            </div>
            <Button
                variant={disabled ? "disabled" : "default"}
                label={isLoading ? "Загрузка..." : "Войти"}
                className="mt-auto"
                type="submit"
                disabled={disabled}
            />
        </form>
    );
};