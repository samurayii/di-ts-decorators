import * as chalk from "chalk";
import { IDICatalog, IDICatalogRecord } from "../interfaces";

class DICatalog implements IDICatalog {

    private readonly _catalog: {
        [key: string]: IDICatalogRecord
    }

    constructor () {
        this._catalog = {};
    }

    factory (name: string, data: unknown): void {
        this._add("factory", name, data);
    }

    singleton (name: string, data: unknown, instance?: unknown): void {
        this._add("singleton", name, data, instance);
    }

    inject (name: string): unknown {

        if (this._catalog[name] === undefined) {
            console.error(`${chalk.bgRed("[FATAL]")} DI record ${chalk.yellow(name)} not exist`);
            process.exit(1);
        }

        const record = this._catalog[name];

        if (record.type === "factory") {
            return this._new(name);
        } else {
            if (record.instance !== undefined) {
                return record.instance;
            } else {
                if (typeof record.data === "function") {
                    record.instance = this._new(name);
                } else {
                    record.instance = record.data;
                }
                return record.instance;
            }
        }

    }

    private _new (name: string): unknown {
        const constructor = this._catalog[name].data as FunctionConstructor;
        return new constructor();
    }

    private _add (type: "singleton" | "factory", name: string, data: unknown, instance?: unknown): void {

        if (this._catalog[name] !== undefined) {
            console.error(`${chalk.bgRed("[FATAL]")} DI record ${chalk.yellow(name)} already exist`);
            process.exit(1);
        }

        this._catalog[name] = {
            name: name,
            type: type,
            data: data,
            instance: instance
        };

    }

}

export default new DICatalog();
