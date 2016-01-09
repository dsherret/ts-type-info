import * as ts from "typescript";
import {ConstructorDefinition} from "./constructor-definition";
import {ClassMethodDefinition} from "./class-method-definition";
import {ClassPropertyDefinition} from "./class-property-definition";
import {StaticMethodDefinition} from "./static-method-definition";
import {StaticPropertyDefinition} from "./static-property-definition";
import {DecoratorDefinition, TypeParameterDefinition} from "./../misc";
import {TypeExpression} from "./../../types";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition,
        IDecoratableDefinition, DecoratableDefinition,
        IExportableDefinition, ExportableDefinition} from "./../base";

export class ClassDefinition implements INamedDefinition, IDecoratableDefinition, IExportableDefinition {
    private _methods: ClassMethodDefinition[] = [];
    private _properties: ClassPropertyDefinition[] = [];
    private _staticMethods: StaticMethodDefinition[] = [];
    private _staticProperties: StaticPropertyDefinition[] = [];
    private _typeParameters: TypeParameterDefinition[] = [];
    private _constructorDef: ConstructorDefinition;

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        private _extends: TypeExpression[],
        private _implements: TypeExpression[]) {

        this.fillName(symbol);
        this.fillDecorators(symbol);
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
            if (ClassPropertyDefinition.isProperty(member)) {
                this._properties.push(new ClassPropertyDefinition(typeChecker, member));
            }
            else if (ClassMethodDefinition.isClassMethod(member)) {
                this._methods.push(new ClassMethodDefinition(typeChecker, member));
            }
            else if (ConstructorDefinition.isConstructor(member)) {
                this.verifyConstructorNotSet();
                this._constructorDef = new ConstructorDefinition(typeChecker, member);
            }
            else if (TypeParameterDefinition.isTypeParameter(member)) {
                // todo: figure out better way of getting type parameters, like how it works in call signature definition?
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
            else if (StaticMethodDefinition.isStaticMethod(staticMember)) {
                this._staticMethods.push(new StaticMethodDefinition(typeChecker, staticMember));
            }
            else if (StaticPropertyDefinition.isStaticProperty(staticMember)) {
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

    // NameDefinition
    fillName: (symbol: ts.Symbol) => void;
    name: string;
    // DecoratableDefinition
    fillDecorators: (symbol: ts.Symbol) => void;
    decorators: DecoratorDefinition[];
    // ExportableDefinition
    fillIsExported: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;

    static isClassDefinition(symbol: ts.Symbol) {
        return (symbol.flags & ts.SymbolFlags.Class) !== 0;
    }
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition]);
