import {StructureFactory} from "./../../../factories";
import {CallSignatureParameterDefinition} from "./../../../definitions";
import {CallSignatureStructure} from "./../../../structures";
import {CallSignatureBinder} from "./../../base";
import {StructureTypeParameteredBinder, StructureParameteredBinder, StructureReturnTypedBinder} from "./../base";
import {StructureCallSignatureParameterBinder} from "./StructureCallSignatureParameterBinder";

export class StructureCallSignatureBinder extends CallSignatureBinder {
    constructor(factory: StructureFactory, private structure: CallSignatureStructure) {
        super(
            new StructureTypeParameteredBinder(factory, structure),
            new StructureParameteredBinder(structure, CallSignatureParameterDefinition, StructureCallSignatureParameterBinder),
            new StructureReturnTypedBinder(factory, structure)
        );
    }
}
