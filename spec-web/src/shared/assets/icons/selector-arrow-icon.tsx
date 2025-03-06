import { SVGProps } from "react";

const SelectorArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={14}
        height={8}
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M1 1L7 7L13 1"
            stroke="#171717"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SelectorArrowIcon;
