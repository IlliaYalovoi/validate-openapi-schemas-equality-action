import {parse} from "./parse";
import {isDuplicatingSchemasEquals} from "./checker";

const files : string[] = [
    "./api/auditlog.yaml",
    "./api/codewars.yaml",
    "./api/grading.yaml",
    "./api/inventory.yaml",
    "./api/notification.yaml",
    "./api/rbac.yaml",
    "./api/search.yaml",
    "./api/syllabus.yaml",
    "./api/user-management.yaml"
]

export async function run() {
    const apis = await parse(files)
    // console.log(apis)

    console.log(isDuplicatingSchemasEquals(apis))
}
