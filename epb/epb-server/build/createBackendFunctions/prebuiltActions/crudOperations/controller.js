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
exports.addCrudToDBSchemas = void 0;
const createCRUDResolvers_1 = require("./mongodb/createCRUDResolvers");
const consts_1 = require("../../../consts");
const codeToString_1 = require("../../codeToString");
const util_1 = require("./mongodb/util");
const fs_1 = __importDefault(require("fs"));
const util_2 = require("util");
const utils = __importStar(require("../../utils"));
const logger_1 = __importDefault(require("../../../logger/logger"));
const createCRUDTypedef_1 = require("./mongodb/createCRUDTypedef");
const write = util_2.promisify(fs_1.default.writeFile);
const read = util_2.promisify(fs_1.default.readFile);
const createDBSchemaConfigList = (schemaName) => __awaiter(void 0, void 0, void 0, function* () {
    schemaName = schemaName.split(".ts").join("");
    const ConfigListPath = `db/schemas/${schemaName}Config.json`;
    const doesSchemaExist = yield utils.checkIfFileAlreadyExists("db/schemas", `${schemaName}`);
    if (!doesSchemaExist) {
        logger_1.default.error("FROM: EPB-server: Schema file could not be found, aborting CRUD configurations.");
        return;
    }
    const doesConfigListExist = yield utils.checkIfFileAlreadyExists("db/schemas", `${schemaName}Config.json`);
    if (!doesConfigListExist) {
        logger_1.default.info("FROM: EPB-server: Schema configuration file was not found. Creating a configuration .ts file..");
        yield write(ConfigListPath, consts_1.availableCRUDActions);
        return ConfigListPath;
    }
    else
        return ConfigListPath;
});
//
const getDBSchemaConfigList = (schemaName) => __awaiter(void 0, void 0, void 0, function* () {
    const configFilepath = yield createDBSchemaConfigList(schemaName);
    if (!configFilepath)
        return "Error: schema config file doesn't exist.";
    return yield read(configFilepath, "utf8");
});
//
const validateCRUDopAvailability = (schemaName, crudOps) => __awaiter(void 0, void 0, void 0, function* () {
    const availableCrudOperations = yield getDBSchemaConfigList(schemaName);
    const availableCrudOpsLineArray = JSON.parse(availableCrudOperations).availableCRUDActions;
    const errors = [];
    crudOps.forEach((crudOp) => {
        if (!availableCrudOpsLineArray.includes(crudOp)) {
            errors.push({
                error: true,
                message: `Crud operation ${crudOp} is not availabe for schema ${schemaName}.`,
            });
        }
    });
    if (errors.length)
        return errors;
});
//
const checkIfInterfaceExists = (schemaName) => __awaiter(void 0, void 0, void 0, function* () {
    const interfaceName = schemaName.split("Schema")[0];
    return yield utils.checkIfFileAlreadyExists("types", `${interfaceName}Options.ts`);
});
const removeCrudOpsFromAvailabilityList = (schemaName, crudOps) => __awaiter(void 0, void 0, void 0, function* () {
    const listPath = `db/schemas/${schemaName}Config.json`;
    let configList = JSON.parse(yield read(listPath, "utf8"));
    crudOps.forEach((crud) => {
        configList.availableCRUDActions = configList.availableCRUDActions.filter((val) => val.trim() !== crud.trim());
    });
    yield write(listPath, JSON.stringify(configList));
});
//
const insertModelImportStatementToResolverFile = (modelName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allResolversAsString = (yield codeToString_1.getResolvers()) || ""; // current resolver file as string
        if (!allResolversAsString)
            return "Error in utils/createNew/createResolver.ts: No resolvers found!";
        const startHandler = "// model imports";
        const endHandler = "// model imports end";
        yield utils.insertStringToFileInRangeOfLines("./resolvers.ts", utils.capitalizeFirstLetter(modelName), startHandler, endHandler);
    }
    catch ({ message }) {
        logger_1.default.error(`FROM: EPB-server: Error with insertImportStatementToResolverFile() at utils/prebuiltActions/crudOperations/controller.ts ~line 64, ${message}`);
    }
});
const insertOptionsInterfaceImportToResolverFile = (optionsName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allResolversAsString = (yield codeToString_1.getResolvers()) || ""; // current resolver file as string
        if (!allResolversAsString)
            return "Error in utils/createNew/createResolver.ts: No resolvers found!";
        const startHandler = "// option types";
        const endHandler = "// option types end";
        yield utils.insertStringToFileInRangeOfLines("./resolvers.ts", `${optionsName},`, startHandler, endHandler, false, 0, "// option types");
    }
    catch ({ message }) {
        logger_1.default.error(`FROM: EPB-server: Error with insertImportStatementToResolverFile() at utils/prebuiltActions/crudOperations/controller.ts ~line 64, ${message}`);
    }
});
//
const createCrudOps = (schemaName, crudOps, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    crudOps = crudOps.map((op) => op.split(" ").join(""));
    for (let i = 0; i < crudOps.length; i++) {
        const crudOperation = crudOps[i];
        const resolverType = util_1.mutationCRUDS.includes(crudOperation)
            ? "Mutation"
            : "Query";
        const options = {
            Model: schemaName,
            action: crudOperation,
            resolverType,
            identifier,
        };
        yield createCRUDResolvers_1.createResolverFromOpts(options);
        const typeDefOptions = {
            modelName: schemaName,
            action: crudOperation,
            resolverType,
            identifier,
        };
        yield createCRUDTypedef_1.createTypedef(typeDefOptions);
        logger_1.default.http(`FROM: EPB-server: created CRUD action ${crudOperation}, applying Prettier..`);
        yield utils.applyPrettier();
    }
});
//
//
//
const addCrudToDBSchemas = (schemaName, crudOperations, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    schemaName = schemaName.split(".ts").join("");
    const doesInterfaceExist = yield checkIfInterfaceExists(schemaName);
    if (!doesInterfaceExist)
        return {
            error: true,
            message: `An interface for the schema ${schemaName} doesn't exist. Please create one first.`,
        };
    yield createDBSchemaConfigList(schemaName); // checks if a config file exists, if it doesn't, it creates one.
    const availabilityErrors = yield validateCRUDopAvailability(
    // makes sure the received CRUD operations are viable for the schema.
    schemaName, crudOperations);
    if (availabilityErrors)
        return availabilityErrors; // if some operations are invalid, returns an array of errors.
    const schemaNameOnly = utils.replaceAllInString(schemaName, "Schema", "");
    const modelName = `${schemaNameOnly}Model`;
    const optionsName = `${utils.lowercaseFirstLetter(schemaNameOnly)}Options`;
    logger_1.default.http(`FROM: EPB-server: Inserting import statements...`);
    yield insertModelImportStatementToResolverFile(modelName);
    yield insertOptionsInterfaceImportToResolverFile(optionsName);
    logger_1.default.http(`FROM: EPB-server: Creating ${crudOperations.length} CRUD operations..`);
    yield createCrudOps(schemaName, crudOperations, identifier);
    yield removeCrudOpsFromAvailabilityList(schemaName, crudOperations);
    logger_1.default.http(`FROM: EPB-server: Finished.`);
    return {
        error: false,
        message: `OK`,
    };
});
exports.addCrudToDBSchemas = addCrudToDBSchemas;
