import * as typeConstants from "./typeConstants";

export interface Options {
    compilerOptions?: CompilerOptions;
    showDebugMessages?: boolean;
    includeTsNodes?: boolean;
}

export interface CompilerOptions extends typeConstants.TypeScriptCompilerOptions {
}
