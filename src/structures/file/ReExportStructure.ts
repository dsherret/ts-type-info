import {BaseStructure} from "./../base";
import {NamedImportStructure} from "./NamedImportStructure";

export interface ReExportStructure extends BaseStructure {
    moduleSpecifier: string;
    namedExports?: NamedImportStructure[];
}
