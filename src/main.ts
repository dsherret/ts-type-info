import * as tmp from "tmp";
import * as fs from "fs";
import {FileDefinition} from "./definitions";
import {ArgumentTypeError} from "./errors";
import {FileStructure} from "./structures";
import {StringUtils, Logger} from "./utils";
import {StructureFactory, TsFactory} from "./factories";
import {TsMain} from "./compiler/TsMain";
import {Options} from "./Options";

export * from "./Options";
export * from "./definitions";
export * from "./errors";
export * from "./structures";

export function createFile(structure?: FileStructure) {
    const factory = new StructureFactory();
    return factory.getFile(structure);
}

export function getInfoFromFiles(fileNames: string[], options?: Options): FileDefinition[] {
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

    return definitionWithSourceFiles.map(f => f.definition);
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
        fileDefinition = getInfoFromFiles([tmpFile.name], options)[0];
    }
    finally {
        tmpFile.removeCallback();
    }

    return fileDefinition;
}
