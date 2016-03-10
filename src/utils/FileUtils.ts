import * as fs from "fs";

export module FileUtils {
    export function getAllFileNamesFromFolder(dir: string) {
        const fileNames: string[] = [];

        fs.readdirSync(dir).forEach(function (file) {
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
