import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {ModuledDefinitions} from "./../../definitions";
import {WriteFlags} from "./../../WriteFlags";
import {TypeAliasWriter} from "./../../writers";
import {BaseDefinition, DefinitionType} from "./../base";
import {TypeExpressionDefinition} from "./../expressions";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {NamedDefinition} from "./../base/NamedDefinition";
import {ParentedDefinition} from "./../base/ParentedDefinition";
import {TypeParameteredDefinition} from "./../base/TypeParameteredDefinition";
import {TypeExpressionedDefinition} from "./../base/TypeExpressionedDefinition";
import {ExportableDefinition} from "./../base/ExportableDefinition";
import {AmbientableDefinition} from "./../base/AmbientableDefinition";
import {TypeParameterDefinition} from "./TypeParameterDefinition";

export class TypeAliasDefinition extends BaseDefinition
                                 implements NamedDefinition, ParentedDefinition<ModuledDefinitions>, ExportableDefinition, TypeExpressionedDefinition,
                                            TypeParameteredDefinition, AmbientableDefinition {
    constructor() {
        super(DefinitionType.TypeAlias);
    }

    write() {
        const writer = new CodeBlockWriter();
        const typeAliasWriter = new TypeAliasWriter(writer, WriteFlags.Default);
        typeAliasWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition<this>[];
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(TypeAliasDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
