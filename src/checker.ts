import {OpenAPIV3} from "openapi-types";

interface validationError {
    schemaKey: string;
    error: string;
}

export function validateSchemas(apis: OpenAPIV3.Document[]): validationError[] | null {
    const schemaErrors: validationError[] = [];
    const schemaMap = new Map<string, any>()

    for (const api of apis) {
        if (api.components?.schemas == null) {
            continue
        }

        const schemaKeys = Object.keys(api.components.schemas);

        for(const schemaKey of schemaKeys) {
            const schema = api.components.schemas[schemaKey];

            if (schemaMap.has(schemaKey)) {
                if (!isObjectsEqual(schema, schemaMap.get(schemaKey))) {
                    schemaErrors.push({
                        schemaKey,
                        error: `Schema '${schemaKey}' in '${api.info.title}' does not pass validation.`,
                    })
                }
            } else {
                schemaMap.set(schemaKey, schema)
            }
        }
    }

    return schemaErrors.length > 0 ? schemaErrors : null
}

function isObjectsEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
        console.log(keys1.length, keys2.length, keys1.length !== keys2.length)
        return false
    }

    for (const key of keys1) {
        if (!deepEqual(obj1[key], obj2[key])) {
            return false
        }
    }

    return true
}

function deepEqual(value1: any, value2: any): boolean {
    if (value1 === value2) {
        return true
    }

    if (typeof value1 !== 'object' || typeof value2 !== 'object' || value1 === null || value2 === null) {
        return false
    }

    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (const key of keys1) {
        if (!deepEqual(value1[key], value2[key])) {
            return false
        }
    }

    return true
}