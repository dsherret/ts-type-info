import {FunctionWriteableDefinitions, FunctionDefinition} from "./../definitions";
import {TypeParametersWriter} from "./type-parameters-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ParametersWriter} from "./parameters-writer";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {FunctionBodyWriter} from "./function-body-writer";

export class FunctionWriter extends BaseDefinitionWriter<FunctionDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer, this.flags);
    private parametersWriter = new ParametersWriter(this.writer, this.flags);
    private functionBodyWriter = new FunctionBodyWriter(this.writer, this.flags);

    protected writeDefault(def: FunctionWriteableDefinitions) {
        this.writeExportClause(def as FunctionDefinition);
        this.writeDeclareClause(def as FunctionDefinition);
        this.writer.write("function ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);
        this.parametersWriter.write(def.parameters);
        this.writer.write(": ");
        this.typeExpressionWriter.write(def.returnTypeExpression);
        this.functionBodyWriter.writeFunctionBody(def);
        this.writer.newLine();
    }
}
