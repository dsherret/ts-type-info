import CodeBlockWriter from "code-block-writer";
import {TypeParameterStructure} from "./../../structures";
import {WriteFlags} from "./../../WriteFlags";
import {TypeAliasWriter} from "./../../writers";
import {applyMixins} from "./../../utils";
import {BaseDefinition, DefinitionType} from "./../base";
import {TypeExpressionDefinition} from "./../expressions";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {NamedDefinition} from "./../base/NamedDefinition";
import {TypeParameteredDefinition} from "./../base/TypeParameteredDefinition";
import {TypeExpressionedDefinition} from "./../base/TypeExpressionedDefinition";
import {ExportableDefinition} from "./../base/ExportableDefinition";
import {AmbientableDefinition} from "./../base/AmbientableDefinition";
import {TypeParameterDefinition} from "./TypeParameterDefinition";

export class TypeAliasDefinition extends BaseDefinition
                                 implements NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition {
    constructor() {
        super(DefinitionType.TypeAlias);
    }

    write() {
        const writer = new CodeBlockWriter();
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
    // TypeExpressionedDefinition
    typeExpression: TypeExpressionDefinition;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(TypeAliasDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
