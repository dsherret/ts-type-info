import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {ModuledDefinitions} from "./../../definitions";
import {Expression, TypeExpression} from "./../../expressions";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {INamedDefinition, IParentedDefinition, IExportableDefinition, ITypeExpressionedDefinition, IDefaultExpressionedDefinition, IAmbientableDefinition, AmbientableDefinition,
        NamedDefinition, TypeExpressionedDefinition, ExportableDefinition, DefaultExpressionedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {VariableDeclarationType} from "./variable-declaration-type";

export class VariableDefinition extends BaseDefinition
                                implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IExportableDefinition, ITypeExpressionedDefinition,
                                           IDefaultExpressionedDefinition, IAmbientableDefinition {
    declarationType: VariableDeclarationType;

    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode) {
        super(DefinitionType.Variable);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillTypeExpression(mainFactory, symbolNode);
        this.fillDefaultExpression(symbolNode);
        this.fillAmbientable(symbolNode);

        this.declarationType = symbolNode.getVariableDeclarationType();
    }

    write() {
        const writer = new CodeBlockWriter();
        const variableWriter = new VariableWriter(writer, WriteFlags.Default);
        variableWriter.write(this);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: ISymbolNode) => void;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNode: ISymbolNode) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: ISymbolNode) => void;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);
