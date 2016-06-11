import {StructureFactory} from "./../../factories";
import {ClassStaticMethodParameterStructure} from "./../../structures";
import {DefinitionType} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./ClassStaticMethodParameterDefinition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    constructor() {
        super(DefinitionType.ClassStaticMethod);
    }

    addParameter(structure: ClassStaticMethodParameterStructure) {
        const def = new StructureFactory().getClassStaticMethodParameter(structure);
        this.parameters.push(def);
        return def;
    }
}
