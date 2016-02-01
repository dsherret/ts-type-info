import {FunctionWriteableDefinitions, FunctionDefinition} from "./../definitions";
import {TypeParameterWriter} from "./type-parameter-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ParameterWriter} from "./parameter-writer";
import {BaseWriter} from "./base-writer";
import {WriteFlags} from "./../write-flags";

export class FunctionWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private parameterWriter = new ParameterWriter(this.writer);

    write(def: FunctionWriteableDefinitions, flags: WriteFlags) {
        this.writeExportClause(def as FunctionDefinition);
        this.writeDeclareClause(def as FunctionDefinition);
        this.writer.write("function ").write(def.name);
        this.typeParameterWriter.write(def.typeParameters);
        this.parameterWriter.write(def.parameters, flags);
        this.writer.write(": ");
        this.typeExpressionWriter.write(def.returnTypeExpression);
        this.writeFunctionBody(def, flags);
        this.writer.newLine();
    }

    private writeFunctionBody(def: FunctionWriteableDefinitions, flags: WriteFlags) {
        if ((flags & WriteFlags.HideFunctionBodies) || (def as FunctionDefinition).isAmbient) {
            this.writer.write(";");
        }
        else {
            this.writer.block(() => { /* empty block */ });
        }
    }
}
