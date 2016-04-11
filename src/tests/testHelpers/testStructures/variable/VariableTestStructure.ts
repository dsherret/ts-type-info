import {NamedTestStructure, ExportableTestStructure, TypeExpressionedTestStructure, DefaultExpressionedTestStructure, AmbientableTestStructure} from "./../base";
import {VariableDeclarationType} from "./../../../../definitions";

export interface VariableTestStructure extends NamedTestStructure, ExportableTestStructure, TypeExpressionedTestStructure, DefaultExpressionedTestStructure, AmbientableTestStructure {
    declarationType?: VariableDeclarationType;
}
