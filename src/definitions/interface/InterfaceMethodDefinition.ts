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
        this.parameters.push(...parameters.map(p => factory.getInterfaceMethodParameter(p)));
        return this;
    }
}
