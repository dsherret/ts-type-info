import {MainFactory, StructureFactory} from "./../../factories";
import {ClassMethodStructure, ClassPropertyStructure, ClassConstructorStructure, DecoratorStructure, TypeParameterStructure,
    ClassStaticMethodStructure, ClassStaticPropertyStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {BaseDefinition, NamedDefinition, DecoratableDefinition, AmbientableDefinition, ExportableDefinition, TypeParameteredDefinition,
        AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {TypeDefinition} from "./../expression";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";
import {ClassMethodDefinition} from "./ClassMethodDefinition";
import {ClassPropertyDefinition} from "./ClassPropertyDefinition";
import {ClassStaticMethodDefinition} from "./ClassStaticMethodDefinition";
import {ClassStaticPropertyDefinition} from "./ClassStaticPropertyDefinition";

export class ClassDefinition extends BaseDefinition implements NamedDefinition, DecoratableDefinition,
                                        ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition {
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
    constructorDef: ClassConstructorDefinition;
    extendsTypes: TypeDefinition[] = [];
    implementsTypes: TypeDefinition[] = [];

    constructor() {
        super(DefinitionType.Class);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
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
        this.extendsTypes.push(...texts.map(t => factory.getTypeFromText(t)));
        return this;
    }

    addImplements(...texts: string[]) {
        const factory = new StructureFactory();
        this.implementsTypes.push(...texts.map(t => factory.getTypeFromText(t)));
        return this;
    }

    getPropertiesAndConstructorParameters() {
        return [
            ...(this.constructorDef == null ? [] : this.constructorDef.parameters.filter(p => p.scope !== ClassConstructorParameterScope.None)),
            ...this.properties
        ];
    }

    getMethod(nameOrSearchFunction: string | ((method: ClassMethodDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.methods, nameOrSearchFunction);
    }

    getStaticMethod(nameOrSearchFunction: string | ((staticMethod: ClassStaticMethodDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.staticMethods, nameOrSearchFunction);
    }

    getProperty(nameOrSearchFunction: string | ((property: ClassPropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.properties, nameOrSearchFunction);
    }

    getStaticProperty(nameOrSearchFunction: string | ((staticProperty: ClassStaticPropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.staticProperties, nameOrSearchFunction);
    }

    setConstructor(structure: ClassConstructorStructure) {
        this.constructorDef = new StructureFactory().getClassConstructor(structure);
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
