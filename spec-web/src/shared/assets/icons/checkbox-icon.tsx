import * as React from "react";

const CheckboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M5.5 9L8.16667 11.6667L12.5 6.5"
            stroke="#6271EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </svg>
);

export default CheckboxIcon;