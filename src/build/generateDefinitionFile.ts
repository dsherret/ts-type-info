import * as path from "path";
import * as fs from "fs";
import {getInfoFromFiles} from "./../main";

export function generateDefinitionFile() {
    const fileInfo = getInfoFromFiles([
        path.join(__dirname, "../../src/main.ts"),
        path.join(__dirname, "../../src/typings/index.d.ts")
    ], { showDebugMessages: true }).getFile("main.ts");

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

        // hack to support the return type expression being "this" in the definition file
        // todo: remove in TS 2.0+
        if (def.name === "BaseParameterDefinition" && def.isClassDefinition()) {
            def.getMethod("addDestructuringProperties").returnTypeExpression.text = "this";
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
