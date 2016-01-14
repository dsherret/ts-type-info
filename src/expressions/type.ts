import * as ts from "typescript";
import {CallSignatureDefinition, PropertyDefinition, IBaseNamedDefinition} from "./../definitions";
import {TypeExpression} from "./type-expression";
import {TypeChecker, TypeExpressionCache} from "./../utils";

export class Type {
    callSignatures: CallSignatureDefinition[];
    definition: IBaseNamedDefinition;
    properties: PropertyDefinition[];
    typeArguments: TypeExpression[];
    text: string;

    fillTypeInformation(typeChecker: TypeChecker, typeExpressionCache: TypeExpressionCache, tsType: ts.Type) {
        this.text = typeChecker.typeToString(tsType);

        if (this.shouldGetAllInfo(typeChecker, tsType)) {
            this.fillCallSignatures(typeChecker, tsType);
            this.fillProperties(typeChecker, tsType);
        }
        else {
            this.properties = [];
            this.callSignatures = [];
        }

        this.fillTypeArguments(typeChecker, typeExpressionCache, tsType);
    }

    fillDefinition(definition: IBaseNamedDefinition) {
        this.definition = definition;
    }

    private shouldGetAllInfo(typeChecker: TypeChecker, tsType: ts.Type) {
        // only get properties and call signature info for specific types
        return (tsType.flags & (
            ts.TypeFlags.Class |
            ts.TypeFlags.Interface |
            ts.TypeFlags.ObjectType |
            ts.TypeFlags.Instantiated
        )) !== 0;
    }

    private fillProperties(typeChecker: TypeChecker, tsType: ts.Type) {
        const properties = tsType.getProperties();

        this.properties = properties.map(property => new PropertyDefinition(typeChecker, property));
    }

    private fillCallSignatures(typeChecker: TypeChecker, tsType: ts.Type) {
        this.callSignatures = tsType.getCallSignatures()
                                           .map(callSignature => new CallSignatureDefinition(typeChecker, callSignature));
    }

    private fillTypeArguments(typeChecker: TypeChecker, typeCache: TypeExpressionCache, tsType: ts.Type) {
        const tsTypeArguments = (tsType as ts.TypeReference).typeArguments;
        const args: TypeExpression[] = [];

        if (tsTypeArguments != null) {
            tsTypeArguments.forEach(arg => {
                args.push(typeCache.get(arg));
            });
        }

        this.typeArguments = args;
    }
}
