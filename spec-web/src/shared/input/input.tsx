import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    isError?: boolean;
    variant?: "default" | "phone";
}

const baseStyle = (_className: string) => { return 'w-full h-[54px] border border-[#737373] rounded-[8px] px-4 text-[20px] font-[500] outline-none' }


export const Input: React.FC<InputProps> = ({
    placeholder = "Введите текст",
    isError = false,
    variant = "default",
    className = "",
    ...props
}) => {
    const [phoneValue, setPhoneValue] = useState("");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value.replace(/\D/g, "");

        if (rawValue.length === 0) {
            setPhoneValue("");
            return;
        }

        if (rawValue.length > 11) rawValue = rawValue.slice(0, 11);

        let formattedValue = "+7";
        if (rawValue.length > 1) formattedValue += ` (${rawValue.slice(1, 4)}`;
        if (rawValue.length > 4) formattedValue += `) ${rawValue.slice(4, 7)}`;
        if (rawValue.length > 7) formattedValue += `-${rawValue.slice(7, 9)}`;
        if (rawValue.length > 9) formattedValue += `-${rawValue.slice(9, 11)}`;

        setPhoneValue(formattedValue);
    };


    return variant === "phone" ? (
        <input
            type="tel"
            value={phoneValue}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            className={`${baseStyle(className)}
                ${isError ? "border-red-500" : ""}
                ${className}
            `}
            {...props}
        />
    ) : (
        <input
            type="text"
            placeholder={placeholder}
            className={`${baseStyle(className)}
                ${isError ? "border-red-500" : ""}
                ${className}
            `}
            {...props}
        />
    );
};