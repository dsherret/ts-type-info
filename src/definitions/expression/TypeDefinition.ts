import {DefinitionUtils} from "./../../utils";
import {cloneTypeDefinition} from "./../../cloneFunctions";
import {CallSignatureDefinition} from "./../general";
import {BaseTypeDefinition} from "./base";
import {TypeNodeDefinition} from "./TypeNodeDefinition";

export class TypeDefinition extends BaseTypeDefinition {
    callSignatures: CallSignatureDefinition[] = [];
    node: TypeNodeDefinition | null;

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.callSignatures, searchFunction);
    }

    clone() {
        return cloneTypeDefinition(this);
    }
}
