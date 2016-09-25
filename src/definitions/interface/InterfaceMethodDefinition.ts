import {StructureFactory} from "./../../factories";
import {InterfaceMethodParameterStructure} from "./../../structures";
import {BaseFunctionDefinition} from "./../base";
import {InterfaceMethodParameterDefinition} from "./InterfaceMethodParameterDefinition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    addParameter(structure: InterfaceMethodParameterStructure) {
        const def = new StructureFactory().getInterfaceMethodParameter(structure);
        this.parameters.push(def);
        return def;
    }
}
