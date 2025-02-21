interface IButtonProps {
    label: string
    disabled?: boolean
    variant: "disabled" | "default" | "transparent" | "red" | "green"
    width?: string
    height?: string
    className?: string
}

const baseStyle = (width?: string, height?: string) => `${width || 'w-full'} ${height || 'h-12'} flex items-center justify-center text-[1rem] rounded-[8px]`

const variantStyle = (variant: string) => {
    switch (variant) {
        case "disabled":
            return "bg-gray text-white font-[600]"
        default:
            return "bg-main text-white font-[600]"
    }
}

export const Button = ({ label, variant, disabled, width, height, className }: IButtonProps) => {
    return (
        <button className={`${baseStyle(width, height)} ${variantStyle(variant)} ${className}`} disabled={disabled}>{label}</button>
    )
}
