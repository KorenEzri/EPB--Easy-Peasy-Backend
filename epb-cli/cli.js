import arg from "arg";
import execa from "execa";
import inquirer from "inquirer";
import { createProject } from "./main";

const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
};

const promptForMissingOptions = async (options) => {
  const defaultTemplate = "Typescript";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }
  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["Javascript", "Typescript"],
      default: defaultTemplate,
    });
  }
  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    });
  }
  if (!options.database) {
    questions.push({
      type: "list",
      name: "database",
      message: "Please choose a database to work with",
      choices: ["MongoDB"],
      default: "MongoDB",
    });
  }
  questions.push({
    type: "input",
    name: "env",
    message: "Database URI?",
  });
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    database: answers.database,
    env: answers.env,
  };
};

export const cli = async (args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  const res = await createProject(options);
  if (res) {
    await execa("npm run dev");
  }
};
