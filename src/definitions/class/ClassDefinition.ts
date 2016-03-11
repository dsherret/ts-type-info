import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {TypeExpression} from "./../../expressions";
import {applyMixins, tryGet, Logger, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISignature, INode} from "./../../wrappers";
import {StructureNode} from "./../../wrappers/structure";
import {BaseDefinition, INamedDefinition, NamedDefinition, IParentedDefinition, IDecoratableDefinition, DecoratableDefinition, IAmbientableDefinition,
        AmbientableDefinition, IExportableDefinition, ExportableDefinition, ITypeParameteredDefinition, TypeParameteredDefinition,
        IAbstractableDefinition, AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {ClassPropertyStructure} from "./../../structures";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";
import {ClassMethodDefinition} from "./ClassMethodDefinition";
import {ClassPropertyDefinition} from "./ClassPropertyDefinition";
import {ClassStaticMethodDefinition} from "./ClassStaticMethodDefinition";
import {ClassStaticPropertyDefinition} from "./ClassStaticPropertyDefinition";

type ClassMemberDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export class ClassDefinition extends BaseDefinition implements INamedDefinition, IParentedDefinition<ModuledDefinitions>, IDecoratableDefinition,
                                        IExportableDefinition, ITypeParameteredDefinition, IAmbientableDefinition, IAbstractableDefinition {
    methods = new ArrayExt<ClassMethodDefinition>();
    properties = new ArrayExt<ClassPropertyDefinition>();
    staticMethods = new ArrayExt<ClassStaticMethodDefinition>();
    staticProperties = new ArrayExt<ClassStaticPropertyDefinition>();
    constructorDef: ClassConstructorDefinition;
    typeParameters = new ArrayExt<TypeParameterDefinition<this>>();
    extendsTypeExpressions = new ArrayExt<TypeExpression>();
    implementsTypeExpressions = new ArrayExt<TypeExpression>();

    constructor(mainFactory: MainFactory, node: INode) {
        super(DefinitionType.Class);

        this.fillName(node);
        this.fillExportable(node);
        this.fillDecorators(node);
        this.fillAmbientable(node);
        this.fillAbstractable(node);
        this.fillMembers(mainFactory, node);
        this.fillTypeParametersBySymbol(mainFactory, node);
        this.extendsTypeExpressions.push(...node.getSymbol().getExtendsTypeExpressions().map(typeExpression => mainFactory.getTypeExpression(typeExpression)));
        this.implementsTypeExpressions.push(...node.getImplementsTypeExpressions().map(typeExpression => mainFactory.getTypeExpression(typeExpression)));
        this.fillPropertiesFromConstructorDef();
    }

    write() {
        const writer = new CodeBlockWriter();
        const classWriter = new ClassWriter(writer, WriteFlags.Default);
        classWriter.write(this);
        return writer.toString();
    }

    addProperty(prop: ClassPropertyStructure) {
        this.properties.push(new ClassPropertyDefinition(new MainFactory(), new StructureNode(prop), this));
    }

    private fillMembers(mainFactory: MainFactory, node: INode) {
        node.forEachChild(childNode => {
            const def = this.getMemberDefinition(mainFactory, childNode);

            if (def != null) {
                this.addDefinition(def);
            }
        });
    }

    private fillPropertiesFromConstructorDef() {
        if (this.constructorDef != null) {
            this.constructorDef.parameters.forEach(param => {
                if (param.scope !== ClassConstructorParameterScope.None) {
                    this.addProperty({
                        name: param.name,
                        isConstructorParameter: true,
                        scope: ClassConstructorParameterScope.toScope(param.scope),
                        type: param.typeExpression.text,
                        isOptional: param.isOptional,
                        defaultExpression: param.defaultExpression != null ? param.defaultExpression.text : null,
                        decorators: param.decorators.map(decorator => {
                            return {
                                name: decorator.name,
                                arguments: decorator.arguments.map(arg => arg.text)
                            };
                        })
                    });
                }
            });
        }
    }

    private getMemberDefinition(mainFactory: MainFactory, childNode: INode): ClassMemberDefinitions {
        return tryGet(childNode, () => {
            if (childNode.isMethodDeclaration()) {
                if (childNode.hasStaticKeyword()) {
                    return new ClassStaticMethodDefinition(mainFactory, childNode, this);
                }
                else {
                    return new ClassMethodDefinition(mainFactory, childNode, this);
                }
            }
            else if (childNode.isPropertyDeclaration() || childNode.isGetAccessor()) {
                if (childNode.hasStaticKeyword()) {
                    return new ClassStaticPropertyDefinition(mainFactory, childNode, this);
                }
                else {
                    return new ClassPropertyDefinition(mainFactory, childNode, this);
                }
            }
            else if (childNode.isConstructor()) {
                return new ClassConstructorDefinition(mainFactory, childNode, this);
            }
            else if (childNode.isSetAccessor()) {
                // ignore, GetAccessor is the one that will be handled
            }
            else if (childNode.isIdentifier()) {
                // ignore, it's the class identifier
            }
            else if (childNode.isTypeParameter()) {
                // ignore, handled elsewhere
            }
            else if (childNode.isExportKeyword()) {
                // ignore, handled elsewhere
            }
            else if (childNode.isDefaultKeyword()) {
                // ignore, handled elsewhere
            }
            else {
                Logger.warn(`Unknown class child kind: ${childNode.nodeKindToString()}`);
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
            Logger.warn(`Unknown member definition for class.`);
        }
    }

    // NamedDefinition
    name: string;
    fillName: (node: INode) => void;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // DecoratableDefinition
    decorators: ArrayExt<DecoratorDefinition<this>>;
    fillDecorators: (node: INode) => void;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    fillExportable: (node: INode) => void;
    // TypeParameteredDefinition
    fillTypeParametersBySymbol: (mainFactory: MainFactory, node: INode) => void;
    fillTypeParametersBySignature: (mainFactory: MainFactory, signature: ISignature) => void;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    fillAmbientable: (node: INode) => void;
    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (node: INode) => void;
}

applyMixins(ClassDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
