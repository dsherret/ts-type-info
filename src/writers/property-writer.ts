import {PropertyDefinitions, ObjectPropertyDefinition, ClassPropertyDefinition} from "./../definitions";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ExpressionWriter} from "./expression-writer";
import {ScopeWriter} from "./scope-writer";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {WriteFlags} from "./../write-flags";

export class PropertyWriter extends BaseDefinitionWriter<PropertyDefinitions> {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer, this.flags);
    private expressionWriter = new ExpressionWriter(this.writer, this.flags);
    private scopeWriter = new ScopeWriter(this.writer, this.flags);

    protected writeDefault(property: PropertyDefinitions) {
        this.scopeWriter.write((property as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writer.write(property.name);
        this.writeOptionalFlag(property);
        this.writer.write(": ");
        this.typeExpressionWriter.write(property.typeExpression);
        if ((this.flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions) {
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
