import {BaseStructure} from "./../base";
import {NamedImportStructureTypes} from "./NamedImportStructure";

export interface ImportStructure extends BaseStructure {
    moduleSpecifier: string;
    starImportName?: string;
    defaultImportName?: string;
    namedImports?: NamedImportStructureTypes[];
}
