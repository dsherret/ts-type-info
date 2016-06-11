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

    addParameter(structure: ClassMethodParameterStructure) {
        const def = new StructureFactory().getClassMethodParameter(structure);
        this.parameters.push(def);
        return def;
    }

    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassMethodDefinition, BaseClassMethodDefinition, [AbstractableDefinition]);
