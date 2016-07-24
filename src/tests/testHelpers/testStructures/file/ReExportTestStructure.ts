import {BaseTestStructure} from "./../base";
import {NamedImportPartTestStructure} from "./NamedImportPartTestStructure";
import {StarImportPartTestStructure} from "./StarImportPartTestStructure";

export interface ReExportTestStructure extends BaseTestStructure {
    moduleSpecifier: string;
    fileName?: string;
    starExports?: StarImportPartTestStructure[];
    namedExports?: NamedImportPartTestStructure[];
}
