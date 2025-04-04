

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
    stroke?: string;
}

const ArchiveIcon = ({ stroke = "#737373", ...props }: SVGComponentProps) => (
    <svg
        width={19}
        height={20}
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12.3333 13.3334L14 15L17.3333 11.6667M16.5 8.33335V6.66669C16.4997 6.37442 16.4225 6.08736 16.2763 5.83432C16.13 5.58128 15.9198 5.37116 15.6667 5.22502L9.83333 1.89169C9.57997 1.74541 9.29256 1.6684 9 1.6684C8.70744 1.6684 8.42003 1.74541 8.16667 1.89169L2.33333 5.22502C2.08022 5.37116 1.86998 5.58128 1.72372 5.83432C1.57745 6.08736 1.5003 6.37442 1.5 6.66669V13.3334C1.5003 13.6256 1.57745 13.9127 1.72372 14.1657C1.86998 14.4188 2.08022 14.6289 2.33333 14.775L8.16667 18.1084C8.42003 18.2546 8.70744 18.3316 9 18.3316C9.29256 18.3316 9.57997 18.2546 9.83333 18.1084L11.5 17.1584M5.25 3.55835L12.75 7.85002M1.74167 5.83335L9 10M9 10L16.2583 5.83335M9 10V18.3334"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default ArchiveIcon;
