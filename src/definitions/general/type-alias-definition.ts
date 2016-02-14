import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {ModuledDefinitions} from "./../../definitions";
import {WriteFlags} from "./../../write-flags";
import {INamedDefinition, IParentedDefinition, IExportableDefinition, ITypeExpressionedDefinition, ITypeParameteredDefinition, IAmbientableDefinition,
        BaseDefinition, DefinitionType} from "./../base";
// specify of specific file here to prevent errors (due to type-parameter being referenced in type-parametered-definition)
import {NamedDefinition} from "./../base/named-definition";
import {TypeParameteredDefinition} from "./../base/type-parametered-definition";
import {TypeExpressionedDefinition} from "./../base/type-expressioned-definition";
import {ExportableDefinition} from "./../base/exportable-definition";
import {AmbientableDefinition} from "./../base/ambientable-definition";
import {TypeParameterDefinition} from "./type-parameter-definition";
import {TypeExpression} from "./../../expressions";
import {TypeAliasWriter} from "./../../writers";

export class TypeAliasDefinition extends BaseDefinition
                                 implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeExpressionedDefinition,
                                            ITypeParameteredDefinition, IAmbientableDefinition {
    constructor(symbolNode: WrappedSymbolNode) {
        super(DefinitionType.TypeAlias);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillTypeExpression(symbolNode);
        this.fillTypeParametersBySymbolDeclaration(symbolNode);
        this.fillAmbientable(symbolNode);
    }

    write() {
        const writer = new CodeBlockWriter();
        const typeAliasWriter = new TypeAliasWriter(writer, WriteFlags.Default);
        typeAliasWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: WrappedSymbolNode) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (symbolNode: WrappedSymbolNode) => void;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition<this>[];
    fillTypeParametersBySymbolDeclaration: (symbolNode: WrappedSymbolNode) => void;
    fillTypeParametersBySignature: (signature: WrappedSignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(TypeAliasDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
