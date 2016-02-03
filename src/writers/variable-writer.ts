import {VariableDefinition, VariableDeclarationType} from "./../definitions";
import {ExpressionWriter} from "./expression-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {BaseWriter} from "./base-writer";
import {WriteFlags} from "./../write-flags";

export class VariableWriter extends BaseWriter {
    private expressionWriter = new ExpressionWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);

    write(def: VariableDefinition, flags: WriteFlags) {
        this.writeDeclareClause(def);
        this.writeExportClause(def);
        this.writeDeclarationType(def.declarationType);
        this.writer.spaceIfLastNotSpace().write(def.name).write(": ");
        this.typeExpressionWriter.write(def.typeExpression);
        if (flags & WriteFlags.Expressions) {
            this.expressionWriter.writeWithEqualsSign(def.defaultExpression);
        }
        this.writer.write(";").newLine();
    }

    private writeDeclarationType(declarationType: VariableDeclarationType) {
        switch (declarationType) {
            case VariableDeclarationType.Var:
                this.writer.write("var");
                break;
            case VariableDeclarationType.Let:
                this.writer.write("let");
                break;
            case VariableDeclarationType.Const:
                this.writer.write("const");
                break;
            default:
                break;
        }
    }
}
