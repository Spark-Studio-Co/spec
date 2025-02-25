import { ChangeEvent, useState, SyntheticEvent } from "react";
import { Button } from "../shared/button/button";
import { Input } from "../shared/input/input";
import { useNavigate } from "react-router-dom";
import { useRecieveCodeStore } from "../entities/auth-user/model/recieve-code-store";
import { useRecieveCode } from "../entities/auth-user/api/use-recieve-code";
import { inputMask } from "../shared/utils/inputMask";

export const RegistrationScreen = () => {
    const { phone, setPhone, submit, isLoading } = useRecieveCodeStore();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [rawPhone, setRawPhone] = useState<string>("");
    const { mutate } = useRecieveCode();
    const navigate = useNavigate();


    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { rawLength, rawValue } = inputMask(e, setPhone);
        setRawPhone(rawValue || "");
        setDisabled(rawLength < 11);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        submit(e, mutate, navigate, rawPhone);
        setDisabled(true);
    };

    return (
        <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
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