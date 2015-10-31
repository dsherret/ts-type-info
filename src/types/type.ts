import * as ts from "typescript";
import {PropertyDefinition} from "./../definitions";
import {TypeChecker, Serializable} from "./../utils";

export class Type {
    private _name: string;
    private _properties: PropertyDefinition[];

    constructor(typeChecker: TypeChecker, private _tsType: ts.Type) {
        this._name = typeChecker.typeToString(_tsType);

        this.fillProperties(typeChecker);
    }

    @Serializable
    get name() {
        return this._name;
    }

    @Serializable
    get properties() {
        return this._properties;
    }

    get tsType() {
        return this._tsType;
    }

    private fillProperties(typeChecker: TypeChecker) {
        const properties = this._tsType.getProperties();

        this._properties = properties.map(property => new PropertyDefinition(typeChecker, property));
    }
}
