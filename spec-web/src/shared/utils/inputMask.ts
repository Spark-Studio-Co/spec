import { ChangeEvent } from "react";

export const inputMask = (e: ChangeEvent<HTMLInputElement>, setValue: (value: string) => void) => {
    let rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.length === 0) {
        setValue("");
        return { formattedValue: "", rawLength: 0 };
    }

    if (rawValue.length > 11) rawValue = rawValue.slice(0, 11);

    let formattedValue = "+7";
    if (rawValue.length > 1) formattedValue += ` (${rawValue.slice(1, 4)}`;
    if (rawValue.length > 4) formattedValue += `) ${rawValue.slice(4, 7)}`;
    if (rawValue.length > 7) formattedValue += `-${rawValue.slice(7, 9)}`;
    if (rawValue.length > 9) formattedValue += `-${rawValue.slice(9, 11)}`;

    setValue(formattedValue);
    return { rawLength: rawValue.length, rawValue };
};