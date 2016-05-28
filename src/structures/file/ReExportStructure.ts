import {BaseStructure} from "./../base";
import {NamedImportStructureTypes} from "./NamedImportStructure";

export interface ReExportStructure extends BaseStructure {
    moduleSpecifier: string;
    namedExports?: NamedImportStructureTypes[];
}
