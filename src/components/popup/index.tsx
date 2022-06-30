import React, { ReactElement, useEffect, useState } from "react";
import useLockScroll from "../../core/lockscroll";
import "./popup.scss";

export type PopupProps = {
    init?: Popup,
    isOpen?: boolean,
    classNames?: string,
    children: ReactElement[] | ReactElement | string
}

type Popup = {
    open: () => void,
    close: () => void
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

    if (props.init) {
        props.init.open = open;
        props.init.close = close;
    }

    useEffect(() => {
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
export function usePopup(): Popup {
    return {
        open: () => { },
        close: () => { }
    };
}

export default Popup;