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

    addIntersectionType(text: string) {
        const structureFactory = new MainFactory().createStructureFactory();
        const newDefinition = structureFactory.getTypeFromText(text);

        if (this.intersectionTypes.length > 0) {
            this.intersectionTypes.push(newDefinition);

            this._text += ` & ${this._getTextForIntersectionTypeFromText(newDefinition)}`;
        }
        else {
            const cloneDefinition = this.clone();
            const emptyDefinition = new TypeDefinition();
            fillTypeDefinition(emptyDefinition, this);
            this.intersectionTypes.push(cloneDefinition, newDefinition);

            this._text = `${this._getTextForIntersectionTypeFromText(cloneDefinition)} & ${this._getTextForIntersectionTypeFromText(newDefinition)}`;
        }
    }

    clone() {
        return cloneTypeDefinition(this);
    }

    // ReSharper disable once InconsistentNaming
    private _getTextForIntersectionTypeFromText(def: TypeDefinition) {
        if (def.unionTypes.length > 0)
            return `(${def.text})`;

        return `${def.text}`;
    }
}
