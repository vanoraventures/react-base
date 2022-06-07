import React from "react";
import useWindowSize from "../../core/resize";
import "./image.scss";

export type ImageProps = {
    desktop: string,
    mobile?: string,
    alt?: string,
    classNames?: string
}

/**
 * Returns an img tag with responsive src option
 */
const Image = (props: ImageProps) => {
    const size = useWindowSize();

    return (
        <img {...(props.classNames ? {"className": props.classNames} : {})} src={size.isMobile && props.mobile ? props.mobile : props.desktop} {...(props.alt ? {"alt": props.alt} : {"aria-hidden": "true"})} />
    );
};

export default Image;