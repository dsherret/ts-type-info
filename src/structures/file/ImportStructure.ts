import {BaseStructure} from "./../base";
import {NamedImportStructure} from "./NamedImportStructure";

export interface ImportStructure extends BaseStructure {
    moduleSpecifier: string;
    starImportName?: string;
    defaultImportName?: string;
    namedImports?: NamedImportStructure[];
}
