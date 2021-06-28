"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserAuthToBackend = void 0;
const create_1 = require("../../create");
const create_2 = require("../../create");
const compileInterfaceOptions = (options, uniqueIdentifiersPublic, uniqueIdentifiersAuth, publicUserInputOpts) => __awaiter(void 0, void 0, void 0, function* () {
    const avatarInput = "avatar: {id:string, title:string, link:string, delete:string}";
    if (options.publicUserInputs.includes(avatarInput)) {
        yield createAvatarInterfaces();
        publicUserInputOpts.push("avatarOptions");
    }
    return {
        authInterfaceOptions: {
            options: {
                properties: options.authUserInputs.concat(options.authUserProperties),
                name: "authUser",
                comment: "Auth user interface created by the 'add user auth' mechanism of EPB",
                dbSchema: true,
                typeDef: true,
                type: "input",
            },
        },
        authSchemaOptions: {
            options: {
                properties: options.authUserInputs.concat(options.authUserProperties),
                name: "authUser",
                comment: "Auth user interface created by the 'add user auth' mechanism of EPB",
                dbSchema: true,
                typeDef: true,
                type: "input",
                uniqueIdentifiers: uniqueIdentifiersAuth,
            },
        },
        publicInterfaceOptionsInput: {
            options: {
                properties: publicUserInputOpts,
                name: "publicUser",
                comment: "Public user interface created by the 'add user auth' mechanism of EPB",
                dbSchema: true,
                typeDef: true,
                type: "input",
            },
        },
        publicInterfaceOptionsType: {
            options: {
                properties: options.publicUserInputs.concat(options.publicUserProperties),
                name: "publicUser",
                comment: "Public user interface created by the 'add user auth' mechanism of EPB",
                dbSchema: true,
                typeDef: true,
                type: "type",
            },
        },
        publicSchemaOptions: {
            options: {
                properties: options.publicUserInputs.concat(options.publicUserProperties),
                name: "publicUser",
                comment: "Public user interface created by the 'add user auth' mechanism of EPB",
                dbSchema: true,
                typeDef: true,
                type: "input",
                uniqueIdentifiers: uniqueIdentifiersPublic,
            },
        },
    };
});
const parseOptions = ({ options }) => {
    const uniqueIdentifiersPublic = [];
    if (options.publicUserInputs.includes("email: string"))
        uniqueIdentifiersPublic.push("email");
    if (options.publicUserInputs.includes("nickName: string"))
        uniqueIdentifiersPublic.push("nickName");
    if (options.publicUserInputs.includes("phone: string"))
        uniqueIdentifiersPublic.push("phone");
    const publicUserInputOpts = options.publicUserInputs.concat(options.publicUserProperties);
    const uniqueIdentifiersAuth = options.authUserInputs.includes("email:string")
        ? ["username", "email"]
        : ["username"];
    return {
        uniqueIdentifiersPublic,
        uniqueIdentifiersAuth,
        publicUserInputOpts,
    };
};
const createAvatarInterfaces = () => __awaiter(void 0, void 0, void 0, function* () {
    const avatarInterfaceOptions = {
        options: {
            properties: [
                "id: string",
                "title: string",
                "link: string",
                "delete: string",
            ],
            name: "avatar",
            comment: "Public user's avatar interface created by the 'add user auth' mechanism of EPB",
            dbSchema: true,
            typeDef: true,
            type: "input",
        },
    };
    yield create_1.createNewInterface(avatarInterfaceOptions); // create interaface + input typeDef
    avatarInterfaceOptions.options.type = "type";
    yield create_1.createNewInterface(avatarInterfaceOptions); // create "type" interface for typeDefs
    avatarInterfaceOptions.options.uniqueIdentifiers = [""];
    yield create_2.createDbSchema(avatarInterfaceOptions); //  + db schema
});
const compileInterfaces = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const { uniqueIdentifiersPublic, uniqueIdentifiersAuth, publicUserInputOpts, } = parseOptions({ options: options });
    const interfaceOptions = yield compileInterfaceOptions(options, uniqueIdentifiersPublic, uniqueIdentifiersAuth, publicUserInputOpts);
    const interfaces = {
        authInterface: yield create_1.createNewInterface(interfaceOptions.authInterfaceOptions),
        authSchema: yield create_2.createDbSchema(interfaceOptions.authSchemaOptions),
        publicInterface: yield create_1.createNewInterface(interfaceOptions.publicInterfaceOptionsType),
        publicInterfaceInput: yield create_1.createNewInterface(interfaceOptions.publicInterfaceOptionsInput),
        publicUserSchema: yield create_2.createDbSchema(interfaceOptions.publicSchemaOptions),
    };
    return interfaces;
});
const addUserAuthToBackend = ({ options }) => __awaiter(void 0, void 0, void 0, function* () {
    const interfaces = yield compileInterfaces({ options: options });
    return interfaces;
});
exports.addUserAuthToBackend = addUserAuthToBackend;
