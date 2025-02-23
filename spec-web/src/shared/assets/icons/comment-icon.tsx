import { SVGProps } from "react";

const CommentIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={14}
        height={14}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M5.66667 3.66667L3.66667 5.66667M3.66667 5.66667L5.66667 7.66667M3.66667 5.66667H9C9.35362 5.66667 9.69276 5.80714 9.94281 6.05719C10.1929 6.30724 10.3333 6.64638 10.3333 7V7.66667M13 9C13 9.35362 12.8595 9.69276 12.6095 9.94281C12.3594 10.1929 12.0203 10.3333 11.6667 10.3333H3.66667L1 13V2.33333C1 1.97971 1.14048 1.64057 1.39052 1.39052C1.64057 1.14048 1.97971 1 2.33333 1H11.6667C12.0203 1 12.3594 1.14048 12.6095 1.39052C12.8595 1.64057 13 1.97971 13 2.33333V9Z"
            stroke="#404040"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default CommentIcon;
