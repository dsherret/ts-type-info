import * as ts from "typescript";
import { ConstructorDefinition, DecoratorDefinition, MethodDefinition,
    ClassPropertyDefinition, TypeParameterDefinition} from "./../definitions";
import {applyMixins, TypeChecker, Serializable} from "./../utils";
import {INamedDefinition, NamedDefinition} from "./base/named-definition";
import {IDecoratedDefinition, DecoratedDefinition} from "./base/decorated-definition";

export class ClassDefinition implements INamedDefinition, IDecoratedDefinition {
    private _methods: MethodDefinition[] = [];
    private _properties: ClassPropertyDefinition[] = [];
    private _typeParameters: TypeParameterDefinition[] = [];
    private _constructor: ConstructorDefinition;

    constructor(typeChecker: TypeChecker, symbol: ts.Symbol, private _baseClasses: ClassDefinition[]) {
        this.fillName(symbol);
        this.fillDecorators(symbol);

        this.createMembers(typeChecker, symbol);
    }

    @Serializable
    get baseClasses() {
        return this._baseClasses;
    }

    @Serializable
    get constructor() {
        return this._constructor;
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
    get typeParameters() {
        return this._typeParameters;
    }

    private createMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeParameters = [];

        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            if (MethodDefinition.isClassMethod(member)) {
                this._methods.push(new MethodDefinition(typeChecker, member));
            }
            else if (ClassPropertyDefinition.isProperty(member)) {
                this._properties.push(new ClassPropertyDefinition(typeChecker, member));
            }
            else if (ConstructorDefinition.isConstructor(member)) {
                this.verifyConstructorNotSet();
                this._constructor = new ConstructorDefinition(typeChecker, member);
            }
            else if (TypeParameterDefinition.isTypeParameter(member)) {
                // todo: figure out better way of getting type parameters, like how it works in call signature definition?
                this._typeParameters.push(new TypeParameterDefinition(typeChecker, member));
            }
            else {
                throw `Not implemented '${member.getName()}'`;
            }
        });
    }

    private verifyConstructorNotSet() {
        if (this._constructor != null) {
            throw `Unknown error: Duplicate constructors on ${this.name}.`;
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

applyMixins(ClassDefinition, [NamedDefinition, DecoratedDefinition]);
