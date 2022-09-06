import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { FormContext } from '..';
import { Prevention, preventKey } from '../models/preventions';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import ErrorMessage from './errorMessage';
import InputRange, { Range } from 'react-input-range';

type RangeSliderProps = {
    name: string,
    max: number,
    min: number,
    step: number,
    isDisabled?: boolean,
    values: Range | number,
    formatLabel?: string,
    label?: string,
    placeholder?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    prevention?: Prevention,
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const RangeSliderInput = (props: RangeSliderProps) => {
    const context = useContext(FormContext);
    const item = context.model.items.find(x => x.name === props.name);
    const [value, setValue] = useState<Range | number>(props.values)

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: value ? JSON.stringify(value) : "",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true)
        });

        context.setModel({ ...context.model });

        return () => {
            context.model.items = context.model.items.filter(x => x.name !== props.name);

            context.setModel({ ...context.model });
        }
    }, []);

    const handleChange = (value: string) => {
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
        <div className={"form-item" + ((item?.value ?? "".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            {props.label &&
                <label>{props.label}</label>
            }
            <InputRange
                maxValue={props.max}
                minValue={props.min}
                formatLabel={(e) => props.formatLabel ? `${e} ${props.formatLabel}` : ''}
                value={value}
                onChange={(e: any) => {
                    handleChange(e)
                    setValue(e)
                }}
            />
            <input type="hidden" name={props.name} defaultValue={typeof (value) == "object" ? JSON.stringify(value) : value} />
        </div>
    )
}

export default RangeSliderInput;