import {BaseStructure, NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure} from "./../base";
import {VariableDeclarationType} from "./../../definitions";

export interface VariableStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType?: VariableDeclarationType;
}
