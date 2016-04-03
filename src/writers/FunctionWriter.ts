import {FunctionWriteableDefinitions, FunctionDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {ParametersWriter} from "./ParametersWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class FunctionWriter extends BaseDefinitionWriter<FunctionDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private parametersWriter = new ParametersWriter(this.writer);
    private functionBodyWriter = new FunctionBodyWriter(this.writer);

    protected writeDefault(def: FunctionWriteableDefinitions, flags: WriteFlags) {
        this.writeExportClause(def as FunctionDefinition, flags);
        this.writeDeclareClause(def as FunctionDefinition);
        this.writer.write("function ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.parametersWriter.write(def.parameters, flags);
        this.writeReturnType(def, flags);
        this.functionBodyWriter.write(def, flags);
        this.writer.newLineIfLastCharNotNewLine();
    }

    private writeReturnType(def: FunctionWriteableDefinitions, flags: WriteFlags) {
        if (!FunctionBodyWriter.willWriteFunctionBody(def, flags)) {
            this.typeExpressionWriter.writeWithColon(def.returnTypeExpression);
        }
    }
}
