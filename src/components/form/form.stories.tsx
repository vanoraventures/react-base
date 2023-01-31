import React, { useEffect, useState } from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Form, { FormItem, useForm } from ".";
import { Validate } from './models/validations';
import InputText from "./items/input-text";
import Checkbox from "./items/checkbox";
import { Prevent } from "./models/preventions";
import InputPassword from "./items/input-password";
import Radio from "./items/radio";

export default {
    title: "noyirmibir-react/form",
    component: Form,
};

const Template: Story = (args) => {
    const form = useForm();

    return <Noyirmibir>
        <>
            <Form form={form} onSubmit={(model: FormItem[]) => console.log(model)}>
                {() => {
                    return <>
                        <InputText name='fullname' rules={[Validate.Custom((value: string) => value.charAt(0) == "a")]} prevention={Prevent.OnlyEmail()}></InputText>
                        {form.getVal("foreign") == "true" ?
                            <InputText name='fullnamea' placeholder="passport" rules={[Validate.Required()]} prevention={Prevent.OnlyEmail()}></InputText>
                            :
                            <InputPassword name='password' placeholder="tc kimlik" rules={[Validate.Required()]}></InputPassword>
                        }
                        <Checkbox name='foreign' label='Yabancı' value='asdad'></Checkbox>
                        {/* <Radio name="test" options={[
                            { value: "1", label: "test" },
                            { value: "2", label: "test2" },
                            { value: "3", label: "test3" }
                        ]}></Radio> */}
                        <button>Submit</button>
                    </>
                }}
            </Form>

            <button onClick={() => { form.clear(); }}>Change</button>
        </>
    </Noyirmibir>
};

export const Sample = Template.bind({});
Sample.args = {
    classNames: "Test"
};