import {NamedStructure, ExportableStructure, ModuledStructure} from "./../base";
import {ImportStructure} from "./ImportStructure";
import {ReExportStructure} from "./ReExportStructure";

export interface FileStructure extends ModuledStructure {
    imports?: ImportStructure[];
    reExports?: ReExportStructure[];
    fileName?: string;
    defaultExport?: string | (NamedStructure & ExportableStructure);
}
