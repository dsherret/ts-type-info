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

    addUnionType(text: string) {
        const structureFactory = new MainFactory().createStructureFactory();
        const newDefinition = structureFactory.getTypeFromText(text);

        if (this.unionTypes.length > 0) {
            this.unionTypes.push(newDefinition);
            this._text += ` | ${newDefinition.text}`;
        }
        else {
            const cloneDefinition = this.clone();
            const emptyDefinition = new TypeDefinition();
            fillTypeDefinition(emptyDefinition, this);
            this.unionTypes.push(cloneDefinition, newDefinition);
            this._text = `${cloneDefinition.text} | ${newDefinition.text}`;
        }
    }

    clone() {
        return cloneTypeDefinition(this);
    }
}
