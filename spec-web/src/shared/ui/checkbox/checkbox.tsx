import CheckboxIcon from "../../assets/icons/checkbox-icon"

import { useCheckboxStore } from "../../model/checkbox-store"

interface ICheckboxProps {
    onClick?: () => void,
    storeKey: string
}

export const Checkbox = ({ onClick, storeKey }: ICheckboxProps) => {
    const { checked, setChecked } = useCheckboxStore(storeKey)

    const handleCheckbox = () => {
        onClick
        setChecked()
    }

    return (
        <button onClick={handleCheckbox} className="border-[#6271EB] border-[1.5px] w-[15px] h-[15px] rounded-[1.5px] bg-transparent flex items-center justify-center">
            {checked && <CheckboxIcon />}
        </button>
    )
}
