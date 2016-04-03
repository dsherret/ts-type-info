import {CallSignatureParameterStructure} from "./../../../structures";
import {CallSignatureParameterBinder} from "./../../base";
import {StructureBaseParameterBinder} from "./../base";

export class StructureCallSignatureParameterBinder extends CallSignatureParameterBinder {
    constructor(structure: CallSignatureParameterStructure) {
        super(new StructureBaseParameterBinder(structure));
    }
}
