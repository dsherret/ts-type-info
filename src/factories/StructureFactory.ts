import {StructureCallSignatureBinder, StructureCallSignatureParameterBinder, StructureClassBinder, StructureClassConstructorBinder, StructureClassConstructorParameterBinder,
    StructureClassMethodBinder, StructureClassMethodParameterBinder, StructureClassPropertyBinder, StructureClassStaticMethodBinder, StructureClassStaticMethodParameterBinder,
    StructureClassStaticPropertyBinder, StructureDecoratorBinder, StructureEnumBinder, StructureEnumMemberBinder, StructureExpressionBinder, StructureFileBinder,
    StructureFunctionBinder, StructureFunctionParameterBinder, StructureImportBinder, StructureIndexSignatureBinder, StructureInterfaceBinder, StructureInterfaceMethodBinder,
    StructureInterfaceMethodParameterBinder, StructureInterfacePropertyBinder, StructureNamespaceBinder, StructureReExportBinder, StructureTypeAliasBinder,
    StructureTypeParameterBinder, StructureVariableBinder} from "./../binders";
import {BaseDefinition, CallSignatureDefinition, CallSignatureParameterDefinition, ClassDefinition, ClassConstructorDefinition, ClassConstructorParameterDefinition,
    ClassMethodDefinition, ClassMethodParameterDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticMethodParameterDefinition, ClassStaticPropertyDefinition,
    DecoratorDefinition, EnumDefinition, EnumMemberDefinition, ExpressionDefinition, FileDefinition, FunctionDefinition, FunctionParameterDefinition, ImportDefinition,
    ImportPartDefinition, IndexSignatureDefinition, InterfaceDefinition, InterfaceMethodDefinition, InterfaceMethodParameterDefinition, InterfacePropertyDefinition,
    NamespaceDefinition, ReExportDefinition, ReExportPartDefinition, TypeAliasDefinition, TypeExpressionDefinition, TypeParameterDefinition,
    VariableDefinition} from "./../definitions";
import {CallSignatureStructure, CallSignatureParameterStructure, ClassStructure, ClassConstructorStructure, ClassConstructorParameterStructure, ClassMethodStructure,
    ClassMethodParameterStructure, ClassPropertyStructure, ClassStaticMethodStructure, ClassStaticMethodParameterStructure, ClassStaticPropertyStructure, DecoratorStructure,
    EnumStructure, EnumMemberStructure, FileStructure, FunctionStructure, FunctionParameterStructure, ImportStructure, IndexSignatureStructure, InterfaceStructure,
    InterfaceMethodStructure, InterfaceMethodParameterStructure, InterfacePropertyStructure, NamedImportStructure, NamespaceStructure, ReExportStructure, TypeAliasStructure,
    TypeParameterStructure, VariableStructure} from "./../structures";
import {StringUtils} from "./../utils";

function bindToDefinition<DefType extends BaseDefinition>(binder: { bind(def: DefType): void; }, def: DefType) {
    binder.bind(def);
    return def;
}

export class StructureFactory {
    getCallSignature(structure: CallSignatureStructure) {
        return bindToDefinition(new StructureCallSignatureBinder(this, structure), new CallSignatureDefinition());
    }

    getCallSignatureParameter(structure: CallSignatureParameterStructure) {
        return bindToDefinition(new StructureCallSignatureParameterBinder(structure), new CallSignatureParameterDefinition());
    }

    getClass(structure: ClassStructure) {
        return bindToDefinition(new StructureClassBinder(this, structure), new ClassDefinition());
    }

    getClassConstructor(structure: ClassConstructorStructure) {
        return bindToDefinition(new StructureClassConstructorBinder(this, structure), new ClassConstructorDefinition());
    }

    getClassConstructorParameter(structure: ClassConstructorParameterStructure) {
        return bindToDefinition(new StructureClassConstructorParameterBinder(structure), new ClassConstructorParameterDefinition());
    }

    getClassMethod(structure: ClassMethodStructure) {
        return bindToDefinition(new StructureClassMethodBinder(this, structure), new ClassMethodDefinition());
    }

    getClassMethodParameter(structure: ClassMethodParameterStructure) {
        return bindToDefinition(new StructureClassMethodParameterBinder(structure), new ClassMethodParameterDefinition());
    }

    getClassProperty(structure: ClassPropertyStructure) {
        return bindToDefinition(new StructureClassPropertyBinder(structure), new ClassPropertyDefinition());
    }

    getClassStaticMethod(structure: ClassStaticMethodStructure) {
        return bindToDefinition(new StructureClassStaticMethodBinder(this, structure), new ClassStaticMethodDefinition());
    }

    getClassStaticMethodParameter(structure: ClassStaticMethodParameterStructure) {
        return bindToDefinition(new StructureClassStaticMethodParameterBinder(structure), new ClassStaticMethodParameterDefinition());
    }

    getClassStaticProperty(structure: ClassStaticPropertyStructure) {
        return bindToDefinition(new StructureClassStaticPropertyBinder(structure), new ClassStaticPropertyDefinition());
    }

    getDecorator(structure: DecoratorStructure) {
        return bindToDefinition(new StructureDecoratorBinder(structure), new DecoratorDefinition());
    }

    getEnum(structure: EnumStructure) {
        return bindToDefinition(new StructureEnumBinder(this, structure), new EnumDefinition());
    }

    getEnumMember(structure: EnumMemberStructure) {
        return bindToDefinition(new StructureEnumMemberBinder(structure), new EnumMemberDefinition());
    }

    getExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            return bindToDefinition(new StructureExpressionBinder(text), new ExpressionDefinition());
        }
        else {
            return null;
        }
    }

    getFile(structure: FileStructure) {
        return bindToDefinition(new StructureFileBinder(this, structure), new FileDefinition());
    }

    getFunction(structure: FunctionStructure) {
        return bindToDefinition(new StructureFunctionBinder(this, structure), new FunctionDefinition());
    }

    getFunctionParameter(structure: FunctionParameterStructure) {
        return bindToDefinition(new StructureFunctionParameterBinder(structure), new FunctionParameterDefinition());
    }

    getImport(structure: ImportStructure) {
        return bindToDefinition(new StructureImportBinder(this, structure), new ImportDefinition());
    }

    getImportPart(importName: string) {
        return this.getImportPartByNamedImport({ name: importName });
    }

    getImportPartByNamedImport(namedImport: NamedImportStructure) {
        const def = new ImportPartDefinition();

        if (StringUtils.isNullOrWhiteSpace(namedImport.alias)) {
            def.importName = namedImport.name;
        }
        else {
            def.importName = namedImport.alias;
            def.definitions.push({
                name: namedImport.name
            } as ClassDefinition); // this is a bit of a hack
        }

        def.expression = null;

        return def;
    }

    getIndexSignature(structure: IndexSignatureStructure) {
        return bindToDefinition(new StructureIndexSignatureBinder(this, structure), new IndexSignatureDefinition());
    }

    getReExport(structure: ReExportStructure) {
        return bindToDefinition(new StructureReExportBinder(this, structure), new ReExportDefinition());
    }

    getReExportPart(exportName: string) {
        const def = new ReExportPartDefinition();
        def.exportName = exportName;
        return def;
    }

    getReExportPartByNamedImport(namedImport: NamedImportStructure) {
        const def = new ReExportPartDefinition();

        if (StringUtils.isNullOrWhiteSpace(namedImport.alias)) {
            def.exportName = namedImport.name;
        }
        else {
            def.exportName = namedImport.alias;
            def.definitions.push({
                name: namedImport.name
            } as ClassDefinition); // this is a bit of a hack
        }

        return def;
    }

    getInterface(structure: InterfaceStructure) {
        return bindToDefinition(new StructureInterfaceBinder(this, structure), new InterfaceDefinition());
    }

    getInterfaceMethod(structure: InterfaceMethodStructure) {
        return bindToDefinition(new StructureInterfaceMethodBinder(this, structure), new InterfaceMethodDefinition());
    }

    getInterfaceProperty(structure: InterfacePropertyStructure) {
        return bindToDefinition(new StructureInterfacePropertyBinder(structure), new InterfacePropertyDefinition());
    }

    getInterfaceMethodParameter(structure: InterfaceMethodParameterStructure) {
        return bindToDefinition(new StructureInterfaceMethodParameterBinder(structure), new InterfaceMethodParameterDefinition());
    }

    getNamespace(structure: NamespaceStructure) {
        return bindToDefinition(new StructureNamespaceBinder(this, structure), new NamespaceDefinition());
    }

    getTypeAlias(structure: TypeAliasStructure) {
        return bindToDefinition(new StructureTypeAliasBinder(this, structure), new TypeAliasDefinition());
    }

    getTypeExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            return bindToDefinition<TypeExpressionDefinition>(new StructureExpressionBinder(text), new TypeExpressionDefinition());
        }
        else {
            return null;
        }
    }

    getTypeParameter(structure: TypeParameterStructure) {
        return bindToDefinition(new StructureTypeParameterBinder(this, structure), new TypeParameterDefinition());
    }

    getVariable(structure: VariableStructure) {
        return bindToDefinition(new StructureVariableBinder(structure), new VariableDefinition());
    }
}
