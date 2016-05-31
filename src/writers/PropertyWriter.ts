import {PropertyDefinitions, BaseObjectPropertyDefinition, ClassPropertyDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {ExpressionWriter} from "./ExpressionWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";

export class PropertyWriter extends BaseDefinitionWriter<PropertyDefinitions> {
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private expressionWriter = new ExpressionWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);

    static willWriteAccessorBody(def: PropertyDefinitions) {
        return def.isClassPropertyDefinition() && def.isAccessor && (def.onWriteGetBody != null || def.onWriteSetBody != null);
    }

    protected writeDefault(def: PropertyDefinitions, flags: WriteFlags) {
        if (PropertyWriter.willWriteAccessorBody(def)) {
            this.writeAccessor(def as ClassPropertyDefinition);
        }
        else {
            this.writeNormalProperty(def, flags);
        }
    }

    private writeAccessor(def: ClassPropertyDefinition) {
        this.writeGetAccessor(def);

        if (!def.isReadonly) {
            this.writer.newLine();
            this.writeSetAccessor(def);
        }
    }

    private writeGetAccessor(def: ClassPropertyDefinition) {
        const isWriteBodyFunctionDefined = typeof def.onWriteGetBody === "function";
        this.writer.write("get ");
        this.writeHeader(def);
        this.writer.write("()");
        this.typeExpressionWriter.writeWithColon(def.typeExpression);

        this.writer.block(() => {
            if (isWriteBodyFunctionDefined) {
                def.onWriteGetBody(this.writer);
            }
        });
    }

    private writeSetAccessor(def: ClassPropertyDefinition) {
        const isWriteBodyFunctionDefined = typeof def.onWriteSetBody === "function";
        this.writer.write("set ");
        this.writeHeader(def);
        this.writer.write("(value"); // default to value for now
        this.typeExpressionWriter.writeWithColon(def.typeExpression);
        this.writer.write(")");

        this.writer.block(() => {
            if (isWriteBodyFunctionDefined) {
                def.onWriteSetBody(this.writer);
            }
        });
    }

    private writeNormalProperty(def: PropertyDefinitions, flags: WriteFlags) {
        this.writeHeader(def);
        this.writeOptionalFlag(def);

        const willWriteDefaultExpression = ExpressionWriter.willWriteDefaultExpression(def, flags);

        if (!willWriteDefaultExpression || def.isOptional === true) {
            this.typeExpressionWriter.writeWithColon(def.typeExpression);
        }

        if (willWriteDefaultExpression) {
            this.expressionWriter.writeWithEqualsSign((def as BaseObjectPropertyDefinition).defaultExpression);
        }

        this.writer.write(";").newLine();
    }

    private writeHeader(def: PropertyDefinitions) {
        this.scopeWriter.write((def as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writeStatic(def);
        this.writer.write(def.name);
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
