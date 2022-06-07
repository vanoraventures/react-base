export type Validation = {
    type: ValidationType,
    value?: any,
    message?: string,
    isValid?: boolean,
    rule?: Function
}

export enum ValidationType {
    Required,
    Email,
    MinLength,
    MaxLength,
    ExactLength,
    SameWith,
    Custom,
    AllValidated
}

export const validateFormItem = (value: any, rules?: Validation[], sameWithValue?: any) => {
    let isValid = true;
    if(rules) {
        rules.forEach((validation, index) => {
            validation.isValid = true;

            if (validation.type === ValidationType.Required) {
                if (value.length === 0) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.Email) {
                if (value.length > 0 && !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.MinLength) {
                if (value.length < validation.value) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.MaxLength) {
                if (value.length > validation.value) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.ExactLength) {
                if (value.length !== validation.value) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.SameWith && sameWithValue) {
                if (value !== sameWithValue) {
                    validation.isValid = false;
                }
            }
            if (validation.type === ValidationType.Custom) {
                if (validation.rule && !validation.rule(value)) {
                    validation.isValid = false;
                }
            }
        });

        if (rules.some(x => x.isValid === false)) {
            isValid = false;
        }
    }

    return isValid;
}