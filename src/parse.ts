import {OpenAPIV3, OpenAPI} from "openapi-types";
import SwaggerParser from "@apidevtools/swagger-parser";

export async function parse(files: string[]): Promise<OpenAPIV3.Document[]> {
    let apis: OpenAPIV3.Document[] = []

    for (const file of files) {
        let apiRaw: OpenAPI.Document = await SwaggerParser.parse(file)

        apiRaw = await  SwaggerParser.validate(apiRaw)

        const api: OpenAPIV3.Document = apiRaw as OpenAPIV3.Document
        apis.push(api)
    }

    return apis
}