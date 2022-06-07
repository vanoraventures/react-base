import React, { ReactElement, useContext, useEffect } from 'react';
import { FormContext } from '..';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import ErrorMessage from './errorMessage';

type RadioProps = {
    name: string,
    value?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    options: {
        value: string,
        label: string,
        isDisabled?: boolean
    }[],
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const Radio = (props: RadioProps) => {
    const context = useContext(FormContext);
    const item = context.model.items.find(x => x.name === props.name);

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
        <div className={"form-item" + ((item?.value??"".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            {props.options.map((radio, index) => (
                <div className="radio-item" key={"radio-" + index}>
                    <input
                        type="radio"
                        id={props.name + "-" + index}
                        name={props.name}
                        defaultValue={radio.value}
                        onChange={(e) => { handleChange(e.target.value) }}
                        checked={radio.value === props.value}
                        {...(radio.isDisabled ? { disabled: true } : {})}
                    />
                    <label htmlFor={props.name + "-" + index}>{radio.label}</label>
                </div>
            ))}
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default Radio;