import * as path from "path";
import * as fs from "fs";
import {getInfoFromFiles} from "./../main";

export function generateDefinitionFile() {
    const result = getInfoFromFiles([
        path.join(__dirname, "../../src/main.ts"),
        path.join(__dirname, "../../src/typings/index.d.ts")
    ], { showDebugMessages: false });
    const fileInfo = result.getFile("main.ts");

    // remove internal properties
    const baseDefClass = result.getFile("BaseDefinition.ts").getClass("BaseDefinition");
    baseDefClass.properties = baseDefClass.properties.filter(p => p.name !== "___uniqueID");

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        imports: [{
            defaultImport: "CodeBlockWriter",
            moduleSpecifier: "code-block-writer"
        }]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}
