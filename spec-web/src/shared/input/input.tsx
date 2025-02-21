import React from "react";

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



    return variant === "phone" ? (
        <input
            type="tel"
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