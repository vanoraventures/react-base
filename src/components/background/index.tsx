import React, { ReactElement } from "react";
import useWindowSize from "../../core/resize";
import "./background.scss";

export type BackgroundProps = {
    desktop: string,
    mobile?: string,
    isSection?: boolean,
    classNames?: string,
    children?: ReactElement[] | ReactElement | string
}

/**
 * Returns a given tag with responsive background-image option
 */
const Background = (props: BackgroundProps) => {
    const size = useWindowSize();

    return (
        <>
            {props.isSection ?
                <section {...(props.classNames ? {"className": props.classNames} : {})} style={{backgroundImage: "url(" + (size.isMobile && props.mobile ? props.mobile : props.desktop) + ")"}}>
                    {props.children}
                </section>
                :
                <div {...(props.classNames ? {"className": props.classNames} : {})} style={{backgroundImage: "url(" + (size.isMobile && props.mobile ? props.mobile : props.desktop) + ")"}}>
                    {props.children}
                </div>
            }
        </>
    );
};

export default Background;