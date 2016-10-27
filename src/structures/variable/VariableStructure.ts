import {BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure, DocumentationedStructure} from "./../base";
import {VariableDeclarationType} from "./../../definitions";

export interface VariableStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, DefaultExpressionedStructure, AmbientableStructure, DocumentationedStructure {
    declarationType?: VariableDeclarationType;
}
