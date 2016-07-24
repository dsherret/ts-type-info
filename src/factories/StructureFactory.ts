import * as binders from "./../binders";
import * as definitions from "./../definitions";
import * as structures from "./../structures";
import {StringUtils} from "./../utils";

function bindToDefinition<DefType extends definitions.BaseDefinition>(binder: { bind(def: DefType): void; }, def: DefType) {
    binder.bind(def);
    return def;
}

export class StructureFactory {
    getCallSignature(structure: structures.CallSignatureStructure) {
        return bindToDefinition(new binders.StructureCallSignatureBinder(this, structure), new definitions.CallSignatureDefinition());
    }

    getCallSignatureParameter(structure: structures.CallSignatureParameterStructure) {
        return bindToDefinition(new binders.StructureCallSignatureParameterBinder(this, structure), new definitions.CallSignatureParameterDefinition());
    }

    getClass(structure: structures.ClassStructure) {
        return bindToDefinition(new binders.StructureClassBinder(this, structure), new definitions.ClassDefinition());
    }

    getClassConstructor(structure: structures.ClassConstructorStructure) {
        return bindToDefinition(new binders.StructureClassConstructorBinder(this, structure), new definitions.ClassConstructorDefinition());
    }

    getClassConstructorParameter(structure: structures.ClassConstructorParameterStructure) {
        return bindToDefinition(new binders.StructureClassConstructorParameterBinder(this, structure), new definitions.ClassConstructorParameterDefinition());
    }

    getClassMethod(structure: structures.ClassMethodStructure) {
        return bindToDefinition(new binders.StructureClassMethodBinder(this, structure), new definitions.ClassMethodDefinition());
    }

    getClassMethodParameter(structure: structures.ClassMethodParameterStructure) {
        return bindToDefinition(new binders.StructureClassMethodParameterBinder(this, structure), new definitions.ClassMethodParameterDefinition());
    }

    getClassProperty(structure: structures.ClassPropertyStructure) {
        return bindToDefinition(new binders.StructureClassPropertyBinder(this, structure), new definitions.ClassPropertyDefinition());
    }

    getClassStaticMethod(structure: structures.ClassStaticMethodStructure) {
        return bindToDefinition(new binders.StructureClassStaticMethodBinder(this, structure), new definitions.ClassStaticMethodDefinition());
    }

    getClassStaticMethodParameter(structure: structures.ClassStaticMethodParameterStructure) {
        return bindToDefinition(new binders.StructureClassStaticMethodParameterBinder(this, structure), new definitions.ClassStaticMethodParameterDefinition());
    }

    getClassStaticProperty(structure: structures.ClassStaticPropertyStructure) {
        return bindToDefinition(new binders.StructureClassStaticPropertyBinder(this, structure), new definitions.ClassStaticPropertyDefinition());
    }

    getDecorator(structure: structures.DecoratorStructure) {
        return bindToDefinition(new binders.StructureDecoratorBinder(this, structure), new definitions.DecoratorDefinition());
    }

    getEnum(structure: structures.EnumStructure) {
        return bindToDefinition(new binders.StructureEnumBinder(this, structure), new definitions.EnumDefinition());
    }

    getEnumMember(structure: structures.EnumMemberStructure) {
        return bindToDefinition(new binders.StructureEnumMemberBinder(structure), new definitions.EnumMemberDefinition());
    }

    getExpressionFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            return bindToDefinition(new binders.StructureExpressionBinder(text), new definitions.ExpressionDefinition());
        }
        else {
            return null;
        }
    }

    getFile(structure: structures.FileStructure) {
        return bindToDefinition(new binders.StructureFileBinder(this, structure), new definitions.FileDefinition());
    }

    getFunction(structure: structures.FunctionStructure) {
        return bindToDefinition(new binders.StructureFunctionBinder(this, structure), new definitions.FunctionDefinition());
    }

    getFunctionParameter(structure: structures.FunctionParameterStructure) {
        return bindToDefinition(new binders.StructureFunctionParameterBinder(this, structure), new definitions.FunctionParameterDefinition());
    }

    getImport(structure: structures.ImportStructure) {
        return bindToDefinition(new binders.StructureImportBinder(this, structure), new definitions.ImportDefinition());
    }

    getImportPartByImportName(importName: string) {
        const def = new definitions.ImportPartDefinition();
        def.importName = importName;
        return def;
    }

    getImportPartByNamedImport(namedImport: structures.NamedImportStructureTypes) {
        const def = new definitions.ImportPartDefinition();

        if (!StringUtils.isNullOrWhiteSpace(namedImport.alias)) {
            def.importName = namedImport.alias;
        }

        this.fillNamedImportDetails(def, namedImport);

        return def;
    }

    getIndexSignature(structure: structures.IndexSignatureStructure) {
        return bindToDefinition(new binders.StructureIndexSignatureBinder(this, structure), new definitions.IndexSignatureDefinition());
    }

    getReExport(structure: structures.ReExportStructure) {
        return bindToDefinition(new binders.StructureReExportBinder(this, structure), new definitions.ReExportDefinition());
    }

    getNamedImportPart(structure: structures.NamedImportPartStructure) {
        return bindToDefinition(new binders.StructureNamedImportPartBinder(structure), new definitions.NamedImportPartDefinition());
    }

    getInterface(structure: structures.InterfaceStructure) {
        return bindToDefinition(new binders.StructureInterfaceBinder(this, structure), new definitions.InterfaceDefinition());
    }

    getInterfaceMethod(structure: structures.InterfaceMethodStructure) {
        return bindToDefinition(new binders.StructureInterfaceMethodBinder(this, structure), new definitions.InterfaceMethodDefinition());
    }

    getInterfaceProperty(structure: structures.InterfacePropertyStructure) {
        return bindToDefinition(new binders.StructureInterfacePropertyBinder(this, structure), new definitions.InterfacePropertyDefinition());
    }

    getInterfaceMethodParameter(structure: structures.InterfaceMethodParameterStructure) {
        return bindToDefinition(new binders.StructureInterfaceMethodParameterBinder(this, structure), new definitions.InterfaceMethodParameterDefinition());
    }

    getNamespace(structure: structures.NamespaceStructure) {
        return bindToDefinition(new binders.StructureNamespaceBinder(this, structure), new definitions.NamespaceDefinition());
    }

    getObjectProperty(structure: structures.ObjectPropertyStructure) {
        return bindToDefinition(new binders.StructureObjectPropertyBinder(this, structure), new definitions.ObjectPropertyDefinition());
    }

    getTypeAlias(structure: structures.TypeAliasStructure) {
        return bindToDefinition(new binders.StructureTypeAliasBinder(this, structure), new definitions.TypeAliasDefinition());
    }

    getTypeFromDefinitionAndTypeArguments(definition: definitions.NamedDefinition, typeArguments: string[]) {
        let text = definition.name || "";

        if (typeArguments.length > 0) {
            text += `<${typeArguments.join(", ")}>`;
        }

        return this.getTypeFromText(text);
    }

    getTypeFromText(text: string) {
        if (typeof text === "string" && text.length > 0) {
            return bindToDefinition<definitions.TypeDefinition>(new binders.StructureTypeBinder(this, text), new definitions.TypeDefinition());
        }
        else {
            return null;
        }
    }

    getTypeParameter(structure: structures.TypeParameterStructure) {
        return bindToDefinition(new binders.StructureTypeParameterBinder(this, structure), new definitions.TypeParameterDefinition());
    }

    getVariable(structure: structures.VariableStructure) {
        return bindToDefinition(new binders.StructureVariableBinder(this, structure), new definitions.VariableDefinition());
    }

    private fillNamedImportDetails(def: definitions.ImportPartDefinition | definitions.ReExportPartDefinition, structure: structures.NamedImportStructureTypes) {
        const namedImportWithDefinition = structure as structures.NamedImportStructureWithDefinition;
        const namedImportWithDefinitions = structure as structures.NamedImportStructureWithDefinitions;
        const namedImportWithName = structure as structures.NamedImportStructureWithName;

        if (namedImportWithDefinition.definition != null) {
            def.definitions.push(namedImportWithDefinition.definition);
        }
        else if (namedImportWithDefinitions.definitions != null) {
            def.definitions.push(...namedImportWithDefinitions.definitions);
        }
        else {
            def.definitions.push({
                name: namedImportWithName.name
            } as definitions.ClassDefinition); // this is a bit of a hack
        }

        def.expression = null;
    }
}
