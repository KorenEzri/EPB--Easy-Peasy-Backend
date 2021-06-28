"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLastWordFromString = exports.insertToString = exports.pushIntoString = exports.capitalizeFirstLetter = exports.toImportStatements = exports.replaceAllInString = exports.fromLineArray = exports.splitNameType = exports.toLineArray = void 0;
const toLineArray = (string, parseFunc) => {
    if (parseFunc)
        return parseFunc(string.split("\n"));
    return string.split("\n");
};
exports.toLineArray = toLineArray;
const splitNameType = (toSplit) => {
    if (Array.isArray(toSplit)) {
        return toSplit.map((string) => {
            const splatString = string.split(":");
            return { name: splatString[0].trim(), type: splatString[1].trim() };
        });
    }
    else {
        const splatString = toSplit.split(":");
        return { name: splatString[0].trim(), type: splatString[1].trim() };
    }
};
exports.splitNameType = splitNameType;
const fromLineArray = (lineArray) => {
    return lineArray.join("\n");
};
exports.fromLineArray = fromLineArray;
const replaceAllInString = (str, find, replace) => {
    if (Array.isArray(find) && Array.isArray(replace)) {
        find.forEach((toFind, index) => {
            const escapedFind = toFind.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            str = str.replace(new RegExp(escapedFind, "g"), replace[index]);
        });
        return str;
    }
    else if (typeof replace === "string" && typeof find === "string") {
        const escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return str.replace(new RegExp(escapedFind, "g"), replace);
    }
    else
        return "err";
};
exports.replaceAllInString = replaceAllInString;
const toImportStatements = (importList) => {
    return importList.map((typeImport) => {
        return `import {${typeImport}} from './';`;
    });
};
exports.toImportStatements = toImportStatements;
// turn ['customTypeFoo', 'fooCustomType', 'fooOptionsCustomType']
// to ["import customTypeFoo from './';", "import fooCustomType from './';"]...
const capitalizeFirstLetter = (string) => {
    if (string[0] === "[")
        return "[" + string.charAt(1).toUpperCase() + string.slice(2);
    return string.charAt(0).toUpperCase() + string.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const pushIntoString = (stringToPushTo, handlerA, handlerB, stringToPush, extraFunc) => {
    const lineArray = exports.toLineArray(stringToPushTo, (arr) => arr.map((line) => line.trim()));
    // split the stirng to an array of lines, trim each line.
    const startIndex = typeof handlerA === "number" ? handlerA : lineArray.indexOf(handlerA) + 1; // The index (line number) in which to push
    const endIndex = typeof handlerB === "number" ? handlerB : lineArray.indexOf(handlerB); // The index (line number) in which to stop splicing.
    if (extraFunc)
        stringToPush = extraFunc(stringToPush);
    lineArray.splice(startIndex, endIndex - startIndex, stringToPush);
    return exports.fromLineArray(lineArray);
};
exports.pushIntoString = pushIntoString;
// params: - string to insert into
// - two handlers to produce a range inside an array of lines,
// - string to push - what to insert?
// - extra function (like parser etc)
const insertToString = (string, toInsert, type, selector) => {
    let handlerA;
    const stringLineArray = exports.toLineArray(string, (arr) => arr.map((line) => line.trim()));
    type.toLowerCase() === "mutation" // mutation or query? different line number
        ? (handlerA = stringLineArray.indexOf(`${selector} mutation-end`) - 1)
        : (handlerA = stringLineArray.indexOf(`${selector} query-end`) - 1);
    const handlerB = handlerA;
    return exports.pushIntoString(string, handlerA, handlerB, toInsert);
};
exports.insertToString = insertToString;
const removeLastWordFromString = (string, word) => {
    word.forEach((str) => {
        let firstIndex = string.indexOf(str);
        const lastIndex = string.lastIndexOf(str);
        if (firstIndex === -1 && !string.includes(str)) {
            return string;
        }
        if (firstIndex !== lastIndex) {
            string = string.substring(0, lastIndex);
        }
        else if (!string.split(str)[1]) {
            string = string.substring(0, lastIndex);
        }
    });
    return string;
};
exports.removeLastWordFromString = removeLastWordFromString;
// export const removeTypePostfix = (type: string) => {
//   const removeType = (type: string) => {
//     const firstIndex = type.indexOf("Type");
//     const lastIndex = type.lastIndexOf("Type");
//     if (firstIndex !== lastIndex) {
//       return;
//     }
//   };
//   if (!type.split("Type")[1]) type = removeTypePostfix(type);
//   if (type.includes("Type")) {
//     type = type.split("Type")[0];
//   }
//   if (type.includes("Input")) {
//     type = type.split("Input")[0];
//   }
//   return type;
// };
