import CodeBlockWriter from "code-block-writer";
import {ExportableDefinitions, ExportableDefinition} from "./../../definitions";
import {ClassDefinition, ClassMethodDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition,
        ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./../class";
import {InterfaceDefinition, InterfaceMethodDefinition, InterfacePropertyDefinition, InterfaceNewSignatureDefinition} from "./../interface";
import {FileDefinition, ImportDefinition, ReExportDefinition} from "./../File";
import {FunctionDefinition} from "./../function";
import {NamespaceDefinition} from "./../namespace";
import {EnumDefinition} from "./../enum";
import {TypeAliasDefinition} from "./../general";
import {VariableDefinition} from "./../variable";
import {DefinitionType} from "./DefinitionType";

export abstract class BaseDefinition {
    constructor(private _definitionType: DefinitionType) {
    }

    onBeforeWrite: (writer: CodeBlockWriter) => void;
    onAfterWrite: (writer: CodeBlockWriter) => void;

    isClassDefinition(): this is ClassDefinition {
        return this._definitionType === DefinitionType.Class;
    }

    isClassMethodDefinition(): this is ClassMethodDefinition {
        return this._definitionType === DefinitionType.ClassMethod;
    }

    isClassPropertyDefinition(): this is ClassPropertyDefinition {
        return this._definitionType === DefinitionType.ClassProperty;
    }

    isClassStaticMethodDefinition(): this is ClassStaticMethodDefinition {
        return this._definitionType === DefinitionType.ClassStaticMethod;
    }

    isClassStaticPropertyDefinition(): this is ClassStaticPropertyDefinition {
        return this._definitionType === DefinitionType.ClassStaticProperty;
    }

    isClassConstructorDefinition(): this is ClassConstructorDefinition {
        return this._definitionType === DefinitionType.ClassConstructor;
    }

    isClassConstructorParameterDefinition(): this is ClassConstructorParameterDefinition {
        return this._definitionType === DefinitionType.ClassConstructorParameter;
    }

    isEnumDefinition(): this is EnumDefinition {
        return this._definitionType === DefinitionType.Enum;
    }

    isExportableDefinition(): this is ExportableDefinitions {
        return typeof (this as any as ExportableDefinition).isExported === "boolean";
    }

    isFunctionDefinition(): this is FunctionDefinition {
        return this._definitionType === DefinitionType.Function;
    }

    isFileDefinition(): this is FileDefinition {
        return this._definitionType === DefinitionType.File;
    }

    isImportDefinition(): this is ImportDefinition {
        return this._definitionType === DefinitionType.Import;
    }

    isInterfaceDefinition(): this is InterfaceDefinition {
        return this._definitionType === DefinitionType.Interface;
    }

    isInterfaceMethodDefinition(): this is InterfaceMethodDefinition {
        return this._definitionType === DefinitionType.InterfaceMethod;
    }

    isInterfaceNewSignatureDefinition(): this is InterfaceNewSignatureDefinition {
        return this._definitionType === DefinitionType.InterfaceNewSignature;
    }

    isInterfacePropertyDefinition(): this is InterfacePropertyDefinition {
        return this._definitionType === DefinitionType.InterfaceProperty;
    }

    isNamespaceDefinition(): this is NamespaceDefinition {
        return this._definitionType === DefinitionType.Namespace;
    }

    isReExportDefinition(): this is ReExportDefinition {
        return this._definitionType === DefinitionType.ReExport;
    }

    isTypeAliasDefinition(): this is TypeAliasDefinition {
        return this._definitionType === DefinitionType.TypeAlias;
    }

    isVariableDefinition(): this is VariableDefinition {
        return this._definitionType === DefinitionType.Variable;
    }
}
