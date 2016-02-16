import {NamedStructure, ExportableStructure, ModuledStructure} from "./../base";
import {ImportStructure} from "./import-structure";
import {ReExportStructure} from "./re-export-structure";

export interface FileStructure extends ModuledStructure {
    imports?: ImportStructure[];
    reExports?: ReExportStructure[];
    fileName?: string;
    defaultExport?: string | (NamedStructure & ExportableStructure);
}
