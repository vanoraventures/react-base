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

const RangeSlider = (props: RangeSliderProps) => {
    const context = useContext(FormContext);
    const item = context.model.items.find(x => x.name === props.name);

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: props.values ? JSON.stringify(props.values) : "",
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
                value={(typeof props.values == "string" ? item?.value??0 * 1 : JSON.parse(item?.value??'{"min": 0, "max": 0}'))}
                onChange={(val: number | Range) => {
                    handleChange(typeof val == "number" ? val.toString() : JSON.stringify(val))
                }}
            />
        </div>
    )
}

export default RangeSlider;