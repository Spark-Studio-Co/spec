import { SingleValueInput } from "../shared/single-value-input/single-value-input";
import { Button } from "../shared/button/button"
import { ChangeEvent, useRef, useState } from "react";

export const CodeConfitmationScreen = () => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [values, setValues] = useState<string[]>(Array(4).fill(''));

    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

    const handleSetValue = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newValues = [...values];
        newValues[index] = e.target.value || '';
        setValues(newValues);
        setDisabled(newValues.some(val => val === ""));
        const inputValue = e.target.value.replace(/\D/g, "").slice(0, 1);

        if (inputValue && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }

        if (!inputValue && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    let formattedValue = values.join('');
    console.log(formattedValue)

    return (
        <form className="flex flex-col justify-between h-full" >
            <div className="flex flex-col">
                <span className="text-dark font-semibold text-[24px] leading-[28px]">
                    Мы отправили SMS на номер
                </span>
                <span className="text-[20px] text-dark font-normal leading-[28px] mt-3">
                    +7-747-422-35-59
                </span>
                <div className="flex flex-row justify-between mt-8">
                    {Array(4).fill(null).map((_, index) => (
                        <SingleValueInput
                            key={index}
                            ref={el => { inputRefs.current[index] = el }}
                            placeholder="X"
                            value={values[index] || ''}
                            onChange={handleSetValue(index)}
                        />
                    ))}
                </div>
            </div>
            <Button
                variant={disabled ? 'disabled' : 'default'}
                label="Войти"
                className="mt-auto"
                type="submit"
                disabled={disabled}
            />
        </form>
    )
}
