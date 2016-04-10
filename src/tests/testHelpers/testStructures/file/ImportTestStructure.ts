import {ImportPartTestStructure} from "./ImportPartTestStructure";

export interface ImportTestStructure {
    moduleSpecifier: string;
    fileName?: string;
    defaultImport?: ImportPartTestStructure;
    namedImports?: ImportPartTestStructure[];
    starImportName?: string;
    starImports?: ImportPartTestStructure[];
}
