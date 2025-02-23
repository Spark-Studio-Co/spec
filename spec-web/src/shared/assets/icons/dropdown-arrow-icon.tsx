import { SVGProps } from "react";


const DropdownArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6 9L12 15L18 9"
            stroke="#262626"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default DropdownArrowIcon;
