import * as tmp from "tmp";
import * as fs from "fs";
import {TsMain} from "./compiler/TsMain";
import {ArgumentTypeError} from "./errors";
import {FileDefinition, GlobalDefinition} from "./definitions";
import {TsFactory} from "./factories";
import {Options} from "./options";
import {StringUtils, Logger} from "./utils";

export * from "./options";
export * from "./WriteOptions";
export * from "./definitions";
export * from "./errors";
export * from "./structures";
export * from "./createFunctions";

export function getInfoFromFiles(fileNames: string[], options?: Options): GlobalDefinition {
    if (!(fileNames instanceof Array)) {
        throw new ArgumentTypeError("fileNames", "array");
    }

    options = options || {};
    const {includeCompilerNodes = false, showDebugMessages = false} = options;

    Logger.toggleEnabled(showDebugMessages);

    const tsMain = new TsMain(fileNames, options);
    const tsFactory = new TsFactory({ includeCompilerNodes });

    const fileDefinitions = tsMain.getSourceFiles().map(sourceFile => tsFactory.getFileDefinition(sourceFile));

    tsFactory.bindDeferred();
    tsFactory.fillAllCachedTypesWithDefinitions();

    const globalDef = new GlobalDefinition();
    globalDef.files = fileDefinitions;
    if (includeCompilerNodes)
        globalDef.typeChecker = tsMain.getTypeScriptTypeChecker();
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
