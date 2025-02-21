import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button } from "../shared/button/button";
import { Input } from "../shared/input/input";
import { useNavigate } from "react-router-dom";

import { inputMask } from "../shared/utils/inputMask";

export const RegistrationScreen = () => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [phone, setPhone] = useState<string>("");
    const navigate = useNavigate();


    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { rawLength } = inputMask(e, setPhone);
        setDisabled(rawLength < 11);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log("Отправка номера:", phone);
        setDisabled(true);

        setTimeout(() => {
            navigate('/code-confirmation', { replace: true });
        }, 1000);
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
                label="Отправить SMS"
                className="mt-auto"
                type="submit"
                disabled={disabled}
            />
        </form>
    );
};
