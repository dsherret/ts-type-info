export interface Options {
    compilerOptions?: CompilerOptions;
    showDebugMessages?: boolean;
}

// options copied from typescript.d.ts
interface Map<T> {
    [index: string]: T;
}

type RootPaths = string[];
type TsConfigOnlyOptions = RootPaths;
type CompilerOptionsValue = string | number | boolean | (string | number)[] | TsConfigOnlyOptions;

export interface CompilerOptions {
    [option: string]: CompilerOptionsValue | undefined;
    allowJs?: boolean;
    charset?: string;
    locale?: string;
    project?: string;
    rootDir?: string;
    strictNullChecks?: boolean;
}
