import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Image, { ImageProps } from ".";

export default {
    title: "noyirmibir-react/image",
    component: Image,
};

const Template: Story<ImageProps> = (args: ImageProps) =>
    <Noyirmibir>
        <Image {...args} />
    </Noyirmibir>;

export const Sample = Template.bind({});
Sample.args = {
    classNames: "",
    desktop: "desktop",
    mobile: "mobile",
    alt: ""
};