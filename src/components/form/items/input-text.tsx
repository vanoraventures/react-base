import React, { useContext, useEffect } from 'react';
import ErrorMessage from './errorMessage';
import InputMask from "react-input-mask";
import { Prevention, preventKey } from '../models/preventions';
import { FormContext, FormItemProps, FormKeyEvents, FormMouseEvents } from '..';
import { validateFormItem } from '../models/validations';

type InputTextProps = FormItemProps & FormKeyEvents & FormMouseEvents & {
    isDisabled?: boolean,
    label?: string,
    placeholder?: string,
    prevention?: Prevention,
    mask?: string | (string | RegExp)[]
}

const InputText = (props: InputTextProps) => {
    const context = useContext(FormContext);
    const item = context.model.find(x => x.name === props.name)??{
        name: props.name,
        value: props.value ?? "",
        rules: props.rules,
        isValid: (props.rules ? props.isValid : true)
    };

    useEffect(() => {
        if (context.model.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.push(item);

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
            {props.mask ?
                <InputMask
                    type="text"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={item?.value}
                    mask={props.mask}
                    onChange={(e) => { handleChange(e.target.value) }}
                    onKeyPress={(e) => { preventKey(e, props.prevention); if (props.onKeyPress) { props.onKeyPress(e); } }}
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
                :
                <input
                    type="text"
                    name={props.name}
                    placeholder={props.placeholder}
                    value={item?.value}
                    onChange={(e) => { handleChange(e.target.value) }}
                    onKeyPress={(e) => { preventKey(e, props.prevention); if (props.onKeyPress) { props.onKeyPress(e); } }}
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
            }
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default InputText;