import * as path from "path";
import * as fs from "fs";
import {getFileInfo} from "./../main";
import {FileDefinition} from "./../definitions";

export function generateDefinitionFile() {
    // todo: better way of doing this
    const fileInfo = getFileInfo([path.join(__dirname, "../../src/main.ts"), path.join(__dirname, "../../src/typings/tsd.d.ts")], { showDebugMessages: true })
                        .filter(f => /main\.ts/.exec(f.fileName) ? true : false)[0] as any as FileDefinition;

    fileInfo.reExports.map(r => r.definition).forEach(def => {
        // todo: once typescript supports it type-wise, this should be merged into one if statement
        if (def.isClassDefinition()) {
            def.methods.removeWhere(m => m.name === "addDefinitions" ||
                                         m.name.indexOf("fill") >= 0 ||
                                         m.name === "addType");
            def.properties.removeWhere(p => p.name.indexOf("fill") >= 0 || p.name === "addType");
        }
        else if (def.isInterfaceDefinition()) {
            def.methods.removeWhere(m => m.name === "addDefinitions" ||
                                         m.name.indexOf("fill") >= 0 ||
                                         m.name === "addType");
            def.properties.removeWhere(p => p.name.indexOf("fill") >= 0 || p.name === "addType");
        }
    });

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        definitionName: "ts-type-info",
        moduleName: "TsTypeInfo",
        referencePaths: ["node_modules/code-block-writer/code-block-writer.d.ts"]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}
