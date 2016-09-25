import {StructureFactory} from "./../../factories";
import {ClassStaticMethodParameterStructure} from "./../../structures";
import {BaseClassMethodDefinition} from "./base";
import {ClassStaticMethodParameterDefinition} from "./ClassStaticMethodParameterDefinition";

export class ClassStaticMethodDefinition extends BaseClassMethodDefinition<ClassStaticMethodParameterDefinition, ClassStaticMethodParameterStructure> {
    addParameter(structure: ClassStaticMethodParameterStructure) {
        const def = new StructureFactory().getClassStaticMethodParameter(structure);
        this.parameters.push(def);
        return def;
    }
}
