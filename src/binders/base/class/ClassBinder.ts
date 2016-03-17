import {ClassDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassPropertyDefinition, ClassStaticPropertyDefinition,
    ClassConstructorDefinition, ClassConstructorParameterScope, TypeExpressionDefinition} from "./../../../definitions";
import {Logger} from "./../../../utils";
import {IBaseBinder} from "./../IBaseBinder";
import {NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder, AbstractableBinder, DecoratableBinder} from "./../base";

type ClassMemberDefinitions = ClassMethodDefinition | ClassStaticMethodDefinition | ClassPropertyDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

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

    abstract getMembers(): ClassMemberDefinitions[];
    abstract getExtendsTypeExpressions(): TypeExpressionDefinition[];
    abstract getImplementsTypeExpressions(): TypeExpressionDefinition[];

    bind(def: ClassDefinition) {
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.abstractableBinder.bind(def);
        this.decoratableBinder.bind(def);
        this.getMembers().forEach(memberDef => this.bindMember(def, memberDef));
        def.extendsTypeExpressions.push(...this.getExtendsTypeExpressions());
        def.implementsTypeExpressions.push(...this.getImplementsTypeExpressions());
        this.fillPropertiesFromConstructorDef(def);
    }

    private bindMember(def: ClassDefinition, member: ClassMemberDefinitions) {
        if (member.isClassPropertyDefinition()) {
            def.properties.push(member);
        }
        else if (member.isClassMethodDefinition()) {
            def.methods.push(member);
        }
        else if (member.isClassStaticPropertyDefinition()) {
            def.staticProperties.push(member);
        }
        else if (member.isClassStaticMethodDefinition()) {
            def.staticMethods.push(member);
        }
        else if (member.isClassConstructorDefinition()) {
            def.constructorDef = member;
        }
        else {
            Logger.warn(`Unknown member member for class.`);
            return;
        }

        member.parent = def;
    }

    private fillPropertiesFromConstructorDef(def: ClassDefinition) {
        if (def.constructorDef != null) {
            def.constructorDef.parameters.forEach(param => {
                if (param.scope !== ClassConstructorParameterScope.None) {
                    def.addProperty({
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
}
