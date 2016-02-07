import * as path from "path";
import * as fs from "fs";
import {getFileInfo} from "./../main";
import {FileDefinition} from "./../definitions";

export function generateDefinitionFile() {
    const fileInfo = getFileInfo([path.join(__dirname, "../../src/main.ts"), path.join(__dirname, "../../src/typings/tsd.d.ts")])
                        .filter(f => /main\.ts/.exec(f.fileName) ? true : false)[0] as any as FileDefinition;
    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        definitionName: "ts-type-info",
        moduleName: "TsTypeInfo",
        referencePaths: ["node_modules/code-block-writer/code-block-writer.d.ts"]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}
