import React, { ReactElement, useContext, useEffect } from 'react';
import { FormContext, FormItemProps, FormMouseEvents } from '..';
import { validateFormItem } from '../models/validations';
import ErrorMessage from './errorMessage';

type CheckboxProps = FormItemProps & FormMouseEvents & {
    checked?: boolean,
    label?: string | ReactElement | ReactElement[],
    isDisabled?: boolean
}

const Checkbox = (props: CheckboxProps) => {
    const context = useContext(FormContext);
    const item = context.model.find(x => x.name === props.name);

    useEffect(() => {
        if (context.model.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.push({
            name: props.name,
            value: props.checked ? props.value ?? "" : "",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel([...context.model]);

        return () => {
            context.model = context.model.filter(x => x.name !== props.name);

            context.setModel([...context.model]);
        }
    }, []);

    const handleChange = (value: any) => {
        if (item) {
            item.value = value;
            validateFormItem(item, context.model);

            context.setModel([...context.model]);
        }

        if (props.onChange) {
            props.onChange(value);
        }
    }

    return (
        <div className={"form-item" + (item?.value == props.value ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                checked={props.checked}
                onChange={(e) => { handleChange(e.target.checked ? props.value : "") }}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                onMouseMove={props.onMouseMove}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                {...(props.isDisabled ? { disabled: true } : {})}
            />
            <label htmlFor={props.name}>{props.label}</label>
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default Checkbox;