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
import {InterfaceDefinition} from "./../interface";
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

    addMethod(structure: ClassMethodStructure) {
        const def = new StructureFactory().getClassMethod(structure);
        this.methods.push(def);
        return def;
    }

    addProperty(structure: ClassPropertyStructure) {
        const def = new StructureFactory().getClassProperty(structure);
        this.properties.push(def);
        return def;
    }

    addStaticMethod(structure: ClassStaticMethodStructure) {
        const def = new StructureFactory().getClassStaticMethod(structure);
        this.staticMethods.push(def);
        return def;
    }

    addStaticProperty(structure: ClassStaticPropertyStructure) {
        const def = new StructureFactory().getClassStaticProperty(structure);
        this.staticProperties.push(def);
        return def;
    }

    addExtends(definition: ClassDefinition, typeArguments?: string[]): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addExtends(textOrDefinition: string | ClassDefinition, typeArguments: string[] = []) {
        const def = DefinitionUtils.getTypeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        if (def != null) {
            this.extendsTypes.push(def);
        }
        return def;
    }

    addImplements(definition: InterfaceDefinition | ClassDefinition, typeArguments?: string[]): TypeDefinition;
    addImplements(text: string): TypeDefinition;
    addImplements(textOrDefinition: string | InterfaceDefinition | ClassDefinition, typeArguments: string[] = []) {
        const def = DefinitionUtils.getTypeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        if (def != null) {
            this.implementsTypes.push(def);
        }
        return def;
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
    addDecorator: (structure: DecoratorStructure) => DecoratorDefinition;
    getDecorator: (nameOrSearchFunction: string | ((decorator: DecoratorDefinition) => boolean)) => DecoratorDefinition;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassDefinition, BaseDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
