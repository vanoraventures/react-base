import React from "react";
import { Story } from "@storybook/react";
import Noyirmibir from "../main";
import Form, { FormContext } from ".";
import { Validate } from './models/validations';
import InputText from "./items/input-text";
import Checkbox from "./items/checkbox";
import Dropdown from "./items/dropdown";
import RangeSliderInput from "./items/range";

export default {
    title: "noyirmibir-react/form",
    component: Form,
};

const Template: Story = (args) => {
    return <Noyirmibir>
        <Form submitFunction={(model: any) => console.log(model)}>
            {/* <InputText name='fullname' rules={[{ type: ValidationType.Required, message: "Bu alan gereklidir." }]}></InputText> */}
            {/* <Checkbox name='foreign' label='Yabancı' value='true'></Checkbox> */}
            <FormContext.Consumer>
                {context => {
                    return <>
                        {context.model.val("foreign") == "true" &&
                            <InputText name='passport' placeholder='Pasaport No' rules={[
                                Validate.Required("Bu alan gereklidir."), Validate.ExactLength(14, "Pasaport no 14 haneli olmalıdır.")
                            ]}></InputText>
                        }
                        <Checkbox
                            label={"Test"}
                            name="isExemptFromEnglishLesson"
                            value="true"
                            // isDisabled={lock.personalInfo}
                            checked={true}
                        />
                       
                        <Dropdown
                            name="demo"
                            placeholder={"Lütfen Seçiniz"}
                            options={[{
                                label: "asd",
                                value: "1"
                            }]} />
                        <button onClick={() => {
                            const item = context.model.get("demo")
                            if (item) {
                                item.value = ""
                            }
                        }}>AAA</button>
                    </>
                }}
            </FormContext.Consumer>
        </Form>
    </Noyirmibir>
};

export const Sample = Template.bind({});
Sample.args = {
    classNames: "Test"
};