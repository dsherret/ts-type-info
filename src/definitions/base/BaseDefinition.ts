import CodeBlockWriter from "code-block-writer";
import {ExportableDefinitions, ExportableDefinition} from "./../../definitions";
import {ClassDefinition, ClassMethodDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition,
        ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./../class";
import {InterfaceDefinition, InterfaceMethodDefinition, InterfacePropertyDefinition} from "./../interface";
import {FileDefinition, ImportDefinition, ReExportDefinition, ImportPartDefinition, ReExportPartDefinition} from "./../File";
import {ExpressionDefinition, TypeDefinition} from "./../expression";
import {FunctionDefinition} from "./../function";
import {NamespaceDefinition} from "./../namespace";
import {EnumDefinition} from "./../enum";
import {CallSignatureDefinition, TypeAliasDefinition} from "./../general";
import {VariableDefinition} from "./../variable";
import {DefinitionType} from "./DefinitionType";

export abstract class BaseDefinition {
    private static _uniqueID = 0;
    __uniqueID: number;

    constructor(private _definitionType: DefinitionType) {
        const mixins = (this.constructor as any)["mixins"] as any[] || [];
        mixins.forEach(mixin => {
            mixin.call(this);
        });

        Object.defineProperty(this, "__uniqueID", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: ++BaseDefinition._uniqueID
        });
    }

    onBeforeWrite: (writer: CodeBlockWriter) => void;
    onAfterWrite: (writer: CodeBlockWriter) => void;

    isCallSignatureDefinition(): this is CallSignatureDefinition {
        return this._definitionType === DefinitionType.CallSignature;
    }

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

    isExpressionDefinition(): this is ExpressionDefinition {
        return this._definitionType === DefinitionType.Expression;
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

    isImportPartDefinition(): this is ImportPartDefinition {
        return this._definitionType === DefinitionType.ImportPart;
    }

    isInterfaceDefinition(): this is InterfaceDefinition {
        return this._definitionType === DefinitionType.Interface;
    }

    isInterfaceMethodDefinition(): this is InterfaceMethodDefinition {
        return this._definitionType === DefinitionType.InterfaceMethod;
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

    isReExportPartDefinition(): this is ReExportPartDefinition {
        return this._definitionType === DefinitionType.ReExportPart;
    }

    isTypeDefinition(): this is TypeDefinition {
        return this._definitionType === DefinitionType.Type;
    }

    isTypeAliasDefinition(): this is TypeAliasDefinition {
        return this._definitionType === DefinitionType.TypeAlias;
    }

    isVariableDefinition(): this is VariableDefinition {
        return this._definitionType === DefinitionType.Variable;
    }
}
