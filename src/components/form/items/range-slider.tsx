import React, { useContext, useEffect } from 'react';
import { FormContext, FormItemProps } from '..';
import { Prevention } from '../models/preventions';
import { validateFormItem } from '../models/validations';
import ErrorMessage from './errorMessage';
import InputRange, { Range } from 'react-input-range';

type RangeSliderProps = FormItemProps & {
    max?: number,
    min?: number,
    step?: number,
    isDisabled?: boolean,
    value?: Range | number,
    formatLabel?: string,
    label?: string,
    prevention?: Prevention
}

const RangeSlider = (props: RangeSliderProps) => {
    const context = useContext(FormContext);
    const item = context.model.find(x => x.name === props.name);

    useEffect(() => {
        if (context.model.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.push({
            name: props.name,
            value: props.value ? JSON.stringify(props.value) : "",
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
            <InputRange
                maxValue={props.max}
                minValue={props.min}
                step={props.step}
                formatLabel={(e) => props.formatLabel ? `${e} ${props.formatLabel}` : ''}
                value={(typeof props.value == "string" ? item?.value ?? 0 * 1 : JSON.parse(item?.value ?? '{"min": 0, "max": 0}'))}
                onChange={(val: number | Range) => {
                    handleChange(typeof val == "number" ? val.toString() : JSON.stringify(val))
                }}
            />
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default RangeSlider;