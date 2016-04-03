import {VariableDefinition, VariableDeclarationType} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ExpressionWriter} from "./ExpressionWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class VariableWriter extends BaseDefinitionWriter<VariableDefinition> {
    private expressionWriter = new ExpressionWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);

    protected writeDefault(def: VariableDefinition, flags: WriteFlags) {
        this.writeDeclareClause(def);
        this.writeExportClause(def, flags);
        this.writeDeclarationType(def.declarationType);
        this.writer.spaceIfLastNotSpace().write(def.name);
        this.typeExpressionWriter.writeWithColon(def.typeExpression);
        if ((flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions) {
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
