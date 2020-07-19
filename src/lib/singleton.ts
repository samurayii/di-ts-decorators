/* eslint-disable @typescript-eslint/ban-types */
import { catalog } from "./catalog";

export function Singleton (name: string = "default", instance?: unknown, scope: string = "default", rewrite: boolean = false): Function {

    if (name !== undefined && instance !== undefined) {

        if (catalog[scope] === undefined) {
            catalog[scope] = {};
        }

        if (catalog[scope][name] !== undefined && rewrite === false) {              
            throw new Error(`Service locator error. Record ${name} already exist`);
        }

        if (typeof instance === "function") {
            catalog[scope][name] = {
                type: "singleton",
                constr: instance as FunctionConstructor
            };
        } else {
            catalog[scope][name] = {
                type: "singleton",
                instance: instance
            };
        }

    } else {

        scope = name;

        if (catalog[scope] === undefined) {
            catalog[scope] = {};
        }

        return function (target: Function) {

            const name_service = target.name;

            if (catalog[scope][name_service] !== undefined && rewrite === false) {              
                throw new Error(`Service locator error. Record ${name_service} already exist`);
            }

            catalog[scope][name_service] = {
                type: "singleton",
                constr: target as FunctionConstructor
            };

        };

    }

}