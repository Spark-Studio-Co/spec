import { ChangeEvent, useState, SyntheticEvent } from "react";
import { Button } from "../shared/ui/button/button";
import { Input } from "../shared/ui/input/input";
import { useNavigate } from "react-router";
import { useSendSmsStore } from "../entities/auth-user/model/send-sms-store";
import { useSendSms } from "../entities/auth-user/api/use-send-sms";
import { inputMask } from "../shared/utils/inputMask";
import { useAuthData } from "../entities/auth-user/api/use-auth-data";

export const RegistrationScreen = () => {
    const { phone, setPhone, submit, isLoading } = useSendSmsStore();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [rawPhone, setRawPhone] = useState<string>("");
    const { mutate, error } = useSendSms();
    const navigate = useNavigate();

    const { saveRequestId } = useAuthData()


    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { rawLength, rawValue } = inputMask(e, setPhone);
        setRawPhone(rawValue || "");
        setDisabled(rawLength < 11);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const phoneWithPlus = `+${rawPhone}`;
        console.log(phoneWithPlus);
        submit(e, mutate, () => navigate('/code-confirmation'), phoneWithPlus, saveRequestId);
        setDisabled(false)
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
            <span className="text-red-500 text-sm mt-2 w-full items-center justify-center flex">{error?.message}</span>
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