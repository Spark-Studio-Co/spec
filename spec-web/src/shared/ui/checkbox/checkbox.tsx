import CheckboxIcon from "../../assets/icons/checkbox-icon"
import { useCheckboxStore } from "../../model/checkbox-store"
import { useEffect, useState } from "react"

interface ICheckboxProps {
    onClick?: (ctx: any) => void,
    storeKey: string,
    defaultChecked?: boolean
}

export const Checkbox = ({ onClick, storeKey, defaultChecked = false }: ICheckboxProps) => {
    const { checked, setChecked } = useCheckboxStore(storeKey)
    const [isChecked, setIsChecked] = useState(checked || defaultChecked)

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    const handleCheckbox = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsChecked(!isChecked)
        setChecked()

        if (onClick) {
            onClick(e);
        }
    }

    return (
        <button
            type="button"
            onClick={handleCheckbox}
            className="border-[#6271EB] border-[1.5px] w-[15px] h-[15px] rounded-[1.5px] bg-transparent flex items-center justify-center"
        >
            {isChecked && <CheckboxIcon />}
        </button>
    )
}
