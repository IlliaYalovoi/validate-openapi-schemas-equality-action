import * as core from "@actions/core"

import {parseOpenAPIV3SpecFiles} from "./parser";
import {validateSchemas} from "./checker";
import {getAllFilesInFolder} from "./fs"

export async function run() {
    try {
        const path = core.getInput("path")
        const files = getAllFilesInFolder(path)

        const apis = await parseOpenAPIV3SpecFiles(files)
        const validationErrors = validateSchemas(apis)

        if (validationErrors !== null) {
            validationErrors.forEach((error) => {
                core.info(`Validation error for schema '${error.schemaKey}': ${error.error}`)
            })
            core.setFailed('Some files failed validation')
        } else {
            core.info('All schemas passed validation!')
        }
    } catch (error) {
        const formattedError = `An error occurred: ${error}`
        core.setFailed(formattedError)
    }
}
