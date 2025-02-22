import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
    stroke?: string;
}

const SVGComponent = ({ stroke = "#737373", ...props }: SVGComponentProps) => (
    <svg
        width={16}
        height={18}
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M8.33317 9.83333C10.6344 9.83333 12.4998 7.96785 12.4998 5.66667C12.4998 3.36548 10.6344 1.5 8.33317 1.5C6.03198 1.5 4.1665 3.36548 4.1665 5.66667C4.1665 7.96785 6.03198 9.83333 8.33317 9.83333ZM8.33317 9.83333C10.1013 9.83333 11.797 10.5357 13.0472 11.786C14.2975 13.0362 14.9998 14.7319 14.9998 16.5M8.33317 9.83333C6.56506 9.83333 4.86937 10.5357 3.61913 11.786C2.36888 13.0362 1.6665 14.7319 1.6665 16.5"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default SVGComponent;
