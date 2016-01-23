import {NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure} from "./../base";
import {VariableDeclarationType} from "./../../../../../definitions";

export interface VariableStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure {
    declarationType: VariableDeclarationType;
}
