import {BaseStructure, ModuledStructure} from "./../base";
import {ImportStructure} from "./ImportStructure";
import {ReExportStructure} from "./ReExportStructure";

export interface FileStructure extends BaseStructure, ModuledStructure {
    imports?: ImportStructure[];
    reExports?: ReExportStructure[];
    fileName?: string;
    defaultExportExpression?: string;
}
