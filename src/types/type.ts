import * as ts from "typescript";
import {CallSignatureDefinition, PropertyDefinition, IBaseNamedDefinition} from "./../definitions";
import {TypeExpression} from "./type-expression";
import {TypeChecker, TypeExpressionCache} from "./../utils";

export class Type {
    private _definition: IBaseNamedDefinition;
    private _properties: PropertyDefinition[];
    private _callSignatures: CallSignatureDefinition[];
    private _typeArguments: TypeExpression[];

    constructor(private _tsType: ts.Type) {
    }

    fillTypeInformation(typeChecker: TypeChecker, typeExpressionCache: TypeExpressionCache) {
        if (this.shouldGetAllInfo(typeChecker)) {
            this.fillCallSignatures(typeChecker);
            this.fillProperties(typeChecker);
        }
        else {
            this._properties = [];
            this._callSignatures = [];
        }

        this.fillTypeArguments(typeChecker, typeExpressionCache);
    }

    fillDefinition(definition: IBaseNamedDefinition) {
        this._definition = definition;
    }

    get properties() {
        return this._properties;
    }

    get callSignatures() {
        return this._callSignatures;
    }

    get definition() {
        return this._definition;
    }

    get typeArguments() {
        return this._typeArguments;
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

    private fillTypeArguments(typeChecker: TypeChecker, typeCache: TypeExpressionCache) {
        const tsTypeArguments = (this._tsType as ts.TypeReference).typeArguments;
        const args: TypeExpression[] = [];

        if (tsTypeArguments != null) {
            tsTypeArguments.forEach(arg => {
                args.push(typeCache.get(arg));
            });
        }

        this._typeArguments = args;
    }
}
