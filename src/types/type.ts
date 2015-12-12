import * as ts from "typescript";
import {CallSignatureDefinition, PropertyDefinition} from "./../definitions";
import {TypeChecker} from "./../utils";

export class Type {
    private _name: string;
    private _properties: PropertyDefinition[];
    private _callSignatures: CallSignatureDefinition[];

    constructor(typeChecker: TypeChecker, private _tsType: ts.Type) {
        this._name = typeChecker.typeToString(_tsType);
    }

    fillTypeInformation(typeChecker: TypeChecker) {
        if (this.shouldGetAllInfo(typeChecker)) {
            this.fillCallSignatures(typeChecker);
            this.fillProperties(typeChecker);
        }
        else {
            this._properties = [];
            this._callSignatures = [];
        }
    }

    get name() {
        return this._name;
    }

    get properties() {
        return this._properties;
    }

    get callSignatures() {
        return this._callSignatures;
    }

    get tsType() {
        return this._tsType;
    }

    private shouldGetAllInfo(typeChecker: TypeChecker) {
        // only get properties and call signature info for specific types
        return (this._tsType.flags & (
            ts.TypeFlags.Class |
            ts.TypeFlags.Interface |
            ts.TypeFlags.ObjectType |
            ts.TypeFlags.Instantiated
        )) !== 0;
    }

    private fillProperties(typeChecker: TypeChecker) {
        const properties = this._tsType.getProperties();

        this._properties = properties.map(property => new PropertyDefinition(typeChecker, property));
    }

    private fillCallSignatures(typeChecker: TypeChecker) {
        this._callSignatures = this._tsType.getCallSignatures()
                                           .map(callSignature => new CallSignatureDefinition(typeChecker, callSignature));
    }
}
