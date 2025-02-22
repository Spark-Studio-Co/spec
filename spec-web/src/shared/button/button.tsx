import React, { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant: "disabled" | "default" | "transparent" | "red" | "green";
    width?: string;
    height?: string;
    className?: string;
}

const baseStyle = (width?: string, height?: string) =>
    `${width || "w-full"} ${height || "h-12"} flex items-center justify-center text-[1rem] rounded-[8px]`;

const variantStyle = (variant: string) => {
    switch (variant) {
        case "disabled":
            return "bg-gray text-white font-[600]";
        default:
            return "bg-main text-white font-[600]";
        case "transparent":
            return "bg-[#EFF3FE] text-[#1D1E49] font-[600]";
        case "red":
            return "bg-[#FFE2E2] text-dark font-[600]";
        case "green":
            return "bg-[#B9F8CF] text-dark font-[600]";
    }
};

export const Button: React.FC<IButtonProps> = ({
    label,
    variant,
    disabled,
    width,
    height,
    className,
    ...props
}) => {
    return (
        <button
            className={`${baseStyle(width, height)} ${variantStyle(variant)} ${className}`}
            disabled={disabled}
            {...props}
        >
            {label}
        </button>
    );
};