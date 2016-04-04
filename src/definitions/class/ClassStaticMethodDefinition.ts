import {StructureFactory} from "./../../factories";
import {ClassStaticMethodParameterStructure} from "./../../structures";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./ClassStaticMethodParameterDefinition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    constructor() {
        super(DefinitionType.ClassStaticMethod);
    }

    addParameters(...parameters: ClassStaticMethodParameterStructure[]) {
        const factory = new StructureFactory();
        this.parameters.push(...parameters.map(p => factory.getClassStaticMethodParameter(p)));
        return this;
    }
}
