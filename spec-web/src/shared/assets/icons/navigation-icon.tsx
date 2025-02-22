import type { SVGProps } from "react";

const NavigationIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={14}
        height={16}
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12.3333 6.66665C12.3333 9.99531 8.64067 13.462 7.40067 14.5326C7.28515 14.6195 7.14454 14.6665 7 14.6665C6.85547 14.6665 6.71486 14.6195 6.59934 14.5326C5.35934 13.462 1.66667 9.99531 1.66667 6.66665C1.66667 5.25216 2.22857 3.8956 3.22877 2.89541C4.22896 1.89522 5.58552 1.33331 7 1.33331C8.41449 1.33331 9.77105 1.89522 10.7712 2.89541C11.7714 3.8956 12.3333 5.25216 12.3333 6.66665Z"
            stroke="#262626"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7 8.66665C8.10457 8.66665 9 7.77122 9 6.66665C9 5.56208 8.10457 4.66665 7 4.66665C5.89544 4.66665 5 5.56208 5 6.66665C5 7.77122 5.89544 8.66665 7 8.66665Z"
            stroke="#262626"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default NavigationIcon;    