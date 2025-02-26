import { InputHTMLAttributes, forwardRef } from "react";

interface ISingleValueInput extends InputHTMLAttributes<HTMLInputElement> { }

export const SingleValueInput = forwardRef<HTMLInputElement, ISingleValueInput>(
    ({ placeholder, ...props }: ISingleValueInput, ref) => {
        return (
            <input
                ref={ref}
                placeholder={placeholder}
                {...props}
                className="max-w-[60px] h-[50px] rounded-[8px] flex items-center justify-center border border-[#737373] text-center placeholder:text-center outline-none uppercase"
                maxLength={1}
            />
        );
    }
);
