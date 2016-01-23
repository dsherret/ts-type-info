import {NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure} from "./../base";
import {VariableDeclarationType} from "./../../../../../definitions";

export interface VariableStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure, AmbientableStructure {
    declarationType: VariableDeclarationType;
}
