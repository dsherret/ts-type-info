import * as ts from "typescript";
import {ConstructorDefinition} from "./constructor-definition";
import {ClassMethodDefinition} from "./class-method-definition";
import {ClassPropertyDefinition} from "./class-property-definition";
import {StaticMethodDefinition} from "./static-method-definition";
import {StaticPropertyDefinition} from "./static-property-definition";
import {TypeExpression} from "./../../expressions";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition,
        IDecoratableDefinition, DecoratableDefinition, DecoratorDefinition,
        IExportableDefinition, ExportableDefinition,
        ITypeParameteredDefinition, TypeParameteredDefinition,
        TypeParameterDefinition} from "./../base";

export class ClassDefinition implements INamedDefinition, IDecoratableDefinition, IExportableDefinition, ITypeParameteredDefinition {
    private _methods: ClassMethodDefinition[] = [];
    private _properties: ClassPropertyDefinition[] = [];
    private _staticMethods: StaticMethodDefinition[] = [];
    private _staticProperties: StaticPropertyDefinition[] = [];
    private _constructorDef: ConstructorDefinition;
    private _typeParameters: TypeParameterDefinition[] = [];

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        private _extends: TypeExpression[],
        private _implements: TypeExpression[]) {

        this.fillName(symbol);
        this.fillDecorators(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
        this.fillIsExported(typeChecker, symbol);
    }

    get extends() {
        return this._extends;
    }

    get implements() {
        return this._implements;
    }

    get constructorDef() {
        return this._constructorDef;
    }

    get methods() {
        return this._methods;
    }

    get properties() {
        return this._properties;
    }

    get staticMethods() {
        return this._staticMethods;
    }

    get staticProperties() {
        return this._staticProperties;
    }

    get typeParameters() {
        return this._typeParameters;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this._typeParameters = [];

        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            /* istanbul ignore else */
            if (typeChecker.isSymbolClassProperty(member)) {
                this._properties.push(new ClassPropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolClassMethod(member)) {
                this._methods.push(new ClassMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolConstructor(member)) {
                this.verifyConstructorNotSet();
                this._constructorDef = new ConstructorDefinition(typeChecker, member);
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                // todo: maybe make this work like how it does in call signature definition and function? (use method in TypeParameteredDefinition?)
                this._typeParameters.push(new TypeParameterDefinition(typeChecker, member));
            }
            else {
                console.warn(`Not implemented member: ${member.getName()}`);
            }
        });

        Object.keys(symbol.exports).map(memberName => symbol.exports[memberName]).forEach(staticMember => {
            /* istanbul ignore else */
            if (staticMember.getName() === "prototype") {
                // ignore
            }
            else if (typeChecker.isSymbolStaticMethod(staticMember)) {
                this._staticMethods.push(new StaticMethodDefinition(typeChecker, staticMember));
            }
            else if (typeChecker.isSymbolStaticProperty(staticMember)) {
                this._staticProperties.push(new StaticPropertyDefinition(typeChecker, staticMember));
            }
            else {
                console.warn(`Not implemented static member: ${staticMember.getName()}`);
            }
        });
    }

    private verifyConstructorNotSet() {
        /* istanbul ignore if */
        if (this._constructorDef != null) {
            throw `Unknown error: Duplicate constructors on ${this.name}.`;
        }
    }

    // NamedDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // DecoratableDefinition
    fillDecorators: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition]);
