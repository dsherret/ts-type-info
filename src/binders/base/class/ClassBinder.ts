import {ClassDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassPropertyDefinition, ClassStaticPropertyDefinition,
    ClassConstructorDefinition, ClassConstructorParameterScope, TypeExpressionDefinition} from "./../../../definitions";
import {IBaseBinder} from "./../IBaseBinder";
import {NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder, AbstractableBinder, DecoratableBinder} from "./../base";

export class ClassMemberContainer {
    constructorDef: ClassConstructorDefinition;
    methods: ClassMethodDefinition[] = [];
    properties: ClassPropertyDefinition[] = [];
    staticMethods: ClassStaticMethodDefinition[] = [];
    staticProperties: ClassStaticPropertyDefinition[] = [];
}

export abstract class ClassBinder implements IBaseBinder {
    constructor(
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
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.abstractableBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.bindMembers(def);
        def.extendsTypeExpressions.push(...this.getExtendsTypeExpressions());
        def.implementsTypeExpressions.push(...this.getImplementsTypeExpressions());
        this.fillPropertiesFromConstructorDef(def);
    }

    private bindMembers(def: ClassDefinition) {
        const container = this.getMembers();

        def.constructorDef = container.constructorDef;
        def.methods.push(...container.methods);
        def.properties.push(...container.properties);
        def.staticMethods.push(...container.staticMethods);
        def.staticProperties.push(...container.staticProperties);
    }

    private fillPropertiesFromConstructorDef(def: ClassDefinition) {
        if (def.constructorDef != null) {
            def.constructorDef.parameters.forEach(param => {
                if (param.scope !== ClassConstructorParameterScope.None) {
                    def.properties.push(param.toProperty());
                }
            });
        }
    }
}
