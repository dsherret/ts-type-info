import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {applyMixins} from "./../../utils";
import {BaseDefinition, NamedDefinition, ParentedDefinition, DecoratableDefinition,
        AmbientableDefinition, ExportableDefinition, TypeParameteredDefinition,
        AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {ClassMethodStructure, ClassPropertyStructure, ClassConstructorStructure} from "./../../structures";
import {TypeExpressionDefinition} from "./../expressions";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
import {ClassConstructorParameterScope} from "./ClassConstructorParameterScope";
import {ClassMethodDefinition} from "./ClassMethodDefinition";
import {ClassPropertyDefinition} from "./ClassPropertyDefinition";
import {ClassStaticMethodDefinition} from "./ClassStaticMethodDefinition";
import {ClassStaticPropertyDefinition} from "./ClassStaticPropertyDefinition";

type ClassMemberDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export class ClassDefinition extends BaseDefinition implements NamedDefinition, ParentedDefinition<ModuledDefinitions>, DecoratableDefinition,
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
        const classWriter = new ClassWriter(writer, WriteFlags.Default);
        classWriter.write(this);
        return writer.toString();
    }

    addMethods(...methods: ClassMethodStructure[]) {
        const factory = new StructureFactory();
        methods.forEach(method => {
            const def = factory.getClassMethod(method);
            def.parent = this;
            this.methods.push(def);
        });
        return this;
    }

    addProperties(...properties: ClassPropertyStructure[]) {
        const factory = new StructureFactory();
        properties.forEach(prop => {
            const def = factory.getClassProperty(prop);
            def.parent = this;
            this.properties.push(def);
        });
        return this;
    }

    addExtends(...texts: string[]) {
        const factory = new StructureFactory();
        texts.forEach(text => {
            this.extendsTypeExpressions.push(factory.getTypeExpressionFromText(text));
        });
        return this;
    }

    addImplements(...texts: string[]) {
        const factory = new StructureFactory();
        texts.forEach(text => {
            this.implementsTypeExpressions.push(factory.getTypeExpressionFromText(text));
        });
        return this;
    }

    setConstructor(structure: ClassConstructorStructure) {
        const factory = new StructureFactory();
        this.constructorDef = factory.getClassConstructor(structure);
        this.constructorDef.parent = this;
        this.properties = this.properties.filter(p => !p.isConstructorParameter);
        this.properties.push(...this.constructorDef.parameters.filter(p => p.scope !== ClassConstructorParameterScope.None).map(p => {
            const prop = p.toProperty();
            prop.parent = this;
            return prop;
        }));
        return this;
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassDefinition, BaseDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
