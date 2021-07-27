/* eslint-disable @typescript-eslint/ban-types */
import DICatalog from "./catalog";
import * as chalk from "chalk";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Singleton (name?: string | Function, constructor_fn?: unknown) {

    if (name === undefined) {
        return function (target: Function) {
            const name = target.name;
            DICatalog.singleton(name, target);
        };
    } else {

        if (typeof name !== "function" && typeof name !== "string") {
            console.error(`${chalk.bgRed("[FATAL]")} DI Singleton ${chalk.yellow("name")} must be ${chalk.yellow("string")} or ${chalk.yellow("class function")}`);
            process.exit(1);
        }

        if (typeof name === "function" && constructor_fn !== undefined) {
            DICatalog.singleton(name.name, name, constructor_fn);
            return;
        }

        if (typeof name === "function") {
            DICatalog.singleton(name.name, name);
            return;
        }

        if (typeof name === "string" && typeof constructor_fn === "function") {
            DICatalog.singleton(name, constructor_fn);
            return;
        }

        if (typeof name === "string" && constructor_fn !== undefined) {
            DICatalog.singleton(name, null, constructor_fn);
            return;
        }

        if (typeof name === "string") {
            return function (target: Function) {
                DICatalog.singleton(name, target);
            };
        }

    }

}