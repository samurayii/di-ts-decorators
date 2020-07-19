/* eslint-disable @typescript-eslint/ban-types */
import { catalog } from "./catalog";

export function Value (name: string, instance: unknown, scope: string = "default", rewrite: boolean = false): void {

    if (catalog[scope] === undefined) {
        catalog[scope] = {};
    }

    if (name !== undefined && instance !== undefined) {

        if (catalog[scope][name] !== undefined && rewrite === false) {              
            throw new Error(`Service locator error. Record ${name} already exist`);
        }

        catalog[scope][name] = {
            type: "value",
            instance: instance
        };

    }

}