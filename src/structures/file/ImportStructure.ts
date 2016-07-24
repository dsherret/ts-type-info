import {BaseStructure} from "./../base";
import {NamedImportPartStructure} from "./NamedImportPartStructure";

export interface ImportStructure extends BaseStructure {
    moduleSpecifier: string;
    starImportName?: string;
    defaultImportName?: string;
    namedImports?: NamedImportPartStructure[];
}
