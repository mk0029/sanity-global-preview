import React from "react";

type IconType = "btn-arrow" | "menuIcon" | "crossIcon" | "rightArrow";

interface IconsProps extends React.SVGProps<SVGSVGElement> {
    icon: IconType;
    className?: string;
}

const Icons: React.FC<IconsProps> = ({ icon, className = "", ...props }) => {
    const iconsList: Record<IconType, JSX.Element> = {
        "btn-arrow": (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                {...props}
            >
                <path
                    className="group-hover:stroke-white transition-all duration-300 ease-linear"
                    d="M6 19L19 6M19 6V18.48M19 6H6.52"
                    stroke="#00171F"
                    strokeWidth="1.93338"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        menuIcon: (
            <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                {...props}
            >
                <path
                    d="M4.125 24.75V22H28.875V24.75H4.125ZM4.125 17.875V15.125H28.875V17.875H4.125ZM4.125 11V8.25H28.875V11H4.125Z"
                    fill="black"
                />
            </svg>
        ),
        crossIcon: (
            <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                {...props}
            >
                <path
                    d="M8.8 26.125L6.875 24.2L14.575 16.5L6.875 8.8L8.8 6.875L16.5 14.575L24.2 6.875L26.125 8.8L18.425 16.5L26.125 24.2L24.2 26.125L16.5 18.425L8.8 26.125Z"
                    fill="black"
                />
            </svg>
        ),
        rightArrow: (
            <svg width="29" height="10" viewBox="0 0 29 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2812 1L27.2412 4.96L23.2812 8.92" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M25.75 4.95996H1" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
            </svg>

        ),
    };

    return icon ? iconsList[icon] : null;
};

export default Icons;
