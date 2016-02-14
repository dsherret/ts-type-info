import * as path from "path";
import * as fs from "fs";
import {getFileInfo} from "./../main";
import {FileDefinition} from "./../definitions";

export function generateDefinitionFile() {
    // todo: better way of doing this
    const fileInfo = getFileInfo([path.join(__dirname, "../../src/main.ts"), path.join(__dirname, "../../src/typings/tsd.d.ts")], { showDebugMessages: true })
                        .filter(f => /main\.ts/.exec(f.fileName) ? true : false)[0] as any as FileDefinition;

    fileInfo.reExports.map(r => r.definition).filter(c => c.name === "Type").forEach(c => {
        if (c.isClassDefinition()) {
            c.methods = c.methods.filter(m => m.name !== "addDefinitions");
        }
    });

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        definitionName: "ts-type-info",
        moduleName: "TsTypeInfo",
        referencePaths: ["node_modules/code-block-writer/code-block-writer.d.ts"]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}
