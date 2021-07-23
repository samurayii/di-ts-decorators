/* eslint-disable @typescript-eslint/ban-types */
import DICatalog from "./catalog";
import * as chalk from "chalk";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Factory (name?: string | Function, constructor_fn?: Function) {

    if (name === undefined) {
        return function (target: Function) {
            const name = target.name;
            DICatalog.factory(name, target);
        };
    } else {

        if (typeof name !== "function" && typeof name !== "string") {
            console.error(`${chalk.bgRed("[FATAL]")} DI Factory ${chalk.yellow("name")} must be ${chalk.yellow("string")} or ${chalk.yellow("class function")}`);
            process.exit(1);
        }

        if (typeof name === "function") {
            DICatalog.factory(name.name, name);
            return;
        }

        if (typeof name === "string" && typeof constructor_fn === "function") {
            DICatalog.factory(name, constructor_fn);
            return;
        }

        if (typeof name === "string") {
            return function (target: Function) {
                DICatalog.factory(name, target);
            };
        }

    }

}