import {StructureClassConstructorBinder, StructureClassMethodBinder, StructureClassPropertyBinder, StructureClassStaticMethodBinder,
    StructureClassStaticPropertyBinder, StructureExpressionBinder, StructureDecoratorBinder, StructureEnumMemberBinder,
    StructureTypeParameterBinder} from "./../binders";
import {ClassConstructorDefinition, ClassMethodDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition,
    TypeExpressionDefinition, DecoratorDefinition, EnumMemberDefinition, ExpressionDefinition, TypeParameterDefinition} from "./../definitions";
import {ClassMethodStructure, ClassConstructorStructure, ClassPropertyStructure, ClassStaticMethodStructure, ClassStaticPropertyStructure,
    DecoratorStructure, EnumMemberStructure, TypeParameterStructure} from "./../structures";

export class StructureFactory {
    getClassConstructor(structure: ClassConstructorStructure) {
        const def = new ClassConstructorDefinition();
        const binder = new StructureClassConstructorBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getClassMethod(structure: ClassMethodStructure) {
        const def = new ClassMethodDefinition();
        const binder = new StructureClassMethodBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getClassProperty(structure: ClassPropertyStructure) {
        const def = new ClassPropertyDefinition();
        const binder = new StructureClassPropertyBinder(structure);
        binder.bind(def);
        return def;
    }

    getClassStaticMethod(structure: ClassStaticMethodStructure) {
        const def = new ClassStaticMethodDefinition();
        const binder = new StructureClassStaticMethodBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getClassStaticProperty(structure: ClassStaticPropertyStructure) {
        const def = new ClassStaticPropertyDefinition();
        const binder = new StructureClassStaticPropertyBinder(structure);
        binder.bind(def);
        return def;
    }

    getDecorator(structure: DecoratorStructure) {
        const def = new DecoratorDefinition();
        const binder = new StructureDecoratorBinder(structure);
        binder.bind(def);
        return def;
    }

    getEnumMember(structure: EnumMemberStructure) {
        const def = new EnumMemberDefinition();
        const binder = new StructureEnumMemberBinder(structure);
        binder.bind(def);
        return def;
    }

    getExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            const def = new ExpressionDefinition();
            const binder = new StructureExpressionBinder(text);
            binder.bind(def);
            return def;
        }
    }

    getTypeExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            const def = new TypeExpressionDefinition();
            const binder = new StructureExpressionBinder(text);
            binder.bind(def);
            return def;
        }
    }

    getTypeParameter(structure: TypeParameterStructure) {
        const def = new TypeParameterDefinition();
        const binder = new StructureTypeParameterBinder(this, structure);
        binder.bind(def);
        return def;
    }
}
