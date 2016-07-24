import {BaseTestStructure} from "./../base";
import {ImportPartTestStructure} from "./ImportPartTestStructure";
import {StarImportPartTestStructure} from "./StarImportPartTestStructure";
import {NamedImportPartTestStructure} from "./NamedImportPartTestStructure";

export interface ImportTestStructure extends BaseTestStructure {
    moduleSpecifier: string;
    fileName?: string;
    defaultImport?: ImportPartTestStructure;
    namedImports?: NamedImportPartTestStructure[];
    starImportName?: string;
    starImports?: StarImportPartTestStructure[];
}
