import {parseOpenAPIV3SpecFiles} from "./parser";
import {validateSchemas} from "./checker";
import {getAllFilesInFolder} from "./fs"

// const files : string[] = [
//     "./api/auditlog.yaml",
//     "./api/codewars.yaml",
//     "./api/grading.yaml",
//     "./api/inventory.yaml",
//     "./api/notification.yaml",
//     "./api/rbac.yaml",
//     "./api/search.yaml",
//     "./api/syllabus.yaml",
//     "./api/user-management.yaml"
// ]

const path = './api'

export async function run() {
    try {
        const files = getAllFilesInFolder(path)

        const apis = await parseOpenAPIV3SpecFiles(files)

        const validationErrors = validateSchemas(apis)

        if (validationErrors !== null) {
            validationErrors.forEach((error) => {
                console.error(`Validation error for schema '${error.schemaKey}': ${error.error}`);
            })
        } else {
            console.log('All schemas passed validation.')
        }

    } catch (error) {
        console.error('An error occurred:', error)
    }

}
