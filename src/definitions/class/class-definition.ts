import * as ts from "typescript";
import {ConstructorDefinition} from "./constructor-definition";
import {ClassMethodDefinition} from "./class-method-definition";
import {ClassPropertyDefinition} from "./class-property-definition";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";
import {ClassStaticPropertyDefinition} from "./class-static-property-definition";
import {TypeExpression} from "./../../expressions";
import {applyMixins, TypeChecker} from "./../../utils";
import {INamedDefinition, NamedDefinition, IDecoratableDefinition, DecoratableDefinition, IAmbientableDefinition, AmbientableDefinition,
        IExportableDefinition, ExportableDefinition, ITypeParameteredDefinition, TypeParameteredDefinition} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";

export class ClassDefinition implements INamedDefinition, IDecoratableDefinition, IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition {
    isAbstract: boolean;
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
    constructorDef: ConstructorDefinition;
    typeParameters: TypeParameterDefinition[] = [];

    constructor(
        typeChecker: TypeChecker,
        symbol: ts.Symbol,
        public extendsTypeExpressions: TypeExpression[],
        public implementsTypeExpressions: TypeExpression[]
    ) {
        this.fillName(symbol);
        this.fillExportable(typeChecker, symbol);
        this.fillDecorators(typeChecker, symbol);
        this.fillAmbientable(typeChecker, symbol);
        this.fillIsAbstract(typeChecker, symbol);
        this.fillMembers(typeChecker, symbol);
    }

    private fillIsAbstract(typeChecker: TypeChecker, symbol: ts.Symbol) {
        const nodeFlags = typeChecker.getDeclarationFromSymbol(symbol).flags;

        this.isAbstract = (nodeFlags & ts.NodeFlags.Abstract) === ts.NodeFlags.Abstract;
    }

    private fillMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        this.typeParameters = [];

        this.fillInstanceMembers(typeChecker, symbol);
        this.fillStaticMembers(typeChecker, symbol);
    }

    private fillInstanceMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.members).map(memberName => symbol.members[memberName]).forEach(member => {
            /* istanbul ignore else */
            if (typeChecker.isSymbolClassProperty(member)) {
                this.properties.push(new ClassPropertyDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolClassMethod(member)) {
                this.methods.push(new ClassMethodDefinition(typeChecker, member));
            }
            else if (typeChecker.isSymbolConstructor(member)) {
                this.verifyConstructorNotSet();
                this.constructorDef = new ConstructorDefinition(typeChecker, member);
            }
            else if (typeChecker.isSymbolTypeParameter(member)) {
                // todo: maybe make this work like how it does in call signature definition and function? (use method in TypeParameteredDefinition?)
                this.typeParameters.push(new TypeParameterDefinition(typeChecker, member));
            }
            else {
                console.warn(`Not implemented member: ${member.getName()}`);
            }
        });
    }

    private fillStaticMembers(typeChecker: TypeChecker, symbol: ts.Symbol) {
        Object.keys(symbol.exports).map(memberName => symbol.exports[memberName]).forEach(staticMember => {
            /* istanbul ignore else */
            if (staticMember.getName() === "prototype") {
                // ignore
            }
            else if (typeChecker.isSymbolStaticMethod(staticMember)) {
                this.staticMethods.push(new ClassStaticMethodDefinition(typeChecker, staticMember));
            }
            else if (typeChecker.isSymbolStaticProperty(staticMember)) {
                this.staticProperties.push(new ClassStaticPropertyDefinition(typeChecker, staticMember));
            }
            else {
                console.warn(`Not implemented static member: ${staticMember.getName()}`);
            }
        });
    }

    private verifyConstructorNotSet() {
        /* istanbul ignore if */
        if (this.constructorDef != null) {
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
    fillExportable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isExported: boolean;
    hasExportKeyword: boolean;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    fillTypeParametersBySignature: (typeChecker: TypeChecker, signature: ts.Signature) => void;
    // AmbientableDefinition
    fillAmbientable: (typeChecker: TypeChecker, symbol: ts.Symbol) => void;
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
