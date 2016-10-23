import {BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure, JsDocedStructure} from "./../base";

export interface TypeAliasStructure
        extends BaseStructure, NamedStructure, ExportableStructure, TypedStructure, TypeParameteredStructure, AmbientableStructure, JsDocedStructure {
    type: string; // make it required (from TypedStructure)
}
