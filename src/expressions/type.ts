import * as ts from "typescript";
import {CallSignatureDefinition, IBaseNamedDefinition, TypePropertyDefinition} from "./../definitions";
import {TypeExpression} from "./type-expression";
import {TypeChecker, TypeExpressionCache, tryGet} from "./../utils";

export class Type {
    callSignatures: CallSignatureDefinition[];
    definition: IBaseNamedDefinition;
    properties: TypePropertyDefinition[];
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
            ts.TypeFlags.ObjectType |
            ts.TypeFlags.Instantiated
        )) !== 0 &&
        (tsType.flags & (
            ts.TypeFlags.Class |
            ts.TypeFlags.Interface
        )) === 0;
    }

    private fillProperties(typeChecker: TypeChecker, tsType: ts.Type) {
        const properties = tsType.getProperties();

        this.properties = [];

        properties.filter(p => p.name !== "prototype").forEach(property => {
            tryGet(property, () => new TypePropertyDefinition(typeChecker, property, this), def => this.properties.push(def));
        });
    }

    private fillCallSignatures(typeChecker: TypeChecker, tsType: ts.Type) {
        this.callSignatures = [];

        tsType.getCallSignatures().forEach(callSignature => {
            tryGet(this.text, () => new CallSignatureDefinition(typeChecker, callSignature), def => {
                this.callSignatures.push(def);
            });
        });
    }

    private fillTypeArguments(typeChecker: TypeChecker, typeExpressionCache: TypeExpressionCache, tsType: ts.Type) {
        const tsTypeArguments = (tsType as ts.TypeReference).typeArguments;
        const args: TypeExpression[] = [];

        if (tsTypeArguments != null) {
            tsTypeArguments.forEach(arg => {
                tryGet(this.text, () => typeExpressionCache.get(arg), typeExpression => args.push(typeExpression));
            });
        }

        this.typeArguments = args;
    }
}
