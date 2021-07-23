

export interface IDICatalogRecord {
    name: string
    type: "singleton" | "factory"
    data: unknown
    instance?: unknown
}

export interface IDICatalog {
    factory: (name:string, data: unknown) => void
    singleton: (name:string, data: unknown, instance?: unknown) => void
    inject: (name: string) => unknown
}