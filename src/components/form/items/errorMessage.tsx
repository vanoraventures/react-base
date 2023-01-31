import React from "react";
import { Validation } from "../models/validations";

type ErrorMessageProps = {
    rules?: Validation[]
}

const ErrorMessage = (props :ErrorMessageProps) => {
    const errorMessage = props.rules?.find(x => x.isValid === false && x.message && x.message.length > 1)?.message;

    //TODO: JSX.Element 

    if (errorMessage) {
        return (
            <div className="error-message">{errorMessage}</div>
        )
    }

    return (null);
}

export default ErrorMessage;