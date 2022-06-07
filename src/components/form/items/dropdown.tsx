import Select from 'react-select'
import ErrorMessage from "./errorMessage";
import { ReactElement, useContext, useEffect, useState } from "react";
import React from 'react';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import { FormContext } from '..';

type DropdownProps = {
    name: string,
    value?: string,
    label?: string,
    placeholder?: string | ReactElement,
    isValid?: boolean,
    isDisabled?: boolean,
    rules?: Array<Validation>,
    options: {
        value: string,
        label: string
    }[],
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const Dropdown = (props: DropdownProps) => {
    const context = useContext(FormContext);
    const item = context.model.items.find(x => x.name === props.name);
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: props.value??"",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel({...context.model});

        return () => {
            context.model.items = context.model.items.filter(x => x.name !== props.name);

            context.setModel({...context.model});
        }
    }, []);

    const handleChange = (value: any) => {
        let sameWithValue = context.model.items.find(x => x.name === props.rules?.find(x => x.type === ValidationType.SameWith)?.value)?.value;

        if (item) {
            item.value = value;
            item.isValid = validateFormItem(value, item?.rules, sameWithValue);

            context.setModel({...context.model});
        }

        if (props.changeFunction) {
            props.changeFunction(value);
        }
    }

    return (
        <div className={"form-item" + ((item?.value??"".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}
            onFocusCapture={() => { setActive(true) }}
            onBlurCapture={() => { setActive(false) }}
        >
            {props.label &&
                <label>{props.label}</label>
            }
            <Select
                className={"select-container " + (isActive ? "active" : "")}
                classNamePrefix="select"
                placeholder={props.placeholder}
                name={props.name}
                isSearchable={false}
                value={props.value !== "" ? props.options?.find(option => option.value === props.value) : null}
                options={props.options}
                onChange={(e) => { handleChange(e?.value) }}
                isDisabled={props.isDisabled ? true : false}
            />
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default Dropdown;