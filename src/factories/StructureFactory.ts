import {StructureCallSignatureParameterBinder, StructureClassConstructorBinder, StructureClassConstructorParameterBinder, StructureClassMethodBinder,
    StructureClassMethodParameterBinder, StructureClassPropertyBinder, StructureClassStaticMethodBinder, StructureClassStaticMethodParameterBinder, StructureClassStaticPropertyBinder,
    StructureDecoratorBinder, StructureEnumMemberBinder, StructureExpressionBinder, StructureFunctionParameterBinder, StructureInterfaceMethodParameterBinder,
    StructureInterfaceNewSignatureParameterBinder, StructureTypeParameterBinder} from "./../binders";
import {CallSignatureParameterDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition, ClassMethodDefinition, ClassMethodParameterDefinition,
    ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticMethodParameterDefinition, ClassStaticPropertyDefinition, DecoratorDefinition, EnumMemberDefinition,
    ExpressionDefinition, FunctionParameterDefinition, InterfaceMethodParameterDefinition, InterfaceNewSignatureParameterDefinition, TypeExpressionDefinition,
    TypeParameterDefinition} from "./../definitions";
import {CallSignatureParameterStructure, ClassConstructorStructure, ClassConstructorParameterStructure, ClassMethodStructure, ClassMethodParameterStructure,
    ClassPropertyStructure, ClassStaticMethodStructure, ClassStaticMethodParameterStructure, ClassStaticPropertyStructure, DecoratorStructure, EnumMemberStructure,
    InterfaceMethodParameterStructure, InterfaceNewSignatureParameterStructure, FunctionParameterStructure, TypeParameterStructure} from "./../structures";

export class StructureFactory {
    getCallSignatureParameter(structure: CallSignatureParameterStructure) {
        const def = new CallSignatureParameterDefinition();
        const binder = new StructureCallSignatureParameterBinder(structure);
        binder.bind(def);
        return def;
    }

    getClassConstructor(structure: ClassConstructorStructure) {
        const def = new ClassConstructorDefinition();
        const binder = new StructureClassConstructorBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getClassConstructorParameter(structure: ClassConstructorParameterStructure) {
        const def = new ClassConstructorParameterDefinition();
        const binder = new StructureClassConstructorParameterBinder(structure);
        binder.bind(def);
        return def;
    }

    getClassMethod(structure: ClassMethodStructure) {
        const def = new ClassMethodDefinition();
        const binder = new StructureClassMethodBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getClassMethodParameter(structure: ClassMethodParameterStructure) {
        const def = new ClassMethodParameterDefinition();
        const binder = new StructureClassMethodParameterBinder(structure);
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

    getClassStaticMethodParameter(structure: ClassStaticMethodParameterStructure) {
        const def = new ClassStaticMethodParameterDefinition();
        const binder = new StructureClassStaticMethodParameterBinder(structure);
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

    getFunctionParameter(structure: FunctionParameterStructure) {
        const def = new FunctionParameterDefinition();
        const binder = new StructureFunctionParameterBinder(structure);
        binder.bind(def);
        return def;
    }

    getInterfaceMethodParameter(structure: InterfaceMethodParameterStructure) {
        const def = new InterfaceMethodParameterDefinition();
        const binder = new StructureInterfaceMethodParameterBinder(structure);
        binder.bind(def);
        return def;
    }

    getInterfaceNewSignatureParameter(structure: InterfaceNewSignatureParameterStructure) {
        const def = new InterfaceNewSignatureParameterDefinition();
        const binder = new StructureInterfaceNewSignatureParameterBinder(structure);
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
