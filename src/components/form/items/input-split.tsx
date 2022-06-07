import React, { ReactElement, useContext, useEffect, useRef } from 'react';
import { FormContext } from '..';
import { Prevention, preventKey } from '../models/preventions';
import { validateFormItem, Validation, ValidationType } from '../models/validations';
import ErrorMessage from './errorMessage';

type InputSplitProps = {
    name: string,
    value?: string,
    charCount: number,
    isDisabled?: boolean,
    label?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    prevention?: Prevention,
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const InputSplit = (props: InputSplitProps) => {
    const inputs = useRef(new Array<HTMLInputElement>());
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

    const handleChange = (value: string, index: number) => {
        let currentValue = "";
        for (var i = 0; i < inputs.current.length; i++) {
            currentValue += inputs.current[i].value;
        }

        if (value) {
            const newIndex = index + 1;
            if (newIndex < props.charCount) {
                inputs.current[newIndex].focus();
            }
        }

        let sameWithValue = context.model.items.find(x => x.name === props.rules?.find(x => x.type === ValidationType.SameWith)?.value)?.value;

        if (item) {
            item.value = currentValue;
            item.isValid = validateFormItem(currentValue, item?.rules, sameWithValue);

            context.setModel({...context.model});
        }

        if (props.changeFunction) {
            props.changeFunction(currentValue);
        }
    }

    const onKeyDown = (event: React.KeyboardEvent, index: number) => {
        const key = event.key;
        var inputValue = inputs.current[index].value;

        if (key === "ArrowLeft") {
            const newIndex = index - 1;
            if (newIndex >= 0) {
                inputs.current[newIndex].focus();
                inputs.current[newIndex].selectionStart = 1;
                inputs.current[newIndex].selectionEnd = 1;
                event.preventDefault();
            }
        }
        else if (key === "ArrowRight") {
            const newIndex = index + 1;
            if (newIndex < props.charCount) {
                inputs.current[newIndex].focus();
                inputs.current[newIndex].selectionStart = 1;
                inputs.current[newIndex].selectionEnd = 1;
                event.preventDefault();
            }
        }
        else if (key === "Backspace") {
            const newIndex = index - 1;
            if (inputValue === "" && newIndex >= 0) {
                inputs.current[newIndex].focus();
                inputs.current[newIndex].selectionStart = 1;
                inputs.current[newIndex].selectionEnd = 1;
            }
        }
    }

    let items = [];
    for (let i = 0; i < props.charCount; i++) {
        items.push(<input
            ref={e => { if (e) { inputs.current[i] = e } }}
            maxLength={1}
            type="text"
            defaultValue={props.value?.substr(i, 1)}
            onKeyPress={(e) => preventKey(e, props.prevention)}
            onKeyDown={(e) => onKeyDown(e, i)}
            onChange={(e) => handleChange(e.target.value, i)} key={"input-split-" + i}
            {...(props.isDisabled ? { disabled: true } : {})}
        />);
    }

    return (
        <div className={"form-item" + ((item?.value ?? "".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            {props.label &&
                    <label>{props.label}</label>
                }
            <div className="split-container">
                {items}
            </div>
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default InputSplit;