import {MethodDefinitions, ClassMethodDefinition} from "./../definitions";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {ParametersWriter} from "./ParametersWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class MethodWriter extends BaseDefinitionWriter<MethodDefinitions> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer, this.flags);
    private parametersWriter = new ParametersWriter(this.writer, this.flags);
    private scopeWriter = new ScopeWriter(this.writer, this.flags);
    private functionBodyWriter = new FunctionBodyWriter(this.writer, this.flags);

    protected writeDefault(def: MethodDefinitions) {
        this.scopeWriter.write((def as ClassMethodDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writeAbstract(def as ClassMethodDefinition);
        this.writer.write(def.name);
        this.typeParametersWriter.write(def.typeParameters);
        this.parametersWriter.write(def.parameters);
        this.writeReturnType(def);
        this.functionBodyWriter.write(def);
    }

    private writeAbstract(def: ClassMethodDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }

    private writeReturnType(def: MethodDefinitions) {
        if (!FunctionBodyWriter.willWriteFunctionBody(def, this.flags)) {
            this.typeExpressionWriter.writeWithColon(def.returnTypeExpression);
        }
    }
}
