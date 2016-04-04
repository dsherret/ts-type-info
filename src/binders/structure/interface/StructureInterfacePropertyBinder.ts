import {InterfacePropertyStructure} from "./../../../structures";
import {InterfacePropertyBinder} from "./../../base";
import {StructureBasePropertyBinder} from "./../base";

export class StructureInterfacePropertyBinder extends InterfacePropertyBinder {
    constructor(structure: InterfacePropertyStructure) {
        super(new StructureBasePropertyBinder(structure));
    }
}
