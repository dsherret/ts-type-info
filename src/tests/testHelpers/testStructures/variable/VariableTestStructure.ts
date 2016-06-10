import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, DefaultExpressionedTestStructure,
    AmbientableTestStructure} from "./../base";
import {VariableDeclarationType} from "./../../../../definitions";

export interface VariableTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, DefaultExpressionedTestStructure, AmbientableTestStructure {
    declarationType?: VariableDeclarationType;
}
