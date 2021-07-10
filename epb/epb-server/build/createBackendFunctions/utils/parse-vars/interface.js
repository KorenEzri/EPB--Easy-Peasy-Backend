"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInterfaceVarlist = void 0;
const utils = __importStar(require(".."));
const parseUtils = __importStar(require("../parse-vars.util"));
const parseInterfaceVarlist = (vars) => {
    let varList = utils.splitNameType(vars);
    let importList = [];
    if (!Array.isArray(varList))
        return { importList: [], varList };
    varList = varList.map((variable) => {
        let type = variable.type;
        if (parseUtils.isCustomType(type)) {
            importList.push(utils.removeLastWordFromString(type, ["Type", "Input"]));
        }
        else {
            type = type.toLowerCase();
        }
        type = parseUtils.parseArrayOperatorTypes(type);
        type = utils.replaceAllInString(type, "int", "number");
        type = utils.replaceAllInString(type, "Int", "number");
        type = utils.replaceAllInString(type, "date", "Date");
        return { name: variable.name, type };
    });
    return { importList, varList };
};
exports.parseInterfaceVarlist = parseInterfaceVarlist;
/* take an array of strings that look like this: "foo: int"
   and turn it into an array of { name: foo, type: int } and return it as varList
   also return importList - an array of custom types to import later in the interface's file.
   */
