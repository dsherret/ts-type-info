import * as typeConstants from "./../../typeConstants";
import {MainFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {AmbientableDefinition, NamedDefinition, TypedDefinition, ExportableDefinition, DefaultExpressionedDefinition, BaseDefinition, OrderableDefinition,
    NodedDefinition, DocumentationedDefinition} from "./../base";
import {ExpressionDefinition, TypeDefinition} from "./../expression";
import {VariableDeclarationType} from "./VariableDeclarationType";

export class VariableDefinition extends BaseDefinition
        implements NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition,
            DocumentationedDefinition {
    declarationType: VariableDeclarationType;

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const variableWriter = MainFactory.createWriteFactory(writer).getVariableWriter();
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
    type: TypeDefinition;
    setType: (textOrDefinition: string | NamedDefinition, typeArguments?: string[]) => this;
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // DocumentationedDefinition
    documentationComment: string;
}

applyMixins(VariableDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypedDefinition, DefaultExpressionedDefinition, AmbientableDefinition,
    OrderableDefinition, NodedDefinition, DocumentationedDefinition]);
