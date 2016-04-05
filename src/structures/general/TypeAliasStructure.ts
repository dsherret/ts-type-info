import {NamedStructure, ExportableStructure, TypeExpressionedStructure, TypeParameteredStructure, AmbientableStructure} from "./../base";

export interface TypeAliasStructure extends NamedStructure, ExportableStructure, TypeExpressionedStructure, TypeParameteredStructure, AmbientableStructure {
    type: string; // type should be required
}
