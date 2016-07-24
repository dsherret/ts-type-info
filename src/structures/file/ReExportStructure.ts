import {BaseStructure} from "./../base";
import {NamedImportPartStructure} from "./NamedImportPartStructure";

export interface ReExportStructure extends BaseStructure {
    moduleSpecifier: string;
    namedExports?: NamedImportPartStructure[];
}
