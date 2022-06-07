import React, { ReactElement, useContext, useState } from "react";
import "./accordion.scss";

type AccordionProps = {
    classNames?: string,
    children: ReactElement[] | ReactElement
}

type AccordionItemProps = {
    isActive?: boolean,
    classNames?: string,
    children: ReactElement[] | ReactElement
}

type AccordionHeaderProps = {
    classNames?: string,
    children: ReactElement[] | ReactElement | string
}

type AccordionBodyProps = {
    classNames?: string,
    children: ReactElement[] | ReactElement | string
}

type AccordionItemContextType = {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null) as React.Context<AccordionItemContextType>;

/**
 * Must have AccordionItem component
 */
const Accordion = (props: AccordionProps) => {
    return (
        <div className={"accordion" + (props.classNames ? " " + props.classNames : "")}>
            {props.children}
        </div>
    );
};

/**
 * Must have two components AccordionHeader and AccordionBody
 */
export const AccordionItem = (props: AccordionItemProps) => {
    const [isActive, setIsActive] = useState(props.isActive ? props.isActive : false);

    return (
        <AccordionItemContext.Provider value={{ isActive, setIsActive }}>
            <div className={"accordion-item" + (props.classNames ? " " + props.classNames : "") + (isActive ? " active" : "")}>
                {props.children}
            </div>
        </AccordionItemContext.Provider>
    );
};

/**
 * AccordionHeader can have any children
 */
export const AccordionHeader = (props: AccordionHeaderProps) => {
    const context = useContext(AccordionItemContext);

    const click = () => {
        context.setIsActive(!context.isActive);
    }

    return (
        <div onClick={click} className={"accordion-header" + (props.classNames ? " " + props.classNames : "")}>
            {props.children}
        </div>
    );
};

/**
 * AccordionBody can have any children
 */
export const AccordionBody = (props: AccordionBodyProps) => {
    const context = useContext(AccordionItemContext);

    return context.isActive ?
        <div className={"accordion-body" + (props.classNames ? " " + props.classNames : "")}>
            {props.children}
        </div>
        :
        <></>
};

export default Accordion;