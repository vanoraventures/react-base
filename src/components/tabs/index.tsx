import React, { ReactElement, useContext, useState } from "react";
import "./tabs.scss";

type TabsProps = {
    classNames?: string,
    startIndex?: number,
    children: ReactElement[]
}

type TabMenuProps = {
    classNames?: string,
    children: ReactElement[]
}

type TabMenuItemProps = {
    classNames?: string,
    title?: string,
    children: ReactElement[] | ReactElement | string
}

type TabContainerProps = {
    classNames?: string,
    children: ReactElement[]
}

type TabItemProps = {
    classNames?: string,
    children: ReactElement[] | ReactElement | string
}

type TabContextType = {
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>
}

const TabContext = React.createContext<TabContextType | null>(null) as React.Context<TabContextType>;

/**
 * Must have two child components TabMenu and TabContainer
 */
const Tabs = (props: TabsProps) => {
    const [index, setIndex] = useState(props.startIndex ? props.startIndex : 0);

    return (
        <TabContext.Provider value={{ index, setIndex }}>
            <div className={"tabs" + (props.classNames ? " " + props.classNames : "")}>
                {props.children}
            </div>
        </TabContext.Provider>
    );
};

/**
 * Must have TabMenuItem components
 */
export const TabMenu = (props: TabMenuProps) => {
    return (
        <div className={"tab-menu" + (props.classNames ? " " + props.classNames : "")}>
            {props.children.map((item, index) => {
                return TabMenuItem(item.props, index);
            })}
        </div>
    );
};

/**
 * TabMenuItem can have any children
 */
export const TabMenuItem = (props: TabMenuItemProps, itemIndex: number) => {
    const context = useContext(TabContext);
    
    const click = () => {
        context.setIndex(itemIndex);
    }

    return (
        <a href="javascript:void(0)" title={props.title} onClick={click} className={"tab-menu-item" + (props.classNames ? " " + props.classNames : "") + (context.index === itemIndex ? " active" : "")}>
            {props.children}
        </a>
    );
};

/**
 * Must have TabItem components
 */
export const TabContainer = (props: TabContainerProps) => {
    const context = useContext(TabContext);

    return (
        <div className={"tab-container" + (props.classNames ? " " + props.classNames : "")}>
            {props.children.map((item, index) => {
                if (index === context.index && item.type === TabItem) {
                    return item;
                }
            })}
        </div>
    );
};

/**
 * TabItem can have any children
 */
export const TabItem = (props: TabItemProps) => {
    return (
        <div className={"tab-item" + (props.classNames ? " " + props.classNames : "")}>
            {props.children}
        </div>
    );
};

export default Tabs;