import {MainFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {AmbientableDefinition, NamedDefinition, TypedDefinition, ExportableDefinition,
    DefaultExpressionedDefinition, BaseDefinition, DefinitionType, OrderableDefinition} from "./../base";
import {ExpressionDefinition, TypeNodeDefinition} from "./../expression";
import {VariableDeclarationType} from "./VariableDeclarationType";

export class VariableDefinition extends BaseDefinition
        implements NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition, OrderableDefinition {
    declarationType: VariableDeclarationType;

    constructor() {
        super(DefinitionType.Variable);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const variableWriter = new VariableWriter(writer);
        variableWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // DefaultExpressionedDefinition
    defaultExpression: ExpressionDefinition | null;
    setDefaultExpression: (text: string) => this;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // OrderableDefinition
    order: number;
    // TypedDefinition
    type: TypeNodeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
}

applyMixins(VariableDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition,
    OrderableDefinition]);
