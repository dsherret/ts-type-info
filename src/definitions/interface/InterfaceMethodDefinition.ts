import {StructureFactory} from "./../../factories";
import {InterfaceMethodParameterStructure} from "./../../structures";
import {DefinitionType, BaseFunctionDefinition} from "./../base";
import {InterfaceMethodParameterDefinition} from "./InterfaceMethodParameterDefinition";

export class InterfaceMethodDefinition extends BaseFunctionDefinition<InterfaceMethodParameterDefinition, InterfaceMethodParameterStructure> {
    constructor() {
        super(DefinitionType.InterfaceMethod);
    }

    addParameters(...parameters: InterfaceMethodParameterStructure[]) {
        const factory = new StructureFactory();
        parameters.forEach(parameter => {
            this.parameters.push(factory.getInterfaceMethodParameter(parameter));
        });
        return this;
    }
}
