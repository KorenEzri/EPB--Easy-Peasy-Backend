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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolverBodies = exports.resolverTryCatchBlocks = exports.resolverTitles = exports.getMongooseMethod = exports.mutationCRUDS = exports.writeResolverIntoFile = exports.generateResolverName = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const utils = __importStar(require("../../../utils"));
const codeToString_1 = require("../../../codeToString");
const write = util_1.promisify(fs_1.default.writeFile);
const generateResolverName = (Model, action) => {
    Model = Model.split("Model").join("");
    Model = Model.split("Schema").join("");
    const actionSplit = action.split(" ");
    actionSplit;
    return `${utils.lowercaseFirstLetter(actionSplit[0])}${utils.capitalizeFirstLetter(Model)}`;
};
exports.generateResolverName = generateResolverName;
const writeResolverIntoFile = (resolver, type) => __awaiter(void 0, void 0, void 0, function* () {
    let allResolversAsString = (yield codeToString_1.getResolvers()) || ""; // current resolver file as string
    if (!allResolversAsString)
        return "Error in utils/createNew/createResolver.ts: No resolvers found!";
    const checkForDuplicates = yield utils.checkIfLinesAlreadyExist(resolver, undefined, allResolversAsString);
    if (checkForDuplicates.error) {
        return "Error: duplicate resolvers detected, aborting resolver creation";
    }
    const finishedResolvers = utils.insertToString(allResolversAsString, resolver, type, "//");
    yield write("./resolvers.ts", finishedResolvers);
});
exports.writeResolverIntoFile = writeResolverIntoFile;
exports.mutationCRUDS = [
    "CreateOne",
    "CreateMany",
    "UpdateOne",
    "UpdateMany",
    "DeleteOne",
    "DeleteMany",
];
const getMongooseMethod = (action, identifier, resolverVariable) => {
    switch (action) {
        case "CreateOne":
            return "save()";
        case "CreateMany":
            return `insertMany(${resolverVariable})`;
        case "ReadOne":
            return `findOne({${identifier.name}:${identifier.type}})`;
        case "ReadMany":
            return `find({${identifier.name}:${identifier.type}})`;
        case "ReadAll":
            return "find()";
        case "UpdateOne":
            return `findOneAndUpdate({${identifier.name}:${identifier.type}}, {${resolverVariable}})`;
        case "UpdateMany":
            return;
        case "DeleteOne":
            return `deleteOne({${identifier.name}:${identifier.type}})`;
        case "DeleteMany":
            return;
        default:
            break;
    }
};
exports.getMongooseMethod = getMongooseMethod;
exports.resolverTitles = {
    createOne: (parts) => `// Action: Create one ${parts.modelInterfaceName} Instance \n ${parts.resolverName}: async (_: any, { options }: { options: ${parts.modelInterfaceName} } ) => {`,
    createMany: (parts) => `// Action: Create many ${parts.modelInterfaceName} Instances \n ${parts.resolverName}s: async (_: any, { options }: { options: ${parts.modelInterfaceName}[] }) => {`,
    readOne: (parts) => {
        var _a, _b, _c;
        return `\n// Action: Read one ${parts.modelInterfaceName} Instance, based on an identifying property. \n\n ${parts.resolverName}: async (_:any, { ${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name} }: { ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name} :${utils.lowercaseFirstLetter(((_c = parts.identifier) === null || _c === void 0 ? void 0 : _c.type) || "")} }) => {`;
    },
    readMany: (parts) => {
        var _a, _b, _c;
        return `\n// Action: Read many ${parts.modelInterfaceName} Instances, based on an identifying property. \n\n ${parts.resolverName}s: async (_: any, { ${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name} }: { ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name} :${utils.lowercaseFirstLetter(((_c = parts.identifier) === null || _c === void 0 ? void 0 : _c.type) || "")} }) => {`;
    },
    readAll: (parts) => `\n// Action: Read all ${parts.modelInterfaceName} Instances \n\n ${parts.resolverName}s: async () => {`,
    updateOne: (parts) => {
        var _a, _b, _c;
        return `// Action: Update one ${parts.modelInterfaceName} Instance, based on an identifying property \n ${parts.resolverName}: async (_:any, { ${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name} }: { ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name} :${utils.lowercaseFirstLetter(((_c = parts.identifier) === null || _c === void 0 ? void 0 : _c.type) || "")} }, { options }: { options: ${parts.modelInterfaceName} } ) => {`;
    },
    deleteOne: (parts) => {
        var _a, _b, _c;
        return `// Action: Delete one ${parts.modelInterfaceName} Instance, based on an identifying property \n ${parts.resolverName}: async (_:any, { ${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name} }: { ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name} :${utils.lowercaseFirstLetter(((_c = parts.identifier) === null || _c === void 0 ? void 0 : _c.type) || "")} }) => {`;
    },
    deleteMany: (parts) => {
        var _a, _b, _c;
        return `// Action: Delete many ${parts.modelInterfaceName} Instances, based on an identifying property \n ${parts.resolverName}s: async (_: any, { ${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name} }: { ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name} :${utils.lowercaseFirstLetter(((_c = parts.identifier) === null || _c === void 0 ? void 0 : _c.type) || "")} }) => {`;
    },
};
exports.resolverTryCatchBlocks = {
    createOne: (parts) => `\n try {
        await ${parts.modelInstaceName}.${parts.mongooseMethod}
        return "OK"
      }
        catch ({ message }) {
            Logger ? Logger.error(message) : console.log(message)
            return message
      }`,
    createMany: (parts) => `\n try {
        await ${parts.mongoDBModelObjectName}.insertMany(options);
        return 'OK'
    }
    catch ({ message }) {
        Logger ? Logger.error(message) : console.log(message)
        return message
    }`,
    readOne: (parts) => {
        var _a, _b;
        return `\n try {
        const ${parts.modelInstaceName} = await ${parts.mongoDBModelObjectName}.findOne({${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name}:${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name}});
        return ${parts.modelInstaceName}
    }
    catch ({ message }) {
        Logger ? Logger.error(message) : console.log(message)
        return message
    }`;
    },
    readMany: (parts) => {
        var _a, _b;
        return `
      \n try {
          const ${parts.modelInstaceName}s = await ${parts.mongoDBModelObjectName}.find({${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name}: ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name}})
          return ${parts.modelInstaceName}s
      }
      catch ({ message }) {
          Logger ? Logger.error(message) : console.log(message)
          return message
      }
      `;
    },
    readAll: (parts) => `
      \n try {
        const ${parts.modelInstaceName}s = await ${parts.mongoDBModelObjectName}.find();
        return ${parts.modelInstaceName}s
    }
    catch ({ message }) {
        Logger ? Logger.error(message) : console.log(message)
        return message
    }
      `,
    updateOne: (parts) => {
        var _a, _b;
        return `
      \n try {
          await ${parts.mongoDBModelObjectName}.updateOne(
              {${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name}: ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name}}, options
          )
          return "OK";
      }
      catch ({ message }) {
        Logger ? Logger.error(message) : console.log(message)
        return message
    }
      `;
    },
    deleteOne: (parts) => {
        var _a, _b;
        return `
      \n try {
          await ${parts.mongoDBModelObjectName}.deleteOne({${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name}: ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name}});
          return 'OK'
      }
      catch ({ message }) {
        Logger ? Logger.error(message) : console.log(message)
        return message
    }
      `;
    },
    deleteMany: (parts) => {
        var _a, _b;
        return `
      \n try {
          await ${parts.mongoDBModelObjectName}.deleteMany({${(_a = parts.identifier) === null || _a === void 0 ? void 0 : _a.name}: ${(_b = parts.identifier) === null || _b === void 0 ? void 0 : _b.name}});
          return 'OK';
      }
      catch ({ message }) {
        Logger ? Logger.error(message) : console.log(message)
        return message
    }
      `;
    },
};
exports.resolverBodies = {
    createOne: (parts) => ` const ${parts.modelInstaceName} = new ${parts.mongoDBModelObjectName} ( options ) ${parts.resolverTryCatchBlock}`,
    createMany: (parts) => `${parts.resolverTryCatchBlock}`,
    readOne: (parts) => `${parts.resolverTryCatchBlock}`,
    readMany: (parts) => `${parts.resolverTryCatchBlock}`,
    readAll: (parts) => `${parts.resolverTryCatchBlock}`,
    updateOne: (parts) => `${parts.resolverTryCatchBlock}`,
    deleteOne: (parts) => `${parts.resolverTryCatchBlock}`,
    deleteMany: (parts) => `${parts.resolverTryCatchBlock}`,
};
