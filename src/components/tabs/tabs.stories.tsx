import React from "react";
import { Story } from "@storybook/react";
import Tabs, { TabContainer, TabItem, TabMenu, TabMenuItem } from ".";
import Noyirmibir from "../main";

export default {
    title: "noyirmibir-react/tabs",
    component: Tabs,
};

const Template: Story = (args) =>
    <Noyirmibir>
        <Tabs {...args}>
            <TabMenu>
                <TabMenuItem>
                    Tab 1
                </TabMenuItem>
                <TabMenuItem>
                    Tab 2
                </TabMenuItem>
            </TabMenu>
            <TabContainer>
                <TabItem>
                    Tab Item 1
                </TabItem>
                <TabItem>
                    Tab Item 2
                </TabItem>
            </TabContainer>
        </Tabs>
    </Noyirmibir>;

export const Sample = Template.bind({});
Sample.args = {
    classNames: "",
    startIndex: 0
};