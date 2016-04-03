import {StructureFactory} from "./../../factories";
import {ClassMethodParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {DefinitionType, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./ClassMethodParameterDefinition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure> implements AbstractableDefinition {
    constructor() {
        super(DefinitionType.ClassMethod);
    }

    addParameters(...parameters: ClassMethodParameterStructure[]) {
        const factory = new StructureFactory();
        parameters.forEach(parameter => {
            this.parameters.push(factory.getClassMethodParameter(parameter));
        });
        return this;
    }

    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassMethodDefinition, BaseClassMethodDefinition, [AbstractableDefinition]);
