import { SVGProps } from "react";

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={14}
        height={16}
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M4.33333 1.33334V4.00001M9.66667 1.33334V4.00001M1 6.66668H13M2.33333 2.66668H11.6667C12.403 2.66668 13 3.26363 13 4.00001V13.3333C13 14.0697 12.403 14.6667 11.6667 14.6667H2.33333C1.59695 14.6667 1 14.0697 1 13.3333V4.00001C1 3.26363 1.59695 2.66668 2.33333 2.66668Z"
            stroke="#404040"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default CalendarIcon;
