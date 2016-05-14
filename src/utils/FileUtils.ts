import * as fs from "fs";
import * as path from "path";

export module FileUtils {
    export function getAbsolutePath(filePath: string) {
        return path.resolve(filePath);
    }

    export function fileExistsSync(filePath: string) {
        try {
            return fs.statSync(filePath).isFile();
        } catch (err) {
            return false;
        }
    }

    export function filePathMatches(fileName: string, searchString: string) {
        const splitBySlash = (p: string) => (p || "").replace(/\\/g, "/").replace(/^\//, "").split("/");

        const fileNameItems = splitBySlash(fileName);
        const searchItems = splitBySlash(searchString);

        if (searchItems.length > fileNameItems.length) {
            return false;
        }

        for (let i = 0; i < searchItems.length; i++) {
            if (searchItems[searchItems.length - i - 1] !== fileNameItems[fileNameItems.length - i - 1]) {
                return false;
            }
        }

        return searchItems.length > 0;
    }
}
