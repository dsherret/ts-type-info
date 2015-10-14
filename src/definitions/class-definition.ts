import * as ts from "typescript";
import {NamedDefinition, MethodDefinition, PropertyDefinition} from "./../definitions";
import {TypeChecker, Serializable} from "./../utils";

export class ClassDefinition extends NamedDefinition {
    private _methods: MethodDefinition[] = [];
    private _properties: PropertyDefinition[] = [];

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, private _baseClasses: ClassDefinition[]) {
        super(symbol);

        this.createMembers(typeChecker, symbol);
    }

    @Serializable
    get baseClasses() {
        return this._baseClasses;
    }

    @Serializable
    get methods() {
        return this._methods;
    }

    @Serializable
    get properties() {
        return this._properties;
    }

    private createMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        for (let memberName in symbol.members) {
            if (MethodDefinition.isClassMethod(symbol.members[memberName])) {
                this._methods.push(new MethodDefinition(typeChecker, symbol.members[memberName]));
            }
            else if (PropertyDefinition.isProperty(symbol.members[memberName])) {
                this._properties.push(new PropertyDefinition(typeChecker, symbol.members[memberName]));
            }
            else if (memberName === "__constructor") {
                throw `Constructors are currently not supported. Class: ${this.name}`;
            }
            else {
                throw `Not implemented '${memberName}'`;
            }
        }
    }

    static isClassDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.Class) !== 0;
    }
}
