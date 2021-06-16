import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { install } from "pkg-install";
import { jsMongo, tsMongo } from "./templates/dependencies/mongodb";
import Logger from "../logger/logger.ts";
const copy = promisify(ncp);
const write = promisify(fs.writeFile);
const writeToEnv = async (options) => {
  if (!options.env || typeof options.env !== "string") return;
  await write(`${options.targetDirectory}/.env`, `DB_URI="${options.env}"`);
};
const copyDatabaseFiles = async (options) => {
  const currentFileUrl = import.meta.url;
  const databaseTemplateDir = path
    .resolve(
      new URL(currentFileUrl).pathname,
      "./templates/dbtemplates",
      `${options.database.toLowerCase()}${`\\${
        options.templateDirectory.split("templates")[1]
      }`}`
    )
    .slice(3)
    .replace("setup-util.js\\", "");

  options.databaseTemplateDir = databaseTemplateDir;
  console.log(options);
  return copy(databaseTemplateDir, `${options.targetDirectory}/db`, {
    clobber: false,
  });
};
export const databaseSetup = async (options) => {
  await copyDatabaseFiles(options);
  options.template === "typescript"
    ? await install(tsMongo, { cwd: options.targetDirectory })
    : await install(jsMongo, { cwd: options.targetDirectory });
  return await writeToEnv(options);
};
