/*import * as TsTypeInfoWriter from "ts-type-info-writer";
import {getFileInfo} from "./../main";
import * as path from "path";
import * as fs from "fs";

export function generateDefinitionFile() {
    const fileInfo = getFileInfo([path.join(__dirname, "../../src/main")])[0] as any as TsTypeInfo.FileDefinition;
    const definitionFileText = TsTypeInfoWriter.getDefinitionFileFromFileDefinitionExports({
        definitionName: "ts-type-info",
        moduleName: "TsTypeInfo",
        fileDefinition: fileInfo,
        referencePaths: []
    });

    fs.writeFile(path.join(__dirname, "../ts-type-info.d.ts"), definitionFileText);
}
*/
