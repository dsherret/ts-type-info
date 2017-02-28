import * as fs from "fs";

export class FileCache {
    private files: { filePath: string; text: string; }[] = [];

    protected constructor() {
    }

    static instance = new FileCache();

    getFileText(filePath: string) {
        let file = this.files.filter(f => f.filePath === filePath)[0];

        if (file == null) {
            this.files.push({ filePath, text: this.readFileSync(filePath) });
            file = this.files[this.files.length - 1];
        }

        return file.text;
    }

    protected readFileSync(filePath: string) {
        return fs.readFileSync(filePath, "utf-8");
    }
}
