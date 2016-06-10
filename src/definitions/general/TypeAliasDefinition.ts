import {MainFactory} from "./../../factories";
import {TypeParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {TypeAliasWriter} from "./../../writers";
import {BaseDefinition, DefinitionType} from "./../base";
import {TypeDefinition} from "./../expression";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {NamedDefinition} from "./../base/NamedDefinition";
import {TypeParameteredDefinition} from "./../base/TypeParameteredDefinition";
import {TypedDefinition} from "./../base/TypedDefinition";
import {ExportableDefinition} from "./../base/ExportableDefinition";
import {AmbientableDefinition} from "./../base/AmbientableDefinition";
import {TypeParameterDefinition} from "./TypeParameterDefinition";

export class TypeAliasDefinition extends BaseDefinition
                                 implements NamedDefinition, ExportableDefinition, TypedDefinition, TypeParameteredDefinition, AmbientableDefinition {
    constructor() {
        super(DefinitionType.TypeAlias);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const typeAliasWriter = new TypeAliasWriter(writer);
        typeAliasWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypedDefinition
    type: TypeDefinition;
    setType: (text: string) => any;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(TypeAliasDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
