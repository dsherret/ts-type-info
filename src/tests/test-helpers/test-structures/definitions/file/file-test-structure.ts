import {NamedTestStructure, ExportableTestStructure, ModuledTestStructure} from "./../base";
import {ImportTestStructure} from "./import-test-structure";
import {ReExportTestStructure} from "./re-export-test-structure";
import {ExpressionTestStructure} from "./../../expressions";

export interface FileTestStructure extends ModuledTestStructure {
    imports?: ImportTestStructure[];
    reExports?: ReExportTestStructure[];
    fileName?: string;
    defaultExport?: ExpressionTestStructure | (NamedTestStructure & ExportableTestStructure);
}
