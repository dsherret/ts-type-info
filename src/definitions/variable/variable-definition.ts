import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {NamedStructure, TypeExpressionedStructure, AmbientableStructure, DefaultExpressionedStructure, VariableStructure, ExportableStructure} from "./../../structures";
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

    constructor(symbolNodeOrStructure: WrappedSymbolNode | VariableStructure) {
        super(DefinitionType.Variable);
        this.fillName(symbolNodeOrStructure);
        this.fillExportable(symbolNodeOrStructure);
        this.fillTypeExpression(symbolNodeOrStructure);
        this.fillDefaultExpression(symbolNodeOrStructure);
        this.fillAmbientable(symbolNodeOrStructure);

        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.declarationType = symbolNodeOrStructure.getVariableDeclarationType();
        }
        else {
            this.declarationType = symbolNodeOrStructure.declarationType;
        }
    }

    write() {
        const writer = new CodeBlockWriter();
        const variableWriter = new VariableWriter(writer, WriteFlags.Default);
        variableWriter.write(this);
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
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNodeOrStructure: WrappedSymbolNode | DefaultExpressionedStructure) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNodeOrStructure: WrappedSymbolNode | AmbientableStructure) => void;
}

applyMixins(VariableDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);
