import {StructureFactory} from "./../../../factories";
import {InterfaceNewSignatureParameterDefinition} from "./../../../definitions";
import {InterfaceNewSignatureStructure} from "./../../../structures";
import {InterfaceNewSignatureBinder} from "./../../base";
import {StructureParameteredBinder, StructureReturnTypedBinder} from "./../base";
import {StructureInterfaceNewSignatureParameterBinder} from "./StructureInterfaceNewSignatureParameterBinder";

export class StructureInterfaceNewSignatureBinder extends InterfaceNewSignatureBinder {
    constructor(factory: StructureFactory, signature: InterfaceNewSignatureStructure) {
        super(
            new StructureParameteredBinder(signature, InterfaceNewSignatureParameterDefinition, StructureInterfaceNewSignatureParameterBinder),
            new StructureReturnTypedBinder(factory, signature)
        );
    }
}
