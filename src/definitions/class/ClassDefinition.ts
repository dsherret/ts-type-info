import CodeBlockWriter from "code-block-writer";
import {ModuledDefinitions} from "./../../definitions";
import {StructureClassPropertyBinder} from "./../../binders";
import {applyMixins} from "./../../utils";
import {BaseDefinition, NamedDefinition, ParentedDefinition, DecoratableDefinition,
        AmbientableDefinition, ExportableDefinition, TypeParameteredDefinition,
        AbstractableDefinition, DefinitionType} from "./../base";
import {TypeParameterDefinition, DecoratorDefinition} from "./../general";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {ClassPropertyStructure} from "./../../structures";
import {TypeExpressionDefinition} from "./../expressions";
import {ClassConstructorDefinition} from "./ClassConstructorDefinition";
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

    addProperty(prop: ClassPropertyStructure) {
        const def = new ClassPropertyDefinition();
        const binder = new StructureClassPropertyBinder(prop);
        binder.bind(def);
        def.parent = this;
        this.properties.push(def);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ModuledDefinitions;
    // DecoratableDefinition
    decorators: DecoratorDefinition<this>[];
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition<this>[];
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassDefinition, BaseDefinition, [NamedDefinition, DecoratableDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, AbstractableDefinition]);
