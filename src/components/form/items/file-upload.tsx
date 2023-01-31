import React, { useContext, useEffect, useRef } from "react";
import { FormContext, FormItemProps, FormKeyEvents, FormMouseEvents } from "..";
import { validateFormItem } from "../models/validations";
import ErrorMessage from './errorMessage';

type FileUploadProps = FormItemProps & FormKeyEvents & FormMouseEvents & {
    isDisabled?: boolean,
    label?: string
}

const FileUpload = (props: FileUploadProps) => {
    const context = useContext(FormContext);
    const item = context.model.find(x => x.name === props.name);
    const input = useRef<HTMLInputElement>(null);
    const reader = new FileReader();

    //TODO: File upload

    useEffect(() => {
        if (context.model.some(x => x.name === props.name)) {
            throw new Error("Development error ---> Each form element must have unique name!");
        }
        
        context.setModel(model => {
            model.push({
                name: props.name,
                value: props.value ?? "",
                rules: props.rules,
                isValid: (props.rules ? props.isValid : true),
                data: ""
            });

            return [...model];
        });

        return () => {
            context.setModel(model => [...model.filter(x => x.name !== props.name)]);
        }
    }, []);

    const handleChange = (value: string) => {
        if (input && input.current && input.current.files && input.current.files.length > 0) {
            reader.readAsDataURL(input.current.files[0]);
        }
        else {
            if (input && input.current) {
                input.current.value = "";

                if (item) {
                    item.data = "";
                    context.setModel([...context.model]);
                }
            }
        }

        if (item) {
            item.value = value;
            validateFormItem(item, context.model);

            context.setModel([...context.model]);
        }

        if (props.onChange) {
            props.onChange(value);
        }
    }

    reader.addEventListener("load", function () {
        if (item) {
            item.data = reader.result as string;
            context.setModel([...context.model]);
        }
    }, false);

    // let btnUploadClick = (e: React.MouseEvent) => {
    //     input.current?.click();
    // }

    // let btnRemoveClick = (e: React.MouseEvent) => {
    //     if (input && input.current) {
    //         const item = context.model.find(x => x.name === props.name);

    //         input.current.value = "";

    //         if (item) {
    //             item.data = "";
    //             context.setModel([...context.model]);
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

export default FileUpload;