import * as fs from "fs";

export class FileUtils {
    static getAllFileNamesFromFolder(dir: string) {
        const fileNames: string[] = [];

        fs.readdirSync(dir).forEach(function(file) {
            file = dir + "/" + file;
            const stat = fs.statSync(file);

            if (stat && stat.isDirectory()) {
                fileNames.push(...FileUtils.getAllFileNamesFromFolder(file));
            } else {
                fileNames.push(file);
            }
        });

        return fileNames;
    }
}
