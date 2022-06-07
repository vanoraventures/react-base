import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "..";
import { validateFormItem, Validation, ValidationType } from "../models/validations";
import ErrorMessage from './errorMessage';

type FileUploadProps = {
    name: string,
    value?: string,
    isDisabled?: boolean,
    label?: string,
    isValid?: boolean,
    rules?: Array<Validation>,
    classNames?: string,
    changeFunction?: Function,
    children?: ReactElement
}

const FileUpload = (props: FileUploadProps) => {
    const context = useContext(FormContext);
    const item = context.model.items.find(x => x.name === props.name);
    const input = useRef<HTMLInputElement>(null);
    const reader = new FileReader();

    useEffect(() => {
        if (context.model.items.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }

        context.model.items.push({
            name: props.name,
            value: props.value ?? "",
            rules: props.rules,
            isValid: (props.rules ? props.isValid : true),
            data: ""
        });

        context.setModel({ ...context.model });

        return () => {
            context.model.items = context.model.items.filter(x => x.name !== props.name);

            context.setModel({ ...context.model });
        }
    }, []);

    const handleChange = (value: string) => {
        let sameWithValue = context.model.items.find(x => x.name === props.rules?.find(x => x.type === ValidationType.SameWith)?.value)?.value;

        if (input && input.current && input.current.files && input.current.files.length > 0) {
            reader.readAsDataURL(input.current.files[0]);
        }
        else {
            if (input && input.current) {
                input.current.value = "";

                if (item) {
                    item.data = "";
                    context.setModel({ ...context.model });
                }
            }
        }

        if (item) {
            item.value = value;
            item.isValid = validateFormItem(value, item?.rules, sameWithValue);

            context.setModel({ ...context.model });
        }

        if (props.changeFunction) {
            props.changeFunction(value);
        }
    }

    reader.addEventListener("load", function () {
        if (item) {
            item.data = reader.result as string;
            context.setModel({ ...context.model });
        }
    }, false);

    // let btnUploadClick = (e: React.MouseEvent) => {
    //     input.current?.click();
    // }

    // let btnRemoveClick = (e: React.MouseEvent) => {
    //     if (input && input.current) {
    //         const item = context.model.items.find(x => x.name === props.name);

    //         input.current.value = "";

    //         if (item) {
    //             item.data = "";
    //             context.setModel({ ...context.model });
    //         }
    //     }
    // }

    return (
        <div className={"form-item" + ((item?.value ?? "".toString()).length > 0 ? " filled" : "") + (item?.isValid === false ? " error" : "") + (props.classNames ? " " + props.classNames : "")}>
            {props.label &&
                <label>{props.label}</label>
            }
            <input
                ref={input}
                type="file"
                name={props.name}
                defaultValue={props.value}
                onChange={(e) => handleChange(e.currentTarget.value)}
                {...(props.isDisabled ? { disabled: true } : {})}
            />
            {props.children}
            <ErrorMessage rules={item?.rules} />
        </div>
    )
}

export default FileUpload;