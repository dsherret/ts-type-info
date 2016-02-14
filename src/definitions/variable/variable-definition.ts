import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
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

    constructor(symbolNode: WrappedSymbolNode) {
        super(DefinitionType.Variable);
        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillTypeExpression(symbolNode);
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
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNode: WrappedSymbolNode) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);
