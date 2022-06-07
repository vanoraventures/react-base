import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Background, { BackgroundProps } from ".";

export default {
    title: "noyirmibir-react/background",
    component: Background,
};

const Template: Story<BackgroundProps> = (args: BackgroundProps) =>
    <Noyirmibir>
        <Background {...args}>
            Sample
        </Background>
    </Noyirmibir>;

export const Sample = Template.bind({});
Sample.args = {
    classNames: "",
    desktop: "desktop",
    mobile: "mobile",
    isSection: true
};