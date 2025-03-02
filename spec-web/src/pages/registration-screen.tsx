import { ChangeEvent, useState, SyntheticEvent } from "react";
import { Button } from "../shared/button/button";
import { Input } from "../shared/input/input";
import { useNavigate } from "@tanstack/react-router";
import { useSendSmsStore } from "../entities/auth-user/model/send-sms-store";
import { useSendSms } from "../entities/auth-user/api/use-send-sms";
import { inputMask } from "../shared/utils/inputMask";
import { useAuthData } from "../entities/auth-user/api/use-auth-data";

export const RegistrationScreen = () => {
    const { phone, setPhone, submit, isLoading, error } = useSendSmsStore();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [rawPhone, setRawPhone] = useState<string>("");
    const { mutate } = useSendSms();
    const navigate = useNavigate();

    const { saveRequestId } = useAuthData()


    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { rawLength, rawValue } = inputMask(e, setPhone);
        setRawPhone(rawValue || "");
        setDisabled(rawLength < 11);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        const phoneWithPlus = `+${rawPhone}`;
        console.log(phoneWithPlus);
        submit(e, mutate, () => navigate({ to: '/code-confirmation' }), phoneWithPlus, saveRequestId);
        error ? setDisabled(false) : setDisabled(true);
    };

    return (
        <form className="flex flex-col justify-between h-[90%]" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <span className="text-dark font-semibold text-[24px] leading-[28px]">
                    Введите номер телефона
                    <br /> для входа
                </span>
                <span className="text-[20px] text-dark font-normal leading-[28px] mt-3">
                    Мы пришлем SMS для входа
                </span>
                <Input
                    type="tel"
                    className="w-full mt-8"
                    variant="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </div>
            <span className="text-red-500 mt-2 w-full items-center justify-center flex">{error && "Данный номер не зарегестрирован в Telegram"}</span>
            <Button
                variant={disabled ? 'disabled' : 'default'}
                label={isLoading ? 'Отправка...' : 'Отправить SMS'}
                className="mt-auto"
                type="submit"
                disabled={disabled}
            />
        </form>
    );
};