import {BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure, JsDocedStructure} from "./../base";
import {VariableDeclarationType} from "./../../definitions";

export interface VariableStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure, JsDocedStructure {
    declarationType?: VariableDeclarationType;
}
