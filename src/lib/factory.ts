/* eslint-disable @typescript-eslint/ban-types */
import { catalog } from "./catalog";

export function Factory (name: string = "default", constructor?: unknown, scope: string = "default", rewrite: boolean = false): Function {

    if (name !== undefined && constructor !== undefined) {

        if (catalog[scope] === undefined) {
            catalog[scope] = {};
        }

        if (catalog[scope][name] !== undefined && rewrite === false) {              
            throw new Error(`Service locator error. Record ${name} already exist`);
        }

        if (typeof constructor !== "function") {              
            throw new Error("Service locator error. Constructor must be function");
        }

        catalog[scope][name] = {
            type: "factory",
            constr: constructor as FunctionConstructor
        };

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
                type: "factory",
                constr: target as FunctionConstructor
            };

        };

    }

}