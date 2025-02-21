import type { SVGProps } from "react";

const BackArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={8}
        height={12}
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M6.5 11L1.5 6L6.5 1"
            stroke="#525252"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default BackArrowIcon;