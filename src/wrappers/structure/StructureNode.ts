import {ClassConstructorParameterScope, NamespaceDeclarationType, Scope, VariableDeclarationType} from "./../../definitions";
import {ClassPropertyStructure, ScopedStructure, NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure, BasePropertyStructure} from "./../../structures";
import {INode} from "./../INode";
import {ISymbol} from "./../ISymbol";
import {IExpression} from "./../IExpression";
import {ITypeExpression} from "./../ITypeExpression";
import {ISignature} from "./../ISignature";
import {StructureSourceFileChild} from "./StructureSourceFileChild";
import {StructureSymbol} from "./StructureSymbol";
import {StructureExpression} from "./StructureExpression";
import {StructureTypeExpression} from "./StructureTypeExpression";

// add each structure type as it's implemented
type Structures = ClassPropertyStructure;

export class StructureNode extends StructureSourceFileChild implements INode {
    constructor(protected structure: Structures) {
        super();
    }

    forEachChild(callback: (node: INode) => void) {
        throw new Error("Not implemented");
    }

    getClassConstructorParameterScope(): ClassConstructorParameterScope {
        return ClassConstructorParameterScope.None;
    }

    getConstantValue() {
        return 0;
    }

    getDecorators(): INode[] {
        return [];
    }

    getDecoratorName() {
        return "";
    }

    getDecoratorArguments(): IExpression[] {
        return [];
    }

    getDefaultImportNameAndSymbol(): { name: string; symbol: ISymbol; } {
        return null;
    }

    getDefaultExpression(): IExpression {
        const defaultExpression = (this.structure as DefaultExpressionedStructure).defaultExpression;
        return defaultExpression == null ? null : new StructureExpression(defaultExpression);
    }

    getExpression(): IExpression {
        return null;
    }

    getFileNameOfModuleSpecifier(): string {
        return null;
    }

    getHeritageNodes(): INode[] {
        return [];
    }

    getImplementsTypeExpressions(): ITypeExpression[] {
        return [];
    }

    getLocalSymbol(): ISymbol {
        return null;
    }

    getModuleSpecifierText() {
        return "";
    }

    getModuleSpecifierSymbol(): ISymbol {
        return null;
    }

    getName(): string {
        return (this.structure as NamedStructure).name;
    }

    getNamespaceDeclarationType(): NamespaceDeclarationType {
        return NamespaceDeclarationType.Namespace;
    }

    getNamedExportSymbolsByName(): { [name: string]: ISymbol; } {
        return {};
    }

    getNamedImportSymbolsByName(): { [name: string]: ISymbol; } {
        return {};
    }

    getParameters(): INode[] {
        return [];
    }

    getReturnTypeExpression(): ITypeExpression {
        return null;
    }

    getScope(): Scope {
        return (this.structure as ScopedStructure).scope || Scope.Public;
    }

    getSignatureFromThis(): ISignature {
        return null;
    }

    getStarImportName(): string {
        return null;
    }

    getStarSymbol(): ISymbol {
        return null;
    }

    getSymbol(): ISymbol {
        return new StructureSymbol(this.structure);
    }

    getTypeExpression(): ITypeExpression {
        const typeExpression = (this.structure as TypeExpressionedStructure).type;
        return typeExpression == null ? null : new StructureTypeExpression(typeExpression);
    }

    getTypeParameters(): INode[] {
        return [];
    }

    getTypeParameterConstraintTypeExpression(): ITypeExpression {
        return null;
    }

    getTypes(): ITypeExpression[] {
        return [];
    }

    getVariableDeclarationType(): VariableDeclarationType {
        return VariableDeclarationType.Var;
    }

    hasAbstractKeyword() {
        return false;
    }

    hasDeclareKeyword() {
        return false;
    }

    hasStaticKeyword() {
        return false;
    }

    isAmbient() {
        return false;
    }

    isClass() {
        return false;
    }

    isConstructor() {
        return false;
    }

    isConstructorParameter() {
        return (this.structure as ClassPropertyStructure).isConstructorParameter || false;
    }

    isConstructSignature() {
        return false;
    }

    isDefaultKeyword() {
        return false;
    }

    isEnum() {
        return false;
    }

    isExportAssignment() {
        return false;
    }

    isExportDeclaration() {
        return false;
    }

    isExportKeyword() {
        return false;
    }

    isFunction() {
        return false;
    }

    isFunctionType() {
        return false;
    }

    isGetAccessor() {
        return false;
    }

    isIdentifier() {
        return false;
    }

    isImport() {
        return false;
    }

    isInterface() {
        return false;
    }

    isMethodDeclaration() {
        return false;
    }

    isMethodSignature() {
        return false;
    }

    isNamespace() {
        return false;
    }

    isParameterOptional() {
        return (this.structure as BasePropertyStructure).isOptional;
    }

    isPropertyDeclaration() {
        return false;
    }

    isPropertyOptional() {
        return false;
    }

    isPropertySignature() {
        return false;
    }

    isRestParameter() {
        return false;
    }

    isSetAccessor() {
        return false;
    }

    isStarImport() {
        return false;
    }

    isTypeAlias() {
        return false;
    }

    isTypeParameter() {
        return false;
    }

    isVariable() {
        return false;
    }

    nodeKindToString() {
        return "";
    }
}
