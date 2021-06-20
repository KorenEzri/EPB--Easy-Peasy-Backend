"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = exports.compileToVarList = exports.replaceAllInString = void 0;
const replaceAllInString = (str, find, replace) => {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, "g"), replace);
};
exports.replaceAllInString = replaceAllInString;
const compileToVarList = (vars) => {
    return vars.map((variable) => {
        const splat = variable.split(":");
        const varb = splat[0];
        const varType = splat[1];
        return { var: varb, type: varType };
    });
};
exports.compileToVarList = compileToVarList;
const capitalizeFirstLetter = (string) => {
    if (string[0] === "[")
        return "[" + string.charAt(1).toUpperCase() + string.slice(2);
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
