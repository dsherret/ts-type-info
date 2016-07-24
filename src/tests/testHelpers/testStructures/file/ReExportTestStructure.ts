import {BaseTestStructure} from "./../base";
import {NamedImportPartTestStructure} from "./NamedImportPartTestStructure";
import {ReExportPartTestStructure} from "./ReExportPartTestStructure";

export interface ReExportTestStructure extends BaseTestStructure {
    moduleSpecifier: string;
    fileName?: string;
    starExports?: ReExportPartTestStructure[];
    namedExports?: NamedImportPartTestStructure[];
}
