import {TsNode} from "./../../compiler"

export abstract class ExportableDefinition {
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
}
