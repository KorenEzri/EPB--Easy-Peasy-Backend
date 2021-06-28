"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.necessaryProperties = exports.possibleProperties = exports.possibleInputs = void 0;
exports.possibleInputs = {
    auth: [
        { inputName: "username", inputType: "string", validations: true },
        { inputName: "password", inputType: "string", validations: true },
        { inputName: "email", inputType: "string", validations: true },
        { inputName: "birthdate", inputType: "Date", validations: true },
    ],
    user: [
        { inputName: "firstName", inputType: "string", validations: true },
        { inputName: "lastName", inputType: "string", validations: true },
        { inputName: "nickName", inputType: "string", validations: true },
        { inputName: "phone", inputType: "string", validations: false },
        {
            inputName: "avatar",
            inputType: "{id: string, title: string, link: string, delete:string}",
            validations: false,
        },
        { inputName: "email", inputType: "string", validations: true },
        { inputName: "language", inputType: "string", validations: false },
        { inputName: "gender", inputType: "string", validations: true },
        { inputName: "birthdate", inputType: "Date", validations: true },
        { inputName: "address", inputType: "string", validations: false },
    ],
};
exports.possibleProperties = {
    auth: [],
    user: [
        { inputName: "isActive", inputType: "boolean", validations: false },
        { inputName: "lastConnected", inputType: "Date", validations: false },
    ],
};
exports.necessaryProperties = {
    auth: [
        { inputName: "access_token", inputType: "string", validations: false },
    ],
};
