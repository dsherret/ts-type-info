import {NamedImportStructure} from "./NamedImportStructure";

export interface ReExportStructure {
    moduleSpecifier: string;
    namedExports?: NamedImportStructure[];
}
