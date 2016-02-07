import {MethodDefinitions, ClassMethodDefinition} from "./../definitions";
import {TypeParametersWriter} from "./type-parameters-writer";
import {TypeExpressionWriter} from "./type-expression-writer";
import {ParametersWriter} from "./parameters-writer";
import {ScopeWriter} from "./scope-writer";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {FunctionBodyWriter} from "./function-body-writer";

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
        this.writer.write(": ");
        this.typeExpressionWriter.write(def.returnTypeExpression);
        this.functionBodyWriter.write(def);
        this.writer.newLine();
    }

    private writeAbstract(def: ClassMethodDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }
}
