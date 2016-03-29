import {StructureClassConstructorBinder, StructureClassMethodBinder, StructureClassPropertyBinder, StructureExpressionBinder,
    StructureDecoratorBinder, StructureEnumMemberBinder, StructureTypeParameterBinder} from "./../binders";
import {ClassConstructorDefinition, ClassMethodDefinition, ClassPropertyDefinition, TypeExpressionDefinition,
    DecoratorDefinition, EnumMemberDefinition, TypeParameterDefinition} from "./../definitions";
import {ClassMethodStructure, ClassConstructorStructure, ClassPropertyStructure, DecoratorStructure, EnumMemberStructure,
    TypeParameterStructure} from "./../structures";

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
