import React, { MouseEventHandler, ReactElement, useContext, useEffect, useState } from "react";
import "./accordion.scss";

type Props = {
    classNames?: string,
    children: ReactElement[] | ReactElement | string,
    onClick?: MouseEventHandler<HTMLElement>,
    onMouseDown?: MouseEventHandler<HTMLElement>,
    onMouseUp?: MouseEventHandler<HTMLElement>,
    onMouseMove?: MouseEventHandler<HTMLElement>,
    onMouseEnter?: MouseEventHandler<HTMLElement>,
    onMouseLeave?: MouseEventHandler<HTMLElement>
}

type ItemProps = Props & {
    isActive?: boolean,
    onOpen?: () => void,
    onClose?: () => void
}

type ItemContextType = {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccordionItemContext = React.createContext<ItemContextType | null>(null) as React.Context<ItemContextType>;

/**
 * Must have AccordionItem component
 */
const Accordion = (props: Props) => {
    return (
        <div
            className={"accordion" + (props.classNames ? " " + props.classNames : "")}
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseMove={props.onMouseMove}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}>
            {props.children}
        </div>
    );
};

/**
 * Must have two components AccordionHeader and AccordionBody
 */
export const AccordionItem = (props: ItemProps) => {
    const [isActive, setIsActive] = useState(props.isActive ? props.isActive : false);

    useEffect(() => {
        if (props.onOpen && isActive) {
            props.onOpen();
        }

        if (props.onClose && !isActive) {
            props.onClose();
        }
    }, [isActive]);

    return (
        <AccordionItemContext.Provider value={{ isActive, setIsActive }}>
            <div
                className={"accordion-item" + (props.classNames ? " " + props.classNames : "") + (isActive ? " active" : "")}
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                onMouseMove={props.onMouseMove}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}>
                {props.children}
            </div>
        </AccordionItemContext.Provider>
    );
};

/**
 * AccordionHeader can have any children
 */
export const AccordionHeader = (props: Props) => {
    const context = useContext(AccordionItemContext);

    const click = (event: any) => {
        context.setIsActive(!context.isActive);

        if (props.onClick) {
            props.onClick(event);
        }
    }

    return (
        <div
            className={"accordion-header" + (props.classNames ? " " + props.classNames : "")}
            onClick={click}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseMove={props.onMouseMove}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}>
            {props.children}
        </div>
    );
};

/**
 * AccordionBody can have any children
 */
export const AccordionBody = (props: Props) => {
    const context = useContext(AccordionItemContext);

    return context.isActive ?
        <div
            className={"accordion-body" + (props.classNames ? " " + props.classNames : "")}
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseMove={props.onMouseMove}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}>
            {props.children}
        </div>
        :
        <></>
};

export default Accordion;