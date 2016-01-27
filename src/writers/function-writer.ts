import {BaseParameterDefinition, BaseFunctionDefinition, ExportableDefinition,
    AmbientableDefinition, ParameterDefinition} from "./../definitions";
import {TypeParameterWriter} from "./type-parameter-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ParameterWriter} from "./parameter-writer";
import {BaseWriter} from "./base-writer";
import {WriteFlags} from "./../write-flags";

export class FunctionWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private parameterWriter = new ParameterWriter(this.writer);

    write<T extends BaseParameterDefinition>(def: BaseFunctionDefinition<T>, flags: WriteFlags) {
        this.writeExportClause(def as any as ExportableDefinition);
        this.writeDeclareClause(def as any as AmbientableDefinition);
        this.writer.write("function ").write(def.name);
        this.typeParameterWriter.write(def.typeParameters);
        this.parameterWriter.write(def.parameters as any as ParameterDefinition[], flags);
        this.writer.write(": ");
        this.typeExpressionWriter.write(def.returnTypeExpression);
        this.writeFunctionBody(def, flags);
        this.writer.newLine();
    }

    private writeFunctionBody<T extends BaseParameterDefinition>(def: BaseFunctionDefinition<T>, flags: WriteFlags) {
        if ((flags & WriteFlags.HideFunctionBodies) || (def as any as AmbientableDefinition).isAmbient) {
            this.writer.write(";");
        }
        else {
            this.writer.block(() => { /* empty block */ });
        }
    }
}
