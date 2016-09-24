import CodeBlockWriter from "code-block-writer";
import {ExportableDefinitions, ExportableDefinition} from "./../../definitions";
import {ClassDefinition, ClassMethodDefinition, ClassMethodParameterDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition,
        ClassConstructorDefinition, ClassConstructorParameterDefinition} from "./../class";
import {InterfaceDefinition, InterfaceMethodDefinition, InterfaceMethodParameterDefinition, InterfacePropertyDefinition} from "./../interface";
import {FileDefinition, ImportDefinition, ReExportDefinition, NamedImportPartDefinition, StarImportPartDefinition, DefaultImportPartDefinition} from "./../file";
import {ExpressionDefinition, TypeDefinition, TypeNodeDefinition} from "./../expression";
import {FunctionDefinition, FunctionParameterDefinition} from "./../function";
import {NamespaceDefinition} from "./../namespace";
import {EnumDefinition, EnumMemberDefinition} from "./../enum";
import {CallSignatureDefinition, CallSignatureParameterDefinition, TypeAliasDefinition, DecoratorDefinition, TypeParameterDefinition, TypePropertyDefinition,
    UserDefinedTypeGuardDefinition, IndexSignatureDefinition, ObjectPropertyDefinition} from "./../general";
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

    onBeforeWrite: ((writer: CodeBlockWriter) => void) | null;
    onAfterWrite: ((writer: CodeBlockWriter) => void) | null;

    // IMPORTANT: The reason DefinitionType exists is because it's a workaround to avoid circular dependencies of instanceof.
    //            I'm not sure if there's a better way of doing this.

    isFileDefinition(): this is FileDefinition {
        return this._definitionType === DefinitionType.File;
    }

    isImportDefinition(): this is ImportDefinition {
        return this._definitionType === DefinitionType.Import;
    }

    isReExportDefinition(): this is ReExportDefinition {
        return this._definitionType === DefinitionType.ReExport;
    }

    isNamedImportPartDefinition(): this is NamedImportPartDefinition {
        return this._definitionType === DefinitionType.NamedImportPart;
    }

    isStarImportPartDefinition(): this is StarImportPartDefinition {
        return this._definitionType === DefinitionType.StarImportPart;
    }

    isDefaultImportPartDefinition(): this is DefaultImportPartDefinition {
        return this._definitionType === DefinitionType.DefaultImportPart;
    }

    isClassDefinition(): this is ClassDefinition {
        return this._definitionType === DefinitionType.Class;
    }

    isClassConstructorDefinition(): this is ClassConstructorDefinition {
        return this._definitionType === DefinitionType.ClassConstructor;
    }

    isClassConstructorParameterDefinition(): this is ClassConstructorParameterDefinition {
        return this._definitionType === DefinitionType.ClassConstructorParameter;
    }

    isClassMethodDefinition(): this is ClassMethodDefinition {
        return this._definitionType === DefinitionType.ClassMethod;
    }

    isClassMethodParameterDefinition(): this is ClassMethodParameterDefinition {
        return this._definitionType === DefinitionType.ClassMethodParameter;
    }

    isClassStaticMethodDefinition(): this is ClassStaticMethodDefinition {
        return this._definitionType === DefinitionType.ClassStaticMethod;
    }

    isClassPropertyDefinition(): this is ClassPropertyDefinition {
        return this._definitionType === DefinitionType.ClassProperty;
    }

    isClassStaticPropertyDefinition(): this is ClassStaticPropertyDefinition {
        return this._definitionType === DefinitionType.ClassStaticProperty;
    }

    isInterfaceDefinition(): this is InterfaceDefinition {
        return this._definitionType === DefinitionType.Interface;
    }

    isInterfaceMethodDefinition(): this is InterfaceMethodDefinition {
        return this._definitionType === DefinitionType.InterfaceMethod;
    }

    isInterfaceMethodParameterDefinition(): this is InterfaceMethodParameterDefinition {
        return this._definitionType === DefinitionType.InterfaceMethodParameter;
    }

    isInterfacePropertyDefinition(): this is InterfacePropertyDefinition {
        return this._definitionType === DefinitionType.InterfaceProperty;
    }

    isNamespaceDefinition(): this is NamespaceDefinition {
        return this._definitionType === DefinitionType.Namespace;
    }

    isFunctionDefinition(): this is FunctionDefinition {
        return this._definitionType === DefinitionType.Function;
    }

    isFunctionParameterDefinition(): this is FunctionParameterDefinition {
        return this._definitionType === DefinitionType.FunctionParameter;
    }

    isVariableDefinition(): this is VariableDefinition {
        return this._definitionType === DefinitionType.Variable;
    }

    isEnumDefinition(): this is EnumDefinition {
        return this._definitionType === DefinitionType.Enum;
    }

    isEnumMemberDefinition(): this is EnumMemberDefinition {
        return this._definitionType === DefinitionType.EnumMember;
    }

    isCallSignatureDefinition(): this is CallSignatureDefinition {
        return this._definitionType === DefinitionType.CallSignature;
    }

    isCallSignatureParameterDefinition(): this is CallSignatureParameterDefinition {
        return this._definitionType === DefinitionType.CallSignatureParameter;
    }

    isDecoratorDefinition(): this is DecoratorDefinition {
        return this._definitionType === DefinitionType.Decorator;
    }

    isTypeAliasDefinition(): this is TypeAliasDefinition {
        return this._definitionType === DefinitionType.TypeAlias;
    }

    isTypeParameterDefinition(): this is TypeParameterDefinition {
        return this._definitionType === DefinitionType.TypeParameter;
    }

    isTypePropertyDefinition(): this is TypePropertyDefinition {
        return this._definitionType === DefinitionType.TypeProperty;
    }

    isExpressionDefinition(): this is ExpressionDefinition {
        return this._definitionType === DefinitionType.Expression;
    }

    isIndexSignatureDefinition(): this is IndexSignatureDefinition {
        return this._definitionType === DefinitionType.IndexSignature;
    }

    isUserDefinedTypeGuardDefinition(): this is UserDefinedTypeGuardDefinition {
        return this._definitionType === DefinitionType.UserDefinedTypeGuard;
    }

    isObjectPropertyDefinition(): this is ObjectPropertyDefinition {
        return this._definitionType === DefinitionType.ObjectPropertyDefinition;
    }

    isTypeDefinition(): this is TypeDefinition {
        return this._definitionType === DefinitionType.Type;
    }

    isTypeNodeDefinition(): this is TypeNodeDefinition {
        return this._definitionType === DefinitionType.TypeNode;
    }

    isExportableDefinition(): this is ExportableDefinitions {
        return typeof (this as any as ExportableDefinition).isExported === "boolean";
    }
}
