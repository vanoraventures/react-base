import React, { ReactElement, useState } from "react";
import { validateFormItem, Validation } from "./models/validations";
import "./form.scss";

type FormProps = {
    children: ReactElement[] | ReactElement,
    submitFunction?: Function,
    errorFunction?: Function,
    classNames?: string
}

type FormState = {
    items: FormItem[],
    get: (name: string) => FormItem | undefined,
    val: (name: string) => string,
    isValid: (name: string) => boolean
}

type FormItem = {
    name: string,
    value: string,
    rules?: Validation[],
    isValid?: boolean,
    data?: string
}

type FormContextType = {
    model: FormState,
    setModel: React.Dispatch<React.SetStateAction<FormState>>
}

export const FormContext = React.createContext<FormContextType | null>(null) as React.Context<FormContextType>;

/**
 * Can have any form element or react element. Each form element must have unique name. Uses FormContext.
 */
const Form = (props: FormProps) => {
    const [model, setModel] = useState<FormState>({
        items: [],
        get: (name: string): FormItem | undefined => {
            return model.items.find(x => x.name === name);
        },
        val: (name: string): string => {
            return model.items.find(x => x.name === name)?.value??"";
        },
        isValid: (name: string): boolean => {
            return model.items.find(x => x.name === name)?.isValid??false;
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        model.items.forEach(item => {
            item.isValid = validateFormItem(item.value, item.rules);
        });

        if (model && model.items.every(x => x.isValid)) {
            let jsonModel: any = {};

            model.items.forEach((item, index) => {
                jsonModel[item.name] = item.value;
            });

            if (props.submitFunction) {
                props.submitFunction(jsonModel);
            }
        }
        else if (props.errorFunction) {
            props.errorFunction();
        }

        setModel({ ...model });
    }

    return (
        <FormContext.Provider value={{ model, setModel }}>
            <form className={"general" + (props.classNames ? " " + props.classNames : "")} onSubmit={handleSubmit} noValidate>
                {props.children}
            </form>
        </FormContext.Provider>
    );
};

export default Form;