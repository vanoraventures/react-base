import React, { useEffect, useState } from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Form, { FormItem, useForm } from ".";
import { Validate } from './models/validations';
import InputText from "./items/input-text";
import Checkbox from "./items/checkbox";
import { Prevent } from "./models/preventions";
import InputPassword from "./items/input-password";

export default {
    title: "noyirmibir-react/form",
    component: Form,
};

const Template: Story = (args) => {
    const form = useForm();

    return <Noyirmibir>
        <>
            <Form form={form} onSubmit={(model: FormItem[]) => console.log(model)}>
                <InputText name='fullname' rules={[Validate.Required()]} prevention={Prevent.OnlyEmail()}></InputText>
                <InputPassword name='password' rules={[Validate.Required()]}></InputPassword>
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