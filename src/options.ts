export interface Options {
    compilerOptions?: CompilerOptions;
}

export interface CompilerOptions {
    allowNonTsExtensions?: boolean;
    charset?: string;
    locale?: string;
    project?: string;
    rootDir?: string;
    [option: string]: string | number | boolean;
}
