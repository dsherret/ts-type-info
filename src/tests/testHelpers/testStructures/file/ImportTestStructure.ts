import {BaseTestStructure} from "./../base";
import {DefaultImportPartTestStructure} from "./DefaultImportPartTestStructure";
import {StarImportPartTestStructure} from "./StarImportPartTestStructure";
import {NamedImportPartTestStructure} from "./NamedImportPartTestStructure";

export interface ImportTestStructure extends BaseTestStructure {
    moduleSpecifier: string;
    fileName?: string;
    defaultImport?: DefaultImportPartTestStructure;
    namedImports?: NamedImportPartTestStructure[];
    starImportName?: string;
    starImports?: StarImportPartTestStructure[];
}
