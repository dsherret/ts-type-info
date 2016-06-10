import {BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure} from "./../base";
import {VariableDeclarationType} from "./../../definitions";

export interface VariableStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType?: VariableDeclarationType;
}
