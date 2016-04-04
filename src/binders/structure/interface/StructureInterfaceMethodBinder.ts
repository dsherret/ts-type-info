import {StructureFactory} from "./../../../factories";
import {InterfaceMethodParameterDefinition} from "./../../../definitions";
import {InterfaceMethodStructure} from "./../../../structures";
import {InterfaceMethodBinder} from "./../../base";
import {StructureBaseFunctionBinder} from "./../base";
import {StructureInterfaceMethodParameterBinder} from "./StructureInterfaceMethodParameterBinder";

export class StructureInterfaceMethodBinder extends InterfaceMethodBinder {
    constructor(factory: StructureFactory, structure: InterfaceMethodStructure) {
        super(
            new StructureBaseFunctionBinder(factory, structure, InterfaceMethodParameterDefinition, StructureInterfaceMethodParameterBinder)
        );
    }
}
