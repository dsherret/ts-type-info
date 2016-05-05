import {ClassDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassPropertyDefinition, ClassStaticPropertyDefinition,
    ClassConstructorDefinition, TypeExpressionDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder, AbstractableBinder, DecoratableBinder} from "./../base";

export class ClassMemberContainer {
    constructorDef: ClassConstructorDefinition;
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
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
    abstract getExtendsTypeExpressions(): TypeExpressionDefinition[];
    abstract getImplementsTypeExpressions(): TypeExpressionDefinition[];

    bind(def: ClassDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.abstractableBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.bindMembers(def);
        def.extendsTypeExpressions.push(...this.getExtendsTypeExpressions());
        def.implementsTypeExpressions.push(...this.getImplementsTypeExpressions());
    }

    private bindMembers(def: ClassDefinition) {
        const container = this.getMembers();

        def.constructorDef = container.constructorDef;
        def.methods.push(...container.methods);
        def.properties.push(...container.properties);
        def.staticMethods.push(...container.staticMethods);
        def.staticProperties.push(...container.staticProperties);
    }
}
