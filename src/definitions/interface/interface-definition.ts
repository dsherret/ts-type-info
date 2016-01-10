import * as ts from "typescript";
import {TypeParameterDefinition} from "./../misc";
import {applyMixins, TypeChecker} from "./../../utils";
import {PropertyDefinition, INamedDefinition, NamedDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";
import {TypeExpression} from "./../../expressions";
import {InterfaceMethodDefinition} from "./interface-method-definition";
import {InterfaceNewSignatureDefinition} from "./interface-new-signature-definition";

export class InterfaceDefinition implements INamedDefinition, IExportableDefinition {
    private _methods: InterfaceMethodDefinition[] = [];
    private _newSignatures: InterfaceNewSignatureDefinition[] = [];
    private _properties: PropertyDefinition[] = [];
    private _typeParameters: TypeParameterDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, private _extends: TypeExpression[]) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    get extends() {
        return this._extends;
    }

    get methods() {
        return this._methods;
    }

    get newSignatures() {
        return this._newSignatures;
    }

    get properties() {
        return this._properties;
    }

    get typeParameters() {
        return this._typeParameters;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeParameters = [];

        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            /* istanbul ignore else */
            if (PropertyDefinition.isProperty(member)) {
                this._properties.push(new PropertyDefinition(typeChecker, member));
            }
            else if (InterfaceMethodDefinition.isMethod(member)) {
                this._methods.push(new InterfaceMethodDefinition(typeChecker, member));
            }
            else if (TypeParameterDefinition.isTypeParameter(member)) {
                this._typeParameters.push(new TypeParameterDefinition(typeChecker, member));
            }
            else if (InterfaceNewSignatureDefinition.isNewSignature(member)) {
                member.getDeclarations().forEach(d => {
                    this._newSignatures.push(new InterfaceNewSignatureDefinition(typeChecker, typeChecker.getSignatureFromDeclaration(d as ts.SignatureDeclaration)));
                });
            }
            else {
                console.log(member);
                console.warn(`Not implemented interface member: ${member.getName()}`);
            }
        });
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;

    static isInterfaceDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.Interface) !== 0;
    }
}

applyMixins(InterfaceDefinition, [NamedDefinition, ExportableDefinition]);
