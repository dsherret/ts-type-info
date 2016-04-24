import {BaseTestStructure} from "./../base";
import {ImportPartTestStructure} from "./ImportPartTestStructure";

export interface ImportTestStructure extends BaseTestStructure {
    moduleSpecifier: string;
    fileName?: string;
    defaultImport?: ImportPartTestStructure;
    namedImports?: ImportPartTestStructure[];
    starImportName?: string;
    starImports?: ImportPartTestStructure[];
}
