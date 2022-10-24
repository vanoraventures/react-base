import ErrorMessage from './errorMessage';
import NumberFormat from 'react-number-format';
import React, { useContext, useEffect } from 'react';
import { validateFormItem } from '../models/validations';
import { FormContext, FormItemProps, FormKeyEvents, FormMouseEvents } from '..';

type InputNumberProps = FormItemProps & FormKeyEvents & FormMouseEvents & {
    isDisabled?: boolean,
    label?: string,
    placeholder?: string,
    customization?: {
        thousandSeparator?: string,
        decimalSeparator?: string,
        decimalScale?: number,
        fixedDecimalScale?: boolean,
        prefix?: string,
        suffix?: string
    }
}

const InputNumber = (props: InputNumberProps) => {
    const context = useContext(FormContext);
    const item = context.model.find(x => x.name === props.name);

    useEffect(() => {
        if (context.model.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.push({
            name: props.name,
            value: props.value ?? "",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel([...context.model]);

        return () => {
            context.model = context.model.filter(x => x.name !== props.name);

            context.setModel([...context.model]);
        }
    }, []);

    const handleChange = (value: string) => {
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
        <div className={"form-item" + ((item?.value ?? "".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            {props.label &&
                <label>{props.label}</label>
            }
            <NumberFormat
                name={props.name}
                value={item?.value}
                thousandSeparator={props.customization?.thousandSeparator}
                decimalSeparator={props.customization?.decimalSeparator}
                decimalScale={props.customization?.decimalScale}
                fixedDecimalScale={props.customization?.fixedDecimalScale}
                suffix={props.customization?.suffix}
                prefix={props.customization?.prefix}
                placeholder={props.placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleChange(e.target.value) }}
                onKeyPress={props.onKeyPress}
                onKeyDown={props.onKeyDown}
                onKeyUp={props.onKeyUp}
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
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default InputNumber;