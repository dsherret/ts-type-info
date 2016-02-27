import CodeBlockWriter from "code-block-writer";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISignature, INode} from "./../../wrappers";
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
    constructor(mainFactory: MainFactory, node: INode) {
        super(DefinitionType.TypeAlias);
        this.fillName(node);
        this.fillExportable(node);
        this.fillTypeExpression(mainFactory, node);
        this.fillTypeParametersBySymbol(mainFactory, node);
        this.fillAmbientable(node);
    }

    write() {
        const writer = new CodeBlockWriter();
        const typeAliasWriter = new TypeAliasWriter(writer, WriteFlags.Default);
        typeAliasWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (node: INode) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (mainFactory: MainFactory, node: INode) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (node: INode) => void;
}

applyMixins(TypeAliasDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, TypeParameteredDefinition, AmbientableDefinition]);
