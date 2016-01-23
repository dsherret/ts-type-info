import * as ts from "typescript";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IExportableDefinition, ExportableDefinition, IAmbientableDefinition, AmbientableDefinition,
        ITypeParameteredDefinition, TypeParameteredDefinition} from "./../base";
import {TypeParameterDefinition} from "./../general";
import {TypeExpression} from "./../../expressions";
import {InterfaceMethodDefinition} from "./interface-method-definition";
import {InterfacePropertyDefinition} from "./interface-property-definition";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceDefinition implements INamedDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
    methods: InterfaceMethodDefinition[] = [];
    newSignatures: InterfaceNewSignatureDefinition[] = [];
    properties: InterfacePropertyDefinition[] = [];
    typeParameters: TypeParameterDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, public extendsTypeExpressions: TypeExpression[]) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
        this.fillIsAmbient(typeChecker, symbol);
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = [];

        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            /* istanbul ignore else */
            if (typeChecker.isSymbolProperty(member)) {
                this.properties.push(new InterfacePropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolInterfaceMethod(member)) {
                this.methods.push(new InterfaceMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                this.typeParameters.push(new TypeParameterDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolNewSignature(member)) {
                member.getDeclarations().forEach(d => {
                    this.newSignatures.push(new InterfaceNewSignatureDefinition(typeChecker, typeChecker.getSignatureFromDeclaration(d as ts.SignatureDeclaration)));
                });
            }
            else {
                console.warn(`Not implemented interface member: ${member.getName()}`);
            }
        });
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    fillIsAmbient: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
