import CodeBlockWriter from "code-block-writer";
import {applyMixins} from "./../../utils";
import {ModuledDefinitions} from "./../../definitions";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {ParentedDefinition, AmbientableDefinition, NamedDefinition, TypeExpressionedDefinition, ExportableDefinition,
    DefaultExpressionedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition, TypeExpression} from "./../expressions";
import {VariableDeclarationType} from "./VariableDeclarationType";

export class VariableDefinition extends BaseDefinition
                                implements NamedDefinition, ParentedDefinition<ModuledDefinitions>, ExportableDefinition, TypeExpressionedDefinition,
                                           DefaultExpressionedDefinition, AmbientableDefinition {
    declarationType: VariableDeclarationType;

    constructor() {
        super(DefinitionType.Variable);
    }

    write() {
        const writer = new CodeBlockWriter();
        const variableWriter = new VariableWriter(writer, WriteFlags.Default);
        variableWriter.write(this);
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
    typeExpression: TypeExpression;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(VariableDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition, AmbientableDefinition]);
