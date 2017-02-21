import * as typeConstants from "./typeConstants";

export interface Options {
    compilerOptions?: CompilerOptions;
    compilerHost?: typeConstants.TypeScriptCompilerHost;
    tsConfigFilePath?: string;
    showDebugMessages?: boolean;
    includeTsNodes?: boolean;
    getTypesFromTypeNodes?: boolean; // todo: mark internal?
}

export interface CompilerOptions extends typeConstants.TypeScriptCompilerOptions {
}
