import React, { ReactElement, useContext, useEffect } from 'react';
import { FormContext } from '..';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import ErrorMessage from './errorMessage';

type CheckboxProps = {
    name: string,
    value?: string,
    checked?: boolean,
    label?: string | ReactElement | ReactElement[],
    isValid?: boolean,
    rules?: Array<Validation>,
    isDisabled?: boolean,
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const Checkbox = (props: CheckboxProps) => {
    const context = useContext(FormContext);
    const item = context.model.items.find(x => x.name === props.name);

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: props.checked ? props.value ?? "" : "",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel({ ...context.model });

        return () => {
            context.model.items = context.model.items.filter(x => x.name !== props.name);

            context.setModel({ ...context.model });
        }
    }, []);

    const handleChange = (value: any) => {
        if (item) {
            item.value = value;
            validateFormItem(item, context.model.items);

            context.setModel({ ...context.model });
        }

        if (props.changeFunction) {
            props.changeFunction(value);
        }
    }

    return (
        <div className={"form-item" + (item?.value == props.value ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                defaultChecked={props.checked}
                onChange={(e) => { handleChange(e.target.checked ? props.value : "") }}
                {...(props.isDisabled ? { disabled: true } : {})}
            />
            <label htmlFor={props.name}>{props.label}</label>
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default Checkbox;