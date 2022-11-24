import React, { Dispatch, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactElement, ReactNode, useEffect, useState } from "react";
import { validateFormItem, Validation } from "./models/validations";
import "./form.scss";

export type Form = {
    get: (name: string) => FormItem | undefined,
    getAll: () => FormItem[] | undefined
    getAllJson: () => any,
    getVal: (name: string) => string,
    setVal: (name: string, value: string) => void,
    validate: (name: string) => boolean,
    validateAll: () => boolean,
    isValid: (name: string) => boolean,
}

type FormProps = {
    onSubmit?: (model: any) => void,
    onError?: (model: any) => void,
    form?: Form,
    classNames?: string,
    children: ReactElement[] | ReactElement | string | (() => ReactNode)
}

export type FormItem = {
    name: string,
    value: string,
    rules?: Validation[],
    isValid?: boolean,
    data?: string
}

export type FormItemProps = {
    name: string,
    value?: string,
    rules?: Validation[],
    isValid?: boolean,
    classNames?: string,
    children?: ReactElement[] | ReactElement | string,
    onChange?: (value: string) => void,
    onFocus?: FocusEventHandler<HTMLElement>,
    onBlur?: FocusEventHandler<HTMLElement>
}

export type FormMouseEvents = {
    onClick?: MouseEventHandler<HTMLElement>,
    onMouseDown?: MouseEventHandler<HTMLElement>,
    onMouseUp?: MouseEventHandler<HTMLElement>,
    onMouseMove?: MouseEventHandler<HTMLElement>,
    onMouseEnter?: MouseEventHandler<HTMLElement>,
    onMouseLeave?: MouseEventHandler<HTMLElement>
}

export type FormKeyEvents = {
    onKeyPress?: KeyboardEventHandler<HTMLElement>,
    onKeyDown?: KeyboardEventHandler<HTMLElement>,
    onKeyUp?: KeyboardEventHandler<HTMLElement>
}

type FormContextType = {
    model: FormItem[],
    setModel: React.Dispatch<React.SetStateAction<FormItem[]>>
}

export const FormContext = React.createContext<FormContextType | null>(null) as React.Context<FormContextType>;

/**
 * Can have any form element or react element. Each form element must have unique name. Uses FormContext.
 */
const Form = (props: FormProps) => {
    const [model, setModel] = useState<FormItem[]>([]);
    const form = useForm();

    form.get = (name: string): FormItem | undefined => {
        return model.find(x => x.name === name);
    };

    form.getAll = (): any => {
        return model;
    };

    form.getAllJson = (): any => {
        let jsonModel: any = {};

        model.forEach((item, index) => {
            jsonModel[item.name] = item.value;
        });

        return jsonModel;
    };

    form.getVal = (name: string): string => {
        return model.find(x => x.name === name)?.value ?? "";
    };

    form.setVal = (name: string, value: string) => {
        const item = model.find(x => x.name === name);

        if (item) {
            item.value = value;
            setModel([...model]);
        }
    };

    form.validate = (name: string): boolean => {
        const item = model.find(x => x.name === name);

        if (item) {
            validateFormItem(item, model);
        }

        return item?.isValid ?? true;
    };

    form.validateAll = (): boolean => {
        model.forEach(item => {
            validateFormItem(item, model);
        });

        return model.every(x => x.isValid);
    };

    form.isValid = (name: string): boolean => {
        return model.find(x => x.name === name)?.isValid ?? false;
    };

    if (props.form) {
        props.form.get = form.get;
        props.form.getAll = form.getAll;
        props.form.getAllJson = form.getAllJson;
        props.form.getVal = form.getVal;
        props.form.setVal = form.setVal;
        props.form.validate = form.validate;
        props.form.validateAll = form.validateAll;
        props.form.isValid = form.isValid;
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (model && form.validateAll()) {
            if (props.onSubmit) {
                props.onSubmit(model);
            }
        }
        else if (props.onError) {
            props.onError(model);
        }

        setModel([...model]);
    }

    return (
        <FormContext.Provider value={{ model, setModel }}>
            <form className={"general" + (props.classNames ? " " + props.classNames : "")} onSubmit={handleSubmit} noValidate>
                {(typeof props.children).toLocaleLowerCase() == "function" ?
                    (props.children as Function)()
                    :
                    props.children
                }
            </form>
        </FormContext.Provider>
    );
};

/**
 * Returns an object to give props to form component for full control on form. In most cases you should use function statement for form's children to re-render.
 */
export function useForm(): Form {
    return {
        get: () => undefined,
        getAll: () => undefined,
        getAllJson: () => undefined,
        getVal: () => "",
        setVal: () => { },
        validate: () => false,
        validateAll: () => false,
        isValid: () => false
    };
}

export default Form;