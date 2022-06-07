import React, { useContext, useEffect } from 'react';
import ErrorMessage from './errorMessage';
import DatePicker from "react-datepicker";
import tr from "date-fns/locale/tr";
import { ReactElement, useState } from "react";
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import { FormContext } from '..';

type InputDateProps = {
    name: string,
    value?: string,
    isDisabled?: boolean,
    label?: string,
    placeholder?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement,
    customization?: {
        minDate?: Date,
        maxDate?: Date,
        format?: string,
        submitFormat?: {
            locales?: string | string[],
            options?: Intl.DateTimeFormatOptions
        }
    }
}

const InputDate = (props: InputDateProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
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

    const handleChange = (date: Date) => {
        const value = date.toLocaleString(props.customization?.submitFormat?.locales??"tr-TR", props.customization?.submitFormat?.options??{ year: 'numeric', month: 'numeric', day: 'numeric' });
        let sameWithValue = context.model.items.find(x => x.name === props.rules?.find(x => x.type === ValidationType.SameWith)?.value)?.value;

        if (item) {
            item.value = value;
            item.isValid = validateFormItem(value, item?.rules, sameWithValue);

            context.setModel({...context.model});
        }

        if (props.changeFunction) {
            props.changeFunction(value);
        }

        setSelectedDate(date);
    }
    
    let disabled: any = {};

    if (props.isDisabled) {
        disabled["disabled"] = "disabled";
    }

    return (
        <div className={"form-item" + ((item?.value??"".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            {props.label &&
                <label>{props.label}</label>
            }
            <DatePicker
                name={props.name}
                selected={selectedDate}
                placeholderText={props.placeholder}
                onChange={(date: Date) => handleChange(date)}
                autoComplete="off"
                dateFormat={props.customization?.format??"dd/MM/yyyy"}
                locale={tr}
                minDate={props.customization?.minDate}
                maxDate={props.customization?.maxDate}
                onKeyDown={(e) => { e.preventDefault() }}
                disabledKeyboardNavigation
                {...disabled}
            />
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default InputDate;