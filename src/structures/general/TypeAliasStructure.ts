import {BaseStructure, NamedStructure, ExportableStructure, TypeExpressionedStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";

export interface TypeAliasStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypeExpressionedStructure, TypeParameteredStructure, AmbientableStructure {
    type: string; // make it required (from TypeExpressionedStructure)
}
