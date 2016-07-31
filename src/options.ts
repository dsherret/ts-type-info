export interface Options {
    compilerOptions?: CompilerOptions;
    showDebugMessages?: boolean;
}

export interface CompilerOptions {
    [option: string]: string | number | boolean | undefined;
    allowJs?: boolean;
    charset?: string;
    locale?: string;
    project?: string;
    rootDir?: string;
}
