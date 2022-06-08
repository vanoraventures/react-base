import React from "react";

export type Prevention = {
    type: PreventionType,
    rule?: (event: React.KeyboardEvent) => void
}

export enum PreventionType {
    OnlyNumber,
    OnlyText,
    Custom
}

export const Prevent = {
    OnlyNumber: () : Prevention => {
        return {
            type: PreventionType.OnlyNumber
        }
    },
    OnlyText: () : Prevention => {
        return {
            type: PreventionType.OnlyNumber
        }
    },
    Custom: (rule: (event: React.KeyboardEvent) => void) : Prevention => {
        return {
            type: PreventionType.Custom,
            rule: rule
        }
    }
}

export const preventKey = (event: React.KeyboardEvent, rule?: Prevention) => {
    if (rule) {
        if (rule.type === PreventionType.OnlyNumber) {
            return allowOnlyNumber(event);
        }
        else if (rule.type === PreventionType.OnlyText) {
            return allowOnlyText(event);
        }
        else if (rule.type === PreventionType.Custom && rule.rule) {
            return rule.rule(event);
        }
    }
}

const allowOnlyNumber = (event: React.KeyboardEvent) => {
    if("0123456789".indexOf(event.key) === -1) {
        event.preventDefault();
        return false;
    }

    return true;
}

const allowOnlyText = (event: React.KeyboardEvent) => {
    if(/^[a-zA-Z@]+$/.test(event.key)) {
        event.preventDefault();
        return false;
    }

    return true;
}