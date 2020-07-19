type TCatalog = {
    [key: string]: {
        [key: string]: {
            type: string
            instance?: unknown
            constr?: FunctionConstructor 
        }
    }
}

export const catalog: TCatalog = {
    default: {}
};