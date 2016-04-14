import CodeBlockWriter from "code-block-writer";
import {StructureFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {BaseDefinition, NamedDefinition, DecoratableDefinition, AmbientableDefinition, ExportableDefinition, TypeParameteredDefinition,
        AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {ClassMethodStructure, ClassPropertyStructure, ClassConstructorStructure, DecoratorStructure, TypeParameterStructure,
    ClassStaticMethodStructure, ClassStaticPropertyStructure} from "./../../structures";
import {TypeExpressionDefinition} from "./../expressions";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";
import {ClassMethodDefinition} from "./ClassMethodDefinition";
import {ClassPropertyDefinition} from "./ClassPropertyDefinition";
import {ClassStaticMethodDefinition} from "./ClassStaticMethodDefinition";
import {ClassStaticPropertyDefinition} from "./ClassStaticPropertyDefinition";

type ClassMemberDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export class ClassDefinition extends BaseDefinition implements NamedDefinition, DecoratableDefinition,
                                        ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition {
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
    constructorDef: ClassConstructorDefinition;
    extendsTypeExpressions: TypeExpressionDefinition[] = [];
    implementsTypeExpressions: TypeExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Class);
    }

    write() {
        const writer = new CodeBlockWriter();
        const classWriter = new ClassWriter(writer);
        classWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    addMethods(...methods: ClassMethodStructure[]) {
        const factory = new StructureFactory();
        this.methods.push(...methods.map(m => factory.getClassMethod(m)));
        return this;
    }

    addProperties(...properties: ClassPropertyStructure[]) {
        const factory = new StructureFactory();
        this.properties.push(...properties.map(p => factory.getClassProperty(p)));
        return this;
    }

    addStaticMethods(...staticMethods: ClassStaticMethodStructure[]) {
        const factory = new StructureFactory();
        this.staticMethods.push(...staticMethods.map(m => factory.getClassStaticMethod(m)));
        return this;
    }

    addStaticProperties(...staticProperties: ClassStaticPropertyStructure[]) {
        const factory = new StructureFactory();
        this.staticProperties.push(...staticProperties.map(p => factory.getClassStaticProperty(p)));
        return this;
    }

    addExtends(...texts: string[]) {
        const factory = new StructureFactory();
        this.extendsTypeExpressions.push(...texts.map(t => factory.getTypeExpressionFromText(t)));
        return this;
    }

    addImplements(...texts: string[]) {
        const factory = new StructureFactory();
        this.implementsTypeExpressions.push(...texts.map(t => factory.getTypeExpressionFromText(t)));
        return this;
    }

    setConstructor(structure: ClassConstructorStructure) {
        const factory = new StructureFactory();
        this.constructorDef = factory.getClassConstructor(structure);
        this.properties = this.properties.filter(p => !p.isConstructorParameter);
        this.properties.push(...this.constructorDef.parameters.filter(p => p.scope !== ClassConstructorParameterScope.None).map(p => p.toProperty()));
        return this;
    }

    // NamedDefinition
    name: string;
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    addDecorators: (...decorators: DecoratorStructure[]) => this;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassDefinition, BaseDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
