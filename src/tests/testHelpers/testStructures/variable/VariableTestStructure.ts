import {BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, DefaultExpressionedTestStructure, AmbientableTestStructure,
    OrderableTestStructure, JsDocedTestStructure} from "./../base";
import {VariableDeclarationType} from "./../../../../definitions";

export interface VariableTestStructure
        extends BaseTestStructure, NamedTestStructure, ExportableTestStructure, TypedTestStructure, DefaultExpressionedTestStructure, AmbientableTestStructure,
            OrderableTestStructure, JsDocedTestStructure {
    declarationType?: VariableDeclarationType;
}
