import {VariableDefinition, VariableDeclarationType} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ExpressionWriter} from "./ExpressionWriter";
import {TypeWriter} from "./TypeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class VariableWriter extends BaseDefinitionWriter<VariableDefinition> {
    private expressionWriter = new ExpressionWriter(this.writer);
    private typeWriter = new TypeWriter(this.writer);

    protected writeDefault(def: VariableDefinition, flags: WriteFlags) {
        this.writeDeclareKeyword(def);
        this.writeExportKeyword(def, flags);
        this.writeDeclarationType(def.declarationType);
        this.writer.spaceIfLastNotSpace().write(def.name);
        this.typeWriter.writeWithColon(def.type);
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
