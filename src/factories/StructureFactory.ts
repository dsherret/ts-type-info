import {StructureCallSignatureParameterBinder, StructureClassBinder, StructureClassConstructorBinder, StructureClassConstructorParameterBinder, StructureClassMethodBinder,
    StructureClassMethodParameterBinder, StructureClassPropertyBinder, StructureClassStaticMethodBinder, StructureClassStaticMethodParameterBinder, StructureClassStaticPropertyBinder,
    StructureDecoratorBinder, StructureEnumBinder, StructureEnumMemberBinder, StructureExpressionBinder, StructureFunctionBinder, StructureFunctionParameterBinder,
    StructureInterfaceBinder, StructureInterfaceMethodBinder, StructureInterfaceMethodParameterBinder, StructureInterfaceNewSignatureParameterBinder,
    StructureInterfaceNewSignatureBinder, StructureInterfacePropertyBinder, StructureTypeAliasBinder, StructureTypeParameterBinder, StructureVariableBinder} from "./../binders";
import {CallSignatureParameterDefinition, ClassDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition, ClassMethodDefinition, ClassMethodParameterDefinition,
    ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticMethodParameterDefinition, ClassStaticPropertyDefinition, DecoratorDefinition, EnumDefinition, EnumMemberDefinition,
    ExpressionDefinition, FunctionDefinition, FunctionParameterDefinition, InterfaceDefinition, InterfaceMethodDefinition, InterfaceMethodParameterDefinition,
    InterfaceNewSignatureDefinition, InterfaceNewSignatureParameterDefinition, InterfacePropertyDefinition, TypeAliasDefinition, TypeExpressionDefinition, TypeParameterDefinition,
    VariableDefinition} from "./../definitions";
import {CallSignatureParameterStructure, ClassStructure, ClassConstructorStructure, ClassConstructorParameterStructure, ClassMethodStructure, ClassMethodParameterStructure,
    ClassPropertyStructure, ClassStaticMethodStructure, ClassStaticMethodParameterStructure, ClassStaticPropertyStructure, DecoratorStructure, EnumStructure,
    EnumMemberStructure, FunctionStructure, FunctionParameterStructure, InterfaceStructure, InterfaceMethodStructure, InterfaceMethodParameterStructure,
    InterfaceNewSignatureParameterStructure, InterfaceNewSignatureStructure, InterfacePropertyStructure, TypeAliasStructure, TypeParameterStructure,
    VariableStructure} from "./../structures";

export class StructureFactory {
    getCallSignatureParameter(structure: CallSignatureParameterStructure) {
        const def = new CallSignatureParameterDefinition();
        const binder = new StructureCallSignatureParameterBinder(structure);
        binder.bind(def);
        return def;
    }

    getClass(structure: ClassStructure) {
        const def = new ClassDefinition();
        const binder = new StructureClassBinder(this, structure);
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

    getEnum(structure: EnumStructure) {
        const def = new EnumDefinition();
        const binder = new StructureEnumBinder(this, structure);
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
        else {
            return null;
        }
    }

    getFunction(structure: FunctionStructure) {
        const def = new FunctionDefinition();
        const binder = new StructureFunctionBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getFunctionParameter(structure: FunctionParameterStructure) {
        const def = new FunctionParameterDefinition();
        const binder = new StructureFunctionParameterBinder(structure);
        binder.bind(def);
        return def;
    }

    getInterface(structure: InterfaceStructure) {
        const def = new InterfaceDefinition();
        const binder = new StructureInterfaceBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getInterfaceMethod(structure: InterfaceMethodStructure) {
        const def = new InterfaceMethodDefinition();
        const binder = new StructureInterfaceMethodBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getInterfaceNewSignature(structure: InterfaceNewSignatureStructure) {
        const def = new InterfaceNewSignatureDefinition();
        const binder = new StructureInterfaceNewSignatureBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getInterfaceProperty(structure: InterfacePropertyStructure) {
        const def = new InterfacePropertyDefinition();
        const binder = new StructureInterfacePropertyBinder(structure);
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

    getTypeAlias(structure: TypeAliasStructure) {
        const def = new TypeAliasDefinition();
        const binder = new StructureTypeAliasBinder(this, structure);
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
        else {
            return null;
        }
    }

    getTypeParameter(structure: TypeParameterStructure) {
        const def = new TypeParameterDefinition();
        const binder = new StructureTypeParameterBinder(this, structure);
        binder.bind(def);
        return def;
    }

    getVariable(structure: VariableStructure) {
        const def = new VariableDefinition();
        const binder = new StructureVariableBinder(structure);
        binder.bind(def);
        return def;
    }
}
