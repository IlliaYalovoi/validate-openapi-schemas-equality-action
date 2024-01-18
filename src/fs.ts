import * as fs from 'fs'
import * as path from 'path'

export function getAllFilesInFolder(folderPath: string): string[] {
    const files: string[] = []

    function traverseDirectory(currentPath: string) {
        const items = fs.readdirSync(currentPath)

        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                traverseDirectory(itemPath)
            } else {
                files.push(itemPath)
            }
        })
    }

    traverseDirectory(folderPath)

    return files
}