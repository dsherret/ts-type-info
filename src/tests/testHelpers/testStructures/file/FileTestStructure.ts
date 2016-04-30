import {BaseTestStructure, ModuledTestStructure} from "./../base";
import {ImportTestStructure} from "./ImportTestStructure";
import {ReExportTestStructure} from "./ReExportTestStructure";
import {ExpressionTestStructure} from "./../expression";

export interface FileTestStructure extends BaseTestStructure, ModuledTestStructure {
    imports?: ImportTestStructure[];
    reExports?: ReExportTestStructure[];
    fileName?: string;
    defaultExportExpression?: ExpressionTestStructure;
}
