import { Button } from "../shared/button/button";
import { Input } from "../shared/input/input";

export const RegistrationScreen = () => {
    return (
        <div className="flex flex-col justify-between h-full">
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
                    placeholder="+7 ____ - ____ - __ - __"
                    className="w-full mt-8"
                    variant="phone"
                />
            </div>
            <Button
                variant="default"
                label="Отправить SMS"
                className="mt-auto"
            />
        </div>
    );
};