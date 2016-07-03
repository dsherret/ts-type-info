import * as path from "path";
import * as fs from "fs";
import {getInfoFromFiles, GlobalDefinition} from "./../main";

export function generateDefinitionFile() {
    const result = getInfoFromFiles([
        path.join(__dirname, "../../src/main.ts"),
        path.join(__dirname, "../../src/typings/index.d.ts")
    ], { showDebugMessages: false });
    const fileInfo = result.getFile("main.ts");

    removeInternalProperties(result);
    fixSetType(result);

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        imports: [{
            defaultImport: "CodeBlockWriter",
            moduleSpecifier: "code-block-writer"
        }]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}

function removeInternalProperties(result: GlobalDefinition) {
    const baseDefClass = result.getFile("BaseDefinition.ts").getClass("BaseDefinition");
    baseDefClass.properties = baseDefClass.properties.filter(p => p.name !== "___uniqueID");
}

function fixSetType(result: GlobalDefinition) {
    result.files.forEach(f => {
        f.classes.forEach(c => {
            if (c.properties.some(p => p.name === "setType")) {
                c.properties = c.properties.filter(p => p.name !== "setType");
                c.addMethod({
                    name: "setType",
                    returnType: "any",
                    overloadSignatures: [{
                        parameters: [
                            { name: "definition", type: "NamedDefinition" },
                            { name: "typeArguments", type: "string[]", isOptional: true }
                        ],
                        returnType: "any"
                    }, {
                        parameters: [{ name: "text", type: "string" }],
                        returnType: "any"
                    }]
                });
            }
        });
    });
}
