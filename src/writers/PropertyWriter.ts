import {PropertyDefinitions, ObjectPropertyDefinition, ClassPropertyDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {ExpressionWriter} from "./ExpressionWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class PropertyWriter extends BaseDefinitionWriter<PropertyDefinitions> {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private expressionWriter = new ExpressionWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);

    protected writeDefault(property: PropertyDefinitions, flags: WriteFlags) {
        this.scopeWriter.write((property as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writer.write(property.name);
        this.writeOptionalFlag(property);
        this.typeExpressionWriter.writeWithColon(property.typeExpression);
        if ((flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions) {
            this.expressionWriter.writeWithEqualsSign((property as ObjectPropertyDefinition).defaultExpression);
        }
        this.writer.write(";").newLine();
    }

    private writeOptionalFlag(property: PropertyDefinitions) {
        if (property.isOptional) {
            this.writer.write("?");
        }
    }
}
