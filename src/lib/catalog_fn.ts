/* eslint-disable @typescript-eslint/ban-types */
import { catalog } from "./catalog";

export function Catalog (service: string | Function, scope: string = "default" ): unknown {

    let service_name: string;

    if (typeof service === "function") {
        service_name = service.name;
    } else {
        service_name = service;
    }

    if (typeof service_name !== "string") {
        throw new Error("Service locator error. Catalog ID must be string or class");
    }

    if (typeof scope !== "string") {
        throw new Error("Service locator error. Scope must be string");
    }

    if (catalog[scope] === undefined) {
        throw new Error(`Service locator error. Scope ${scope} not found`);
    }

    if (catalog[scope][service_name] === undefined) {
        throw new Error(`Service locator error. Record ${service_name} of scope ${scope} not found`);
    }

    const record = catalog[scope][service_name];

    if (record.type === "singleton") {
        
        if (record.instance === undefined) {
            record.instance = new record.constr();
        }

        return record.instance;
    }

    if (record.type === "value") {
        return record.instance;
    }

    if (record.type === "factory") {
        return new record.constr();
    }
}