/* eslint-disable @typescript-eslint/ban-types */
import DICatalog from "./catalog";
import * as chalk from "chalk";

export function Inject (name: string | Function): unknown {

    if (typeof name !== "string" && typeof name !== "function") {
        console.error(`${chalk.bgRed("[FATAL]")} DI Inject ${chalk.yellow("name")} must be ${chalk.yellow("string")} or ${chalk.yellow("class function")}`);
        process.exit(1);
    }

    if (typeof name === "function") {
        name = name.name;
    }

    return DICatalog.inject(name);
}