import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    isError?: boolean;
    variant?: "default" | "phone" | 'application';
    height?: string;
    width?: string;
    baseStyle?: 'authStyle' | 'applicationStyle'
}

const authStyle = (width?: string, height?: string): string => {
    return `${width ? width : "w-full"} ${height ? height : "h-[52px]"} border border-[#737373] rounded-[8px] px-4 text-[20px] font-[500] outline-none`;
};

const applicationStyle = (width?: string, height?: string): string => {
    return `${width ? width : "w-full px-4"} ${height ? height : "h-[48px]"} border border-[#737373] rounded-[8px] text-[16px] font-[400] outline-none`;
};


export const Input: React.FC<InputProps> = ({
    placeholder = "Введите текст",
    isError = false,
    variant = "default",
    className = "",
    width,
    height,
    baseStyle,
    ...props
}) => {

    switch (variant) {
        case 'default':
            return (
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`${baseStyle === 'authStyle' ? `${authStyle(width, height)}` : `${applicationStyle(width, height)}`}
                        ${isError ? "border-red-500" : ""}${className}`}{...props} />
            )
        case 'phone':
            return (
                <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className={`${baseStyle === 'authStyle' ? `${authStyle(width, height)}` : `${applicationStyle(width, height)}`}
                ${isError ? "border-red-500" : ""}
                ${className}
            `}
                    {...props}
                />
            )
    }
}
