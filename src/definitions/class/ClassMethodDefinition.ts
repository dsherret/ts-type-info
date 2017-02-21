import {MainFactory} from "./../../factories";
import {ClassMethodParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./ClassMethodParameterDefinition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure> implements AbstractableDefinition {
    addParameter(structure: ClassMethodParameterStructure) {
        const def = new MainFactory().createStructureFactory().getClassMethodParameter(structure);
        this.parameters.push(def);
        return def;
    }

    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassMethodDefinition, BaseClassMethodDefinition, [AbstractableDefinition]);
