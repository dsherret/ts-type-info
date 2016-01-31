import {PropertyDefinitions, ObjectPropertyDefinition, ClassPropertyDefinition} from "./../definitions";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ExpressionWriter} from "./expression-writer";
import {ScopeWriter} from "./scope-writer";
import {BaseWriter} from "./base-writer";
import {WriteFlags} from "./../write-flags";

export class PropertyWriter extends BaseWriter {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private expressionWriter = new ExpressionWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);

    write(property: PropertyDefinitions, flags: WriteFlags) {
        this.scopeWriter.write((property as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writer.write(property.name);
        this.writeOptionalFlag(property);
        this.writer.write(": ");
        this.typeExpressionWriter.write(property.typeExpression);
        if (flags & WriteFlags.PropertyExpressions) {
            this.expressionWriter.writeWithEqualsSign((property as ObjectPropertyDefinition<any>).defaultExpression);
        }
        this.writer.write(";").newLine();
    }

    private writeOptionalFlag(property: PropertyDefinitions) {
        if (property.isOptional) {
            this.writer.write("?");
        }
    }
}
