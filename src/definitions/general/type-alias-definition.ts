import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt} from "./../../utils";
import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {ModuledDefinitions} from "./../../definitions";
import {WriteFlags} from "./../../write-flags";
import {NamedStructure, TypeExpressionedStructure, TypeParameteredStructure, ExportableStructure, AmbientableStructure} from "./../../structures";
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
        this.fillTypeParametersBySymbol(symbolNode);
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
    fillName: (symbolNode: WrappedSymbolNode | NamedStructure) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNodeOrStructure: WrappedSymbolNode | ExportableStructure) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (symbolNodeOrStructure: WrappedSymbolNode | TypeExpressionedStructure) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (symbolNodeOrStructure: WrappedSymbolNode | TypeParameteredStructure) => void;
    fillTypeParametersBySignature: (signatureOrStructure: WrappedSignature | TypeParameteredStructure) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNodeOrStructure: WrappedSymbolNode | AmbientableStructure) => void;
}

applyMixins(TypeAliasDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
