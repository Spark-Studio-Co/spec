import CheckboxIcon from "../../assets/icons/checkbox-icon"

import { useCheckboxStore } from "../../model/checkbox-store"

interface ICheckboxProps {
    onClick?: (ctx: any) => void,
    storeKey: string
}

export const Checkbox = ({ onClick, storeKey }: ICheckboxProps) => {
    const { checked, setChecked } = useCheckboxStore(storeKey)

    const handleCheckbox = (e: React.MouseEvent) => {
        if (onClick) {
            onClick(e)
        }
        setChecked()
    }

    return (
        <button onClick={handleCheckbox} className="border-[#6271EB] border-[1.5px] w-[15px] h-[15px] rounded-[1.5px] bg-transparent flex items-center justify-center">
            {checked && <CheckboxIcon />}
        </button>
    )
}
