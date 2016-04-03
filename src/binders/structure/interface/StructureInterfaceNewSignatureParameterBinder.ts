import {InterfaceNewSignatureParameterStructure} from "./../../../structures";
import {InterfaceNewSignatureParameterBinder} from "./../../base";
import {StructureBaseParameterBinder} from "./../base";

export class StructureInterfaceNewSignatureParameterBinder extends InterfaceNewSignatureParameterBinder {
    constructor(structure: InterfaceNewSignatureParameterStructure) {
        super(new StructureBaseParameterBinder(structure));
    }
}
