import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Form, { FormContext } from ".";
import InputDate from "./items/input-date";
import { ValidationType } from './models/validations';
import InputSplit from "./items/input-split";
import FileUpload from "./items/file-upload";
import InputText from "./items/input-text";
import Checkbox from "./items/checkbox";

export default {
    title: "noyirmibir-react/form",
    component: Form,
};

const Template: Story = (args) => {
    return <Noyirmibir>
        <Form submitFunction={(model: any) => console.log(model)}>
            {/* <InputText name='fullname' rules={[{ type: ValidationType.Required, message: "Bu alan gereklidir." }]}></InputText> */}
            <Checkbox name='foreign' label='Yabancı' value='true'></Checkbox>
            <FormContext.Consumer>
                {context => {
                    return <>
                        {context.model.val("foreign") == "true" &&
                            <InputText name='passport' placeholder='Pasaport No' rules={[
                                { type: ValidationType.Required, message: "Gereklidir" }, { type: ValidationType.ExactLength, value: 14, message: "Pasaport no 14 haneli olmalıdır." }
                            ]}></InputText>
                        }
                    </>
                }}
            </FormContext.Consumer>
            <button>Gönder</button>
        </Form>
    </Noyirmibir>
};

export const Sample = Template.bind({});
Sample.args = {
    classNames: "Test"
};