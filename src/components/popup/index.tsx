import React, { ReactElement, useEffect, useState } from "react";
import useLockScroll from "../../core/lockscroll";
import "./popup.scss";

export type PopupProps = {
    init?: {
        open: () => void;
        close: () => void;
        init: (openReturn: () => void, closeReturn: () => void) => void;
    },
    isOpen?: boolean,
    classNames?: string,
    children: ReactElement[] | ReactElement | string
}

/**
 * Returns a popup with customized options
 */
const Popup = (props: PopupProps) => {
    const [lockScroll, unlockScroll] = useLockScroll();
    const [state, setState] = useState<"opened" | "closed">("closed");

    const open = () => {
        lockScroll();
        setState("opened");
    }

    const close = () => {
        unlockScroll();
        setState("closed");
    }

    useEffect(() => {
        props.init?.init(open, close);

        if (props.isOpen) {
            open();
        }

        return () => {
            close();
        }
    }, []);

    const closeClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).classList.contains("popup-wrapper")) {
            close();
        }
    }

    return (
        <div className={"popup-wrapper " + state + (props.classNames ? " " + props.classNames : "")} onClick={closeClick}>
            {props.children}
        </div>
    );
};

/**
 * Returns an object to give as props to popup component for more control on popup
 */
export function usePopup(): { open: () => void, close: () => void, init: (openReturn: () => void, closeReturn: () => void) => void } {
    const result = {
        open: () => { },
        close: () => { },
        init: (openReturn: () => void, closeReturn: () => void) => {
            result.open = openReturn;
            result.close = closeReturn;
        }
    }

    return result;
}

export default Popup;