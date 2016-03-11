import * as tmp from "tmp";
import * as fs from "fs";
import {FileDefinition} from "./definitions";
import {StringUtils, Logger, ArrayExt} from "./utils";
import {MainFactory} from "./factories";
import {TsMain} from "./wrappers/ts/TsMain";
import {Options} from "./Options";

export * from "./Options";
export * from "./utils/ArrayExt";
export * from "./definitions";
export * from "./expressions";
export * from "./structures";

export function getFileInfo(fileNames: string[], options?: Options): ArrayExt<FileDefinition> {
    verifyArray(fileNames);
    options = options || {};

    Logger.toggleEnabled(options.showDebugMessages || false);

    const tsMain = new TsMain(fileNames, options);
    const mainFactory = new MainFactory();

    const definitionWithSourceFiles = tsMain.getSourceFiles().map(sourceFile => {
        return {
            definition: mainFactory.getFileDefinition(sourceFile),
            sourceFile: sourceFile
        };
    });

    definitionWithSourceFiles.forEach(definitionWithSourceFile => {
        definitionWithSourceFile.definition.reExports.forEach(reExportDefinition => {
            reExportDefinition.fillExports(mainFactory);
        });
        definitionWithSourceFile.definition.imports.forEach(importDefinition => {
            importDefinition.fillImports(mainFactory);
        });
    });

    mainFactory.fillAllCachedTypesWithDefinitions();

    return new ArrayExt(...definitionWithSourceFiles.map(f => f.definition));
}

export function getStringInfo(code: string, options?: Options): FileDefinition {
    verifyString(code);

    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try {
        code = StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name], options)[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}

function verifyArray(fileNames: string[]) {
    if (!(fileNames instanceof Array)) {
        throw new Error("Please provide an array of file names to getFileInfo.");
    }
}

function verifyString(code: string) {
    if (typeof code !== "string") {
        throw new Error("Please provide a string to getStringInfo");
    }
}

