import {MethodDefinitions, ClassMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {TypeExpressionWriter} from "./TypeExpressionWriter";
import {ParametersWriter} from "./ParametersWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class MethodWriter extends BaseDefinitionWriter<MethodDefinitions> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private typeExpressionWriter = new TypeExpressionWriter(this.writer);
    private parametersWriter = new ParametersWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);
    private functionBodyWriter = new FunctionBodyWriter(this.writer);

    protected writeDefault(def: MethodDefinitions, flags: WriteFlags) {
        this.scopeWriter.write((def as ClassMethodDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writeAbstract(def as ClassMethodDefinition);
        this.writer.write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);
        this.parametersWriter.write(def.parameters, flags);
        this.writeReturnType(def, flags);
        this.functionBodyWriter.write(def, flags);
    }

    private writeAbstract(def: ClassMethodDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }

    private writeReturnType(def: MethodDefinitions, flags: WriteFlags) {
        if (!FunctionBodyWriter.willWriteFunctionBody(def, flags)) {
            this.typeExpressionWriter.writeWithColon(def.returnTypeExpression);
        }
    }
}
