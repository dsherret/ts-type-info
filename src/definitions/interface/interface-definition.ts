import * as ts from "typescript";
import {TypeParameterDefinition} from "./../type-parameter-definition";
import {applyMixins, TypeChecker} from "./../../utils";
import {PropertyDefinition, INamedDefinition, NamedDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";

export class InterfaceDefinition implements INamedDefinition, IExportableDefinition {
    // private _methods: ClassMethodDefinition[] = [];
    private _properties: PropertyDefinition[] = [];
    private _typeParameters: TypeParameterDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, private _baseInterfaces: InterfaceDefinition[]) {
        this.fillName(symbol);
        this.fillIsExported(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    get baseInterfaces() {
        return this._baseInterfaces;
    }

    // get methods() {
    //    return this._methods;
    // }

    get properties() {
        return this._properties;
    }

    get typeParameters() {
        return this._typeParameters;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeParameters = [];

        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            if (PropertyDefinition.isProperty(member)) {
                this._properties.push(new PropertyDefinition(typeChecker, member));
            }
            // else if (ClassMethodDefinition.isClassMethod(member)) {
            //    this._methods.push(new ClassMethodDefinition(typeChecker, member));
            // }
            // else if (TypeParameterDefinition.isTypeParameter(member)) {
                // todo: figure out better way of getting type parameters, like how it works in call signature definition?
            //    this._typeParameters.push(new TypeParameterDefinition(typeChecker, member));
            // }
            else {
                console.warn(`Not implemented '${member.getName()}'`);
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
