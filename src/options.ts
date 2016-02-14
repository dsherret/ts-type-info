export interface Options {
    compilerOptions?: CompilerOptions;
    showDebugMessages?: boolean;
}

export interface CompilerOptions {
    allowNonTsExtensions?: boolean;
    charset?: string;
    locale?: string;
    project?: string;
    rootDir?: string;
    [option: string]: string | number | boolean;
}
