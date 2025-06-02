import {useEffect} from "react";

export default function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
// export default function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T>, handler: () => void) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler();
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [ref, handler]);
}