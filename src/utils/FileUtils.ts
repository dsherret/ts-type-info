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
}
