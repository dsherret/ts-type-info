import {StructureFactory} from "./../../../factories";
import {CallSignatureParameterStructure} from "./../../../structures";
import {CallSignatureParameterBinder} from "./../../base";
import {StructureBaseParameterBinder} from "./../base";

export class StructureCallSignatureParameterBinder extends CallSignatureParameterBinder {
    constructor(factory: StructureFactory, structure: CallSignatureParameterStructure) {
        super(new StructureBaseParameterBinder(factory, structure));
    }
}
