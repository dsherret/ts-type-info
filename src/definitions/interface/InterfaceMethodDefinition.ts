import {StructureFactory} from "./../../factories";
import {InterfaceMethodParameterStructure} from "./../../structures";
import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {InterfaceMethodParameterDefinition} from "./InterfaceMethodParameterDefinition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    constructor() {
        super(DefinitionType.InterfaceMethod);
    }

    addParameter(structure: InterfaceMethodParameterStructure) {
        const def = new StructureFactory().getInterfaceMethodParameter(structure);
        this.parameters.push(def);
        return def;
    }
}
