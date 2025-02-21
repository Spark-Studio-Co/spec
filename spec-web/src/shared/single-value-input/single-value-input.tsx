import React, { InputHTMLAttributes } from "react";

interface ISingleValueInput extends InputHTMLAttributes<HTMLInputElement> { }

export const SingleValueInput: React.FC<ISingleValueInput> = ({ placeholder, ...props }: ISingleValueInput) => {
    return (
        <input placeholder={placeholder} {...props} className="max-w-[70px] h-[50px] rounded-[8px] flex items-center justify-center border border-[#737373] text-center placeholder:text-center outline-none" maxLength={1} />
    )
}
