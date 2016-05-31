import {StructureFactory} from "./../../../factories";
import {InterfaceMethodParameterStructure} from "./../../../structures";
import {InterfaceMethodParameterBinder} from "./../../base";
import {StructureBaseParameterBinder} from "./../base";

export class StructureInterfaceMethodParameterBinder extends InterfaceMethodParameterBinder {
    constructor(factory: StructureFactory, structure: InterfaceMethodParameterStructure) {
        super(new StructureBaseParameterBinder(factory, structure));
    }
}
