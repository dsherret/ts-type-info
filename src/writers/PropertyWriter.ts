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

    protected writeDefault(def: PropertyDefinitions, flags: WriteFlags) {
        this.scopeWriter.write((def as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writeStatic(def);
        this.writer.write(def.name);
        this.writeOptionalFlag(def);

        const willWriteDefaultExpression = ExpressionWriter.willWriteDefaultExpression(def, flags);

        if (!willWriteDefaultExpression || def.isOptional === true) {
            this.typeExpressionWriter.writeWithColon(def.typeExpression);
        }

        if (willWriteDefaultExpression) {
            this.expressionWriter.writeWithEqualsSign((def as ObjectPropertyDefinition).defaultExpression);
        }
        this.writer.write(";").newLine();
    }

    private writeStatic(def: PropertyDefinitions) {
        if (def.isClassStaticPropertyDefinition()) {
            this.writer.write("static ");
        }
    }

    private writeOptionalFlag(property: PropertyDefinitions) {
        if (property.isOptional) {
            this.writer.write("?");
        }
    }
}
