import * as path from "path";
import * as fs from "fs";
import {getInfoFromFiles} from "./../main";

export function generateDefinitionFile() {
    // todo: better way of doing this
    const fileInfo = getInfoFromFiles([path.join(__dirname, "../../src/main.ts"), path.join(__dirname, "../../src/typings/main.d.ts")], { showDebugMessages: true })
                        .filter(f => f.fileName.indexOf("/main.ts") >= 0)[0];

    fileInfo.getExports().forEach(def => {
        // todo: once typescript supports it type-wise, this should be merged into one if statement
        if (def.isClassDefinition()) {
            def.methods = def.methods.filter(m => m.name !== "addDefinitions" &&
                                         m.name.indexOf("fill") === -1 &&
                                         m.name !== "addType");
            def.properties = def.properties.filter(p => p.name.indexOf("fill") === -1 && p.name !== "addType");
        }
        else if (def.isInterfaceDefinition()) {
            def.methods = def.methods.filter(m => m.name !== "addDefinitions" &&
                                         m.name.indexOf("fill") === -1 &&
                                         m.name !== "addType");
            def.properties = def.properties.filter(p => p.name.indexOf("fill") === -1 && p.name !== "addType");
        }
    });

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        imports: [{
            defaultImport: "CodeBlockWriter",
            moduleSpecifier: "code-block-writer"
        }]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}
