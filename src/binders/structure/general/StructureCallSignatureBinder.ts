import {StructureFactory} from "./../../../factories";
import {CallSignatureParameterDefinition} from "./../../../definitions";
import {CallSignatureStructure} from "./../../../structures";
import {CallSignatureBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureTypeParameteredBinder, StructureParameteredBinder, StructureReturnTypedBinder, StructureNodedBinder,
    StructureDocumentationedBinder} from "./../base";
import {StructureCallSignatureParameterBinder} from "./StructureCallSignatureParameterBinder";

export class StructureCallSignatureBinder extends CallSignatureBinder {
    constructor(factory: StructureFactory, structure: CallSignatureStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureParameteredBinder(factory, structure, CallSignatureParameterDefinition, StructureCallSignatureParameterBinder),
            new StructureReturnTypedBinder(factory, structure),
            new StructureNodedBinder(),
            new StructureDocumentationedBinder(structure)
        );
    }
}
