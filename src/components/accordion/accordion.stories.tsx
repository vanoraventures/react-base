import React from "react";
import { Story } from "@storybook/react";
import { AccordionBody, AccordionHeader, AccordionItem } from ".";
import Noyirmibir from "../main";
import Accordion from ".";

export default {
    title: "noyirmibir-react/accordion",
    component: Accordion,
};

const Template: Story = (args) =>
    <Noyirmibir>
        <Accordion {...args}>
        <AccordionItem onOpen={() => { console.log("open") }} onClose={() => { console.log("close") }}>
                <AccordionHeader>
                    Header
                </AccordionHeader>
                <AccordionBody>
                    Body
                </AccordionBody>
            </AccordionItem>
            <AccordionItem>
                <AccordionHeader>
                    Header1
                </AccordionHeader>
                <AccordionBody>
                    Body1
                </AccordionBody>
            </AccordionItem>
        </Accordion>
    </Noyirmibir>;

export const Sample = Template.bind({});
Sample.args = {
    classNames: ""
};