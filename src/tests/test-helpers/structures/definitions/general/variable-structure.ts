import {NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure} from "./../base";

export interface VariableStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, DefaultExpressionedStructure {

    declarationType: string
}
