import {MainFactory} from "./../../factories";
import {DefinitionUtils} from "./../../utils";
import {cloneTypeDefinition, fillTypeDefinition} from "./../../cloneFunctions";
import {CallSignatureDefinition} from "./../general";
import {BaseTypeDefinition} from "./base";
import {TypeNodeDefinition} from "./TypeNodeDefinition";

export class TypeDefinition extends BaseTypeDefinition {
    callSignatures: CallSignatureDefinition[] = [];
    node: TypeNodeDefinition | null;

    get text() {
        return this._text;
    }

    set text(text: string) {
        const structureFactory = new MainFactory().createStructureFactory();
        const newDefinition = structureFactory.getTypeFromText(text);
        fillTypeDefinition(newDefinition, this);
    }

    getCallSignature(searchFunction: (typeDefinition: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.callSignatures, searchFunction);
    }

    clone() {
        return cloneTypeDefinition(this);
    }
}
