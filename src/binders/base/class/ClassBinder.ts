import * as definitions from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder, AbstractableBinder, DecoratableBinder} from "./../base";

export class ClassMemberContainer {
    constructorDef: definitions.ClassConstructorDefinition;
    methods: definitions.ClassMethodDefinition[] = [];
    properties: definitions.ClassPropertyDefinition[] = [];
    staticMethods: definitions.ClassStaticMethodDefinition[] = [];
    staticProperties: definitions.ClassStaticPropertyDefinition[] = [];
}

export abstract class ClassBinder implements IBaseBinder {
    constructor(
        private baseDefinitionBinder: BaseDefinitionBinder,
        private namedBinder: NamedBinder,
        private exportableBinder: ExportableBinder,
        private ambientableBinder: AmbientableBinder,
        private typeParameteredBinder: TypeParameteredBinder,
        private abstractableBinder: AbstractableBinder,
        private decoratableBinder: DecoratableBinder
    ) {
    }

    abstract getMembers(): ClassMemberContainer;
    abstract getExtendsTypes(): definitions.TypeDefinition[];
    abstract getImplementsTypes(): definitions.TypeDefinition[];

    bind(def: definitions.ClassDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.abstractableBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.bindMembers(def);
        def.extendsTypes.push(...this.getExtendsTypes());
        def.implementsTypes.push(...this.getImplementsTypes());
    }

    private bindMembers(def: definitions.ClassDefinition) {
        const container = this.getMembers();

        def.constructorDef = container.constructorDef;
        def.methods.push(...container.methods);
        def.properties.push(...container.properties);
        def.staticMethods.push(...container.staticMethods);
        def.staticProperties.push(...container.staticProperties);
    }
}
