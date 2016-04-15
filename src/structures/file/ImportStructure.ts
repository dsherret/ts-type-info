import {NamedImportStructure} from "./NamedImportStructure";

export interface ImportStructure {
    moduleSpecifier: string;
    starImportName?: string;
    defaultImportName?: string;
    namedImports?: NamedImportStructure[];
}
