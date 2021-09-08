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
  await write(`${options.targetDirectory}/.env`, `MONGO_URI="${options.env}"`);
};
const copyDatabaseFiles = async (options) => {
  try {
    await write(
      `${options.targetDirectory}/epb.config.json`,
      `{"database": "${options.database.toLowerCase()}"}`
    );
  } catch ({ message }) {
    Logger.error(
      "FAIL at setup-util.js at ~line 16 trying to insert DB type to epb.config.json, KOREN I TOLD YOU TO CHECK THIS"
    );
  }
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
    .replace("main.js\\", "");

  options.databaseTemplateDir = databaseTemplateDir;
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
