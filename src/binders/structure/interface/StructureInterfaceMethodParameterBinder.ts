import {InterfaceMethodParameterStructure} from "./../../../structures";
import {InterfaceMethodParameterBinder} from "./../../base";
import {StructureBaseParameterBinder} from "./../base";

export class StructureInterfaceMethodParameterBinder extends InterfaceMethodParameterBinder {
    constructor(structure: InterfaceMethodParameterStructure) {
        super(new StructureBaseParameterBinder(structure));
    }
}
