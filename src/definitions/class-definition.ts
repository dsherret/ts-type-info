import * as ts from "typescript";
import {MethodDefinition, PropertyDefinition, TypeParameterDefinition, DecoratorDefinition} from "./../definitions";
import {applyMixins, TypeChecker, Serializable} from "./../utils";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";
import {IDecoratableDefinition, DecoratableDefinition} from "./base/decorated-definition";

export class ClassDefinition implements INamedDefinition, IDecoratableDefinition {
    private _methods: MethodDefinition[] = [];
    private _properties: PropertyDefinition[] = [];
    private _typeParameter: TypeParameterDefinition;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, private _baseClasses: ClassDefinition[]) {
        this.createMembers(typeChecker, symbol);

        this.fillName(symbol);
        this.fillDecorators(symbol);
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

    @Serializable
    get typeParameter() {
        return this._typeParameter;
    }

    private createMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            if (MethodDefinition.isClassMethod(member)) {
                this._methods.push(new MethodDefinition(typeChecker, member));
            }
            else if (PropertyDefinition.isProperty(member)) {
                this._properties.push(new PropertyDefinition(typeChecker, member));
            }
            else if ((member.getFlags() & ts.SymbolFlags.Constructor) != 0) {
                throw `Constructors are currently not supported. Class: ${this.name}`;
            }
            else if (TypeParameterDefinition.isTypeParameter(member)) {
                this.verifyTypeParameterNotSet();
                this._typeParameter = new TypeParameterDefinition(typeChecker, member);
            }
            else {
                throw `Not implemented '${member.getName()}'`;
            }
        });
    }

    private verifyTypeParameterNotSet() {
        if (this._typeParameter != null) {
            throw "Unknown error: Duplicate type parameter.";
        }
    }

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // DecoratableDefinition
    fillDecorators: (symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];

    static isClassDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.Class) !== 0;
    }
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition]);
