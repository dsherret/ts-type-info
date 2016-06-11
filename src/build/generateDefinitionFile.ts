import * as path from "path";
import * as fs from "fs";
import {getInfoFromFiles} from "./../main";

export function generateDefinitionFile() {
    const fileInfo = getInfoFromFiles([
        path.join(__dirname, "../../src/main.ts"),
        path.join(__dirname, "../../src/typings/index.d.ts")
    ], { showDebugMessages: true }).getFile("main.ts");

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        imports: [{
            defaultImport: "CodeBlockWriter",
            moduleSpecifier: "code-block-writer"
        }]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}
