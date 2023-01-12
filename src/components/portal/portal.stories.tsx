import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Portal, { PortalProps } from ".";

export default {
    title: "noyirmibir-react/portal",
    component: Portal,
};

const Template: Story<PortalProps> = (args: PortalProps) =>
    <Noyirmibir>
        <Portal {...args}>
            <div>test</div>
            <div>test2</div>
        </Portal>
    </Noyirmibir>;

export const Sample = Template.bind({});
Sample.args = {
    targetSelector: "body"
};