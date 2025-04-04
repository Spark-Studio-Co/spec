import { SingleValueInput } from "../shared/ui/single-value-input/single-value-input";
import { Button } from "../shared/ui/button/button";
import { ChangeEvent, SyntheticEvent, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as UAParserLib from 'ua-parser-js';

import { useSendSmsStore } from "../entities/auth-user/model/send-sms-store";
import { useVerifySmsStore } from "../entities/auth-user/model/verify-sms-store";
import { useAuthData } from "../entities/auth-user/api/use-auth-data";

import { useSendCode } from "../entities/auth-user/api/use-verify-sms";

import BackArrowIcon from "../shared/assets/icons/back-arrow-icon";

import { FormattedPhone } from "../shared/ui/formatted-phone/formatted-phone";


export const CodeConfirmationScreen = () => {
    const [userAgent, setUserAgent] = useState<string | undefined>("");

    const parser = new UAParserLib.UAParser();
    const result = parser.getResult();
    const deviceModel = result.device.model || result.browser.name;

    useEffect(() => {
        setUserAgent(`SpecApp 0.0.1 ${deviceModel}`);
    }, [deviceModel]);

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/application');
    };

    const { mutate } = useSendCode();
    const { submit, isLoading } = useVerifySmsStore();
    const { phone } = useSendSmsStore();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [values, setValues] = useState<string[]>(Array(6).fill(""));
    const navigate = useNavigate();

    const { saveToken, requestId, removeRequestId, saveUserId } = useAuthData();

    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    const [smsAttempts, setSmsAttempts] = useState<number>(0);
    const [lastSmsTime, setLastSmsTime] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (lastSmsTime && smsAttempts >= 3) {
            const now = Date.now();
            const timeDiff = now - lastSmsTime;

            if (timeDiff < 5 * 60 * 1000) {
                setErrorMessage("Слишком частое обращение, повторите попытку позже");
                setDisabled(true);
            } else {
                setErrorMessage(null);
                setDisabled(false);
                setSmsAttempts(0);
            }
        }
    }, [lastSmsTime, smsAttempts]);



    const handleSetValue = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const inputValue = e.target.value.replace(/\D/g, "").slice(0, 1); // Allow only one numeric character
        const newValues = [...values];

        if (inputValue) {
            newValues[index] = inputValue;
            if (index < 5) {
                inputRefs.current[index + 1]?.focus(); // Move to next input
            }
        } else {
            newValues[index] = "";
            if (index > 0) {
                inputRefs.current[index - 1]?.focus(); // Move to previous input on delete
            }
        }

        setValues(newValues);
        setDisabled(newValues.some(val => val === ""));
    };

    let formattedValue = values.join("");
    console.log(formattedValue);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (smsAttempts >= 3 && lastSmsTime) {
            const now = Date.now();
            const timeDiff = now - lastSmsTime;

            if (timeDiff < 5 * 60 * 1000) {
                setErrorMessage("Слишком частое обращение, повторите попытку позже");
                setDisabled(true);
                return;
            }
        }

        setDisabled(true);
        setSmsAttempts(prev => prev + 1);
        setLastSmsTime(Date.now());

        const generateRandomHash = () => {
            const array = new Uint32Array(4);
            crypto.getRandomValues(array);
            return Array.from(array, x => x.toString(16).padStart(8, '0')).join('');
        };

        const password = generateRandomHash();

        submit(e, mutate, formattedValue, phone, requestId!, userAgent || '', password, saveToken, saveUserId, () => {
            setTimeout(() => removeRequestId(), 1500);
        });
    };

    return (
        <form className="flex flex-col justify-between h-[90%]" onSubmit={handleSubmit}>
            <button
                type="button"
                onClick={handleBack}
                className="bg-[#F5F5F5] w-10 h-10 rounded-[8px] absolute left-0 top-10 flex items-center justify-center"
            >
                <BackArrowIcon />
            </button>
            <div className="flex flex-col">
                <span className="text-dark font-semibold text-[24px] leading-[28px]">
                    Мы отправили код на телефон
                </span>
                <span className="text-[20px] text-dark font-normal leading-[28px] mt-3">
                    <FormattedPhone phone={phone} />
                </span>
                <div className="w-full mt-8">
                    <span className="text-dark font-medium text-[16px] leading-[28px] w-full items-center justify-center flex mb-2">
                        Для ввода кода перейдите в Telegram
                    </span>
                    <div className="flex gap-1 flex-row justify-between w-full">
                        {values.map((val, index) => (
                            <SingleValueInput
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                placeholder="X"
                                value={val}
                                onChange={handleSetValue(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace" && !values[index] && index > 0) {
                                        inputRefs.current[index - 1]?.focus(); // Move back when deleting empty input
                                    }
                                }}
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