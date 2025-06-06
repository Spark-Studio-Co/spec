import * as React from "react";

const BigCalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={18}
        height={20}
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M5.66667 1.66663V4.99996M12.3333 1.66663V4.99996M1.5 8.33329H16.5M3.16667 3.33329H14.8333C15.7538 3.33329 16.5 4.07948 16.5 4.99996V16.6666C16.5 17.5871 15.7538 18.3333 14.8333 18.3333H3.16667C2.24619 18.3333 1.5 17.5871 1.5 16.6666V4.99996C1.5 4.07948 2.24619 3.33329 3.16667 3.33329Z"
            stroke="#404040"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default BigCalendarIcon;
