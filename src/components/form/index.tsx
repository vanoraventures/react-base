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
    validate: (name: string) => boolean,
    validateAll: () => boolean,
    isValid: (name: string) => boolean
}

export type FormItem = {
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
        validate: (name: string): boolean => {
            const item = model.items.find(x => x.name === name);

            if (item) {
                validateFormItem(item, model.items);
            }
            
            return item?.isValid??true;
        },
        validateAll: (): boolean => {
            model.items.forEach(item => {
                validateFormItem(item, model.items);
            });

            return model.items.every(x => x.isValid);
        },
        isValid: (name: string): boolean => {
            return model.items.find(x => x.name === name)?.isValid??false;
        }
    });

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (model && model.validateAll()) {
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