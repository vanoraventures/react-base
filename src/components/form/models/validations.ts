import { FormItem } from ".."

export type Validation = {
    type: ValidationType,
    value?: any,
    message?: string,
    isValid?: boolean,
    rule?: (value: any) => boolean
}

export enum ValidationType {
    Required,
    Email,
    MinLength,
    MaxLength,
    ExactLength,
    SameWith,
    Custom
}

export const Validate = {
    Required: (message?: string) : Validation => {
        return {
            type: ValidationType.Required,
            message: message
        }
    },
    Email: (message?: string) : Validation => {
        return {
            type: ValidationType.Email,
            message: message
        }
    },
    MinLength: (value: any, message?: string) : Validation => {
        return {
            type: ValidationType.MinLength,
            value: value,
            message: message
        }
    },
    MaxLength: (value: any, message?: string) : Validation => {
        return {
            type: ValidationType.MaxLength,
            value: value,
            message: message
        }
    },
    ExactLength: (value: any, message?: string) : Validation => {
        return {
            type: ValidationType.ExactLength,
            value: value,
            message: message
        }
    },
    SameWith: (value: any, message?: string) : Validation => {
        return {
            type: ValidationType.SameWith,
            value: value,
            message: message
        }
    },
    Custom: (rule: (value: any) => boolean, message?: string) : Validation => {
        return {
            type: ValidationType.Custom,
            rule: rule,
            message: message
        }
    }
}

export const validateFormItem = (item: FormItem, items: FormItem[]) => {
    item.isValid = true;

    if(item.rules) {
        item.rules.forEach((validation, index) => {
            validation.isValid = true;

            if (validation.type === ValidationType.Required) {
                if (item.value.length === 0) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.Email) {
                if (item.value.length > 0 && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(item.value))) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.MinLength) {
                if (item.value.length < validation.value) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.MaxLength) {
                if (item.value.length > validation.value) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.ExactLength) {
                if (item.value.length !== validation.value) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.SameWith) {
                let sameWithValue = items.find(x => x.name === item.rules?.find(x => x.type === ValidationType.SameWith)?.value)?.value;

                if (item.value !== sameWithValue) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.Custom) {
                if (validation.rule && !validation.rule(item.value)) {
                    validation.isValid = false;
                }
            }
        });

        if (item.rules.some(x => x.isValid === false)) {
            item.isValid = false;
        }
    }
}