import * as tmp from "tmp";
import * as fs from "fs";
import {TsMain} from "./compiler/TsMain";
import {ArgumentTypeError} from "./errors";
import {FileDefinition, GlobalDefinition} from "./definitions";
import {TsFactory} from "./factories";
import {Options} from "./Options";
import {StringUtils, Logger} from "./utils";

export * from "./Options";
export * from "./definitions";
export * from "./errors";
export * from "./structures";
export * from "./createFunctions";

export function getInfoFromFiles(fileNames: string[], options?: Options): GlobalDefinition {
    if (!(fileNames instanceof Array)) {
        throw new ArgumentTypeError("fileNames", "array");
    }

    options = options || {};

    Logger.toggleEnabled(options.showDebugMessages || false);

    const tsMain = new TsMain(fileNames, options);
    const tsFactory = new TsFactory();

    const definitionWithSourceFiles = tsMain.getSourceFiles().map(sourceFile => {
        return {
            definition: tsFactory.getFileDefinition(sourceFile),
            sourceFile: sourceFile
        };
    });

    tsFactory.bindDeferred();
    tsFactory.fillAllCachedTypesWithDefinitions();

    const globalDef = new GlobalDefinition();
    globalDef.files = definitionWithSourceFiles.map(f => f.definition);
    return globalDef;
}

export function getInfoFromString(code: string, options?: Options): FileDefinition {
    if (typeof code !== "string") {
        throw new ArgumentTypeError("code", "string");
    }

    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try {
        code = StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getInfoFromFiles([tmpFile.name], options).files[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}
