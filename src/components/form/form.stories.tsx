import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Form, { FormContext, FormItem, useForm } from ".";
import { Validate } from './models/validations';
import InputText from "./items/input-text";
import Checkbox from "./items/checkbox";
import { Prevent } from "./models/preventions";

export default {
    title: "noyirmibir-react/form",
    component: Form,
};

const Template: Story = (args) => {
    const form = useForm();

    // setTimeout(() => {
    //     form.setVal("foreign", "true");
    // }, 2000);

    return <Noyirmibir>
        <>
            <Form form={form} onSubmit={(model: FormItem[]) => alert(model)}>
                <InputText name='fullname' rules={[Validate.Required()]} prevention={Prevent.OnlyEmail()}></InputText>
                <Checkbox name='foreign' label='Yabancı' value='true'></Checkbox>
                <button>Submit</button>
            </Form>
            <button onClick={() => { form.setVal("fullname", "asd") }}>Change</button>
        </>
    </Noyirmibir>
};

export const Sample = Template.bind({});
Sample.args = {
    classNames: "Test"
};