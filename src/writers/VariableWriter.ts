import {VariableDefinition, VariableDeclarationType} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";

export class VariableWriter extends BaseDefinitionWriter<VariableDefinition> {
    private typeWithDefaultExpressionWriter = new TypeWithDefaultExpressionWriter(this.writer);

    protected writeDefault(def: VariableDefinition, flags: WriteFlags) {
        this.writeDeclareKeyword(def);
        this.writeExportKeyword(def, flags);
        this.writeDeclarationType(def.declarationType);
        this.writer.spaceIfLastNotSpace().write(def.name);
        this.typeWithDefaultExpressionWriter.write(def, flags);
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
