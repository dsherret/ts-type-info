import * as tmp from "tmp";
import * as fs from "fs";
import {FileDefinition} from "./definitions";
import {StringUtils, Logger} from "./utils";
import {TsFactory} from "./factories";
import {TsMain} from "./compiler/TsMain";
import {Options} from "./Options";

export * from "./Options";
export * from "./definitions";
export * from "./structures";

export function getInfoFromFiles(fileNames: string[], options?: Options): FileDefinition[] {
    verifyArray(fileNames);
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

    return definitionWithSourceFiles.map(f => f.definition);
}

export function getInfoFromString(code: string, options?: Options): FileDefinition {
    verifyString(code);

    const tmpFile = tmp.fileSync({ postfix: ".ts" });
    let fileDefinition: FileDefinition;

    try {
        code = StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getInfoFromFiles([tmpFile.name], options)[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}

function verifyArray(fileNames: string[]) {
    if (!(fileNames instanceof Array)) {
        throw new Error("Please provide an array of file names to getInfoFromFiles.");
    }
}

function verifyString(code: string) {
    if (typeof code !== "string") {
        throw new Error("Please provide a string to getInfoFromString");
    }
}

