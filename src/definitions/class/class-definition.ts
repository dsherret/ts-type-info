import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {applyMixins, tryGet} from "./../../utils";
import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {BaseDefinition, INamedDefinition, NamedDefinition, IParentedDefinition, IDecoratableDefinition, DecoratableDefinition, IAmbientableDefinition,
        AmbientableDefinition, IExportableDefinition, ExportableDefinition, ITypeParameteredDefinition, TypeParameteredDefinition,
        IAbstractableDefinition, AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../write-flags";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {ClassMethodDefinition} from "./class-method-definition";
import {ClassPropertyDefinition} from "./class-property-definition";
import {ClassStaticMethodDefinition} from "./class-static-method-definition";
import {ClassStaticPropertyDefinition} from "./class-static-property-definition";

type ClassMemberDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export class ClassDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IDecoratableDefinition,
                                        IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition, IAbstractableDefinition {
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
    constructorDef: ClassConstructorDefinition;
    typeParameters: TypeParameterDefinition<this>[] = [];
    extendsTypeExpressions: TypeExpression[];
    implementsTypeExpressions: TypeExpression[];

    constructor(symbolNode: WrappedSymbolNode) {
        super(DefinitionType.Class);

        this.fillName(symbolNode);
        this.fillExportable(symbolNode);
        this.fillDecorators(symbolNode);
        this.fillAmbientable(symbolNode);
        this.fillAbstractable(symbolNode);
        this.fillMembers(symbolNode);
        this.fillTypeParametersBySymbolDeclaration(symbolNode);
        this.extendsTypeExpressions = symbolNode.getExtendsTypeExpressions();
        this.implementsTypeExpressions = symbolNode.getImplementsTypeExpressions();
    }

    write() {
        const writer = new CodeBlockWriter();
        const classWriter = new ClassWriter(writer, WriteFlags.Default);
        classWriter.write(this);
        return writer.toString();
    }

    private fillMembers(symbolNode: WrappedSymbolNode) {
        symbolNode.forEachChild(childSymbol => {
            const def = this.getMemberDefinition(childSymbol);

            if (def != null) {
                this.addDefinition(def);
            }
        });
    }

    private getMemberDefinition(childSymbol: WrappedSymbolNode): ClassMemberDefinitions {
        return tryGet(childSymbol, () => {
            if (childSymbol.isMethodDeclaration()) {
                if (childSymbol.hasStaticKeyword()) {
                    return new ClassStaticMethodDefinition(childSymbol, this);
                }
                else {
                    return new ClassMethodDefinition(childSymbol, this);
                }
            }
            else if (childSymbol.isPropertyDeclaration() || childSymbol.isGetAccessor()) {
                if (childSymbol.hasStaticKeyword()) {
                    return new ClassStaticPropertyDefinition(childSymbol, this);
                }
                else {
                    return new ClassPropertyDefinition(childSymbol, this);
                }
            }
            else if (childSymbol.isConstructor()) {
                return new ClassConstructorDefinition(childSymbol, this);
            }
            else if (childSymbol.isSetAccessor()) {
                // ignore, GetAccessor is the one that will be handled
            }
            else if (childSymbol.isIdentifier()) {
                // ignore, it's the class identifier
            }
            else if (childSymbol.isTypeParameter()) {
                // ignore, type parameters are handled elsewhere
            }
            else {
                console.warn(`Unknown class child kind: ${childSymbol.nodeKindToString()}`);
            }
        });
    }

    private addDefinition(def: ClassMemberDefinitions) {
        if (def.isClassPropertyDefinition()) {
            this.properties.push(def);
        }
        else if (def.isClassMethodDefinition()) {
            this.methods.push(def);
        }
        else if (def.isClassStaticPropertyDefinition()) {
            this.staticProperties.push(def);
        }
        else if (def.isClassStaticMethodDefinition()) {
            this.staticMethods.push(def);
        }
        else if (def.isClassConstructorDefinition()) {
            this.constructorDef = def;
        }
        else {
            console.warn(`Unknown member definition for class.`);
        }
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    fillDecorators: (symbolNode: WrappedSymbolNode) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (symbolNode: WrappedSymbolNode) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbolDeclaration: (symbolNode: WrappedSymbolNode) => void;
    fillTypeParametersBySignature: (signature: WrappedSignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (symbolNode: WrappedSymbolNode) => void;
    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
