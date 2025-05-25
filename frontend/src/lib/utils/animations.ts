export const fadeSlide = {
    initial: {opacity: 0, y: 10},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, y: -10},
    transition: {duration: 0.3},
};

export const expertMotionProps = {
    initial: {opacity: 0, x: 20},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -20},
    transition: {duration: 0.3},
    className: "space-y-3"
};

export const easyMotionProps = {
    initial: {opacity: 0, x: -20},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: 20},
    transition: {duration: 0.3},
    className: "space-y-3"
}