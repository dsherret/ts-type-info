import * as assert from "assert";
import * as definitions from "./../../../definitions";

describe("BaseDefinition", () => {
    describe("#isFileDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.FileDefinition().isFileDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.ImportDefinition().isFileDefinition(), false);
        });
    });

    describe("#isImportDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ImportDefinition().isImportDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isImportDefinition(), false);
        });
    });

    describe("#isReExportDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ReExportDefinition().isReExportDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isReExportDefinition(), false);
        });
    });

    describe("#isNamedImportPartDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.NamedImportPartDefinition().isNamedImportPartDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isNamedImportPartDefinition(), false);
        });
    });

    describe("#isStarImportPartDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.StarImportPartDefinition().isStarImportPartDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isStarImportPartDefinition(), false);
        });
    });

    describe("#isDefaultImportPartDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.DefaultImportPartDefinition().isDefaultImportPartDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isDefaultImportPartDefinition(), false);
        });
    });

    describe("#isClassDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassDefinition().isClassDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassDefinition(), false);
        });
    });

    describe("#isClassConstructorDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassConstructorDefinition().isClassConstructorDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassConstructorDefinition(), false);
        });
    });

    describe("#isClassConstructorParameterDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassConstructorParameterDefinition().isClassConstructorParameterDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassConstructorParameterDefinition(), false);
        });
    });

    describe("#isClassMethodDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassMethodDefinition().isClassMethodDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassMethodDefinition(), false);
        });
    });

    describe("#isClassMethodParameterDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassMethodParameterDefinition().isClassMethodParameterDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassMethodParameterDefinition(), false);
        });
    });

    describe("#isClassStaticMethodDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassStaticMethodDefinition().isClassStaticMethodDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassStaticMethodDefinition(), false);
        });
    });

    describe("#isClassPropertyDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassPropertyDefinition().isClassPropertyDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassPropertyDefinition(), false);
        });
    });

    describe("#isClassStaticPropertyDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ClassStaticPropertyDefinition().isClassStaticPropertyDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isClassStaticPropertyDefinition(), false);
        });
    });

    describe("#isInterfaceDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.InterfaceDefinition().isInterfaceDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isInterfaceDefinition(), false);
        });
    });

    describe("#isInterfaceMethodDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.InterfaceMethodDefinition().isInterfaceMethodDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isInterfaceMethodDefinition(), false);
        });
    });

    describe("#isInterfaceMethodParameterDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.InterfaceMethodParameterDefinition().isInterfaceMethodParameterDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isInterfaceMethodParameterDefinition(), false);
        });
    });

    describe("#isInterfacePropertyDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.InterfacePropertyDefinition().isInterfacePropertyDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isInterfacePropertyDefinition(), false);
        });
    });

    describe("#isNamespaceDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.NamespaceDefinition().isNamespaceDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isNamespaceDefinition(), false);
        });
    });

    describe("#isFunctionDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.FunctionDefinition().isFunctionDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isFunctionDefinition(), false);
        });
    });

    describe("#isFunctionParameterDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.FunctionParameterDefinition().isFunctionParameterDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isFunctionParameterDefinition(), false);
        });
    });

    describe("#isVariableDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.VariableDefinition().isVariableDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isVariableDefinition(), false);
        });
    });

    describe("#isEnumDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.EnumDefinition().isEnumDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isEnumDefinition(), false);
        });
    });

    describe("#isEnumMemberDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.EnumMemberDefinition().isEnumMemberDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isEnumMemberDefinition(), false);
        });
    });

    describe("#isCallSignatureDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.CallSignatureDefinition().isCallSignatureDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isCallSignatureDefinition(), false);
        });
    });

    describe("#isCallSignatureParameterDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.CallSignatureParameterDefinition().isCallSignatureParameterDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isCallSignatureParameterDefinition(), false);
        });
    });

    describe("#isDecoratorDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.DecoratorDefinition().isDecoratorDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isDecoratorDefinition(), false);
        });
    });

    describe("#isTypeAliasDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.TypeAliasDefinition().isTypeAliasDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isTypeAliasDefinition(), false);
        });
    });

    describe("#isTypeParameterDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.TypeParameterDefinition().isTypeParameterDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isTypeParameterDefinition(), false);
        });
    });

    describe("#isTypePropertyDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.TypePropertyDefinition().isTypePropertyDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isTypePropertyDefinition(), false);
        });
    });

    describe("#isExpressionDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ExpressionDefinition().isExpressionDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isExpressionDefinition(), false);
        });
    });

    describe("#isIndexSignatureDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.IndexSignatureDefinition().isIndexSignatureDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isIndexSignatureDefinition(), false);
        });
    });

    describe("#isUserDefinedTypeGuardDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.UserDefinedTypeGuardDefinition().isUserDefinedTypeGuardDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isUserDefinedTypeGuardDefinition(), false);
        });
    });

    describe("#isObjectPropertyDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.ObjectPropertyDefinition().isObjectPropertyDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isObjectPropertyDefinition(), false);
        });
    });

    describe("#isTypeNodeDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.TypeNodeDefinition().isTypeNodeDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isTypeNodeDefinition(), false);
        });
    });

    describe("#isTypeDefinition()", () => {
        it("should return true for the same type", () => {
            assert.equal(new definitions.TypeDefinition().isTypeDefinition(), true);
        });

        it("should return false for a different type", () => {
            assert.equal(new definitions.FileDefinition().isTypeDefinition(), false);
        });
    });
});
