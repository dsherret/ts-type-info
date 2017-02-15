import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import * as definitions from "./../../definitions";
import * as writers from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";

export function getBaseDefinitionWriter(writer: CodeBlockWriter, def: definitions.BaseDefinition) {
    def.onBeforeWrite = w => w.write("{start}");
    def.onAfterWrite = w => w.write("{end}");

    return new writers.BaseDefinitionWriter(writer);
}

export function getAmbientableWriter(writer: CodeBlockWriter, def: definitions.AmbientableDefinition) {
    class Writer {
        writeDeclareKeyword(passedInDef: definitions.AmbientableDefinition) {
            expect(passedInDef).to.equal(def);
            writer.write(`{declare-keyword}`);
        }
    }

    return new Writer() as writers.AmbientableWriter;
}

export function getAsyncableWriter(writer: CodeBlockWriter, def: definitions.AsyncableDefinition) {
    class Writer {
        writeAsyncKeyword(passedInDef: definitions.AsyncableDefinition) {
            expect(passedInDef).to.equal(def);
            writer.write(`{async-keyword}`);
        }
    }

    return new Writer() as writers.AsyncableWriter;
}

export function getCallSignatureWriter(writer: CodeBlockWriter, defs: definitions.CallSignatureDefinition[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: definitions.CallSignatureDefinition, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{call-signature:${flags}}`);
        }
    }

    return new Writer() as writers.CallSignatureWriter;
}

export function getClassConstructorParameterScopeWriter(writer: CodeBlockWriter, scopes: definitions.ClassConstructorParameterScope[]) {
    scopes = [...scopes];
    class Writer {
        writeScope(passedInScope: definitions.ClassConstructorParameterScope) {
            expect(passedInScope).to.equal(scopes.shift());
            writer.write(`{class-constructor-parameter-scope}`);
        }
    }

    return new Writer() as writers.ClassConstructorParameterScopeWriter;
}

export function getClassConstructorWriter(writer: CodeBlockWriter, def: definitions.ClassConstructorDefinition | null, shouldWriteConstructor: boolean) {
    class Writer {
        write(passedInDef: definitions.ClassConstructorDefinition, flags: WriteFlags) {
            expect(passedInDef).to.equal(def);
            writer.write(`{class-constructor:${flags}}`);
        }

        shouldWriteConstructor(def: definitions.ClassConstructorDefinition, flags: WriteFlags) {
            return shouldWriteConstructor;
        }
    }

    return new Writer() as writers.ClassConstructorWriter;
}

export function getDocumentationedWriter(writer: CodeBlockWriter, defs: definitions.DocumentationedDefinition[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: definitions.DocumentationedDefinition) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{doc-comment}`);
        }
    }
    return new Writer() as writers.DocumentationedWriter;
}

export function getDecoratorWriter(writer: CodeBlockWriter) {
    class Writer {
        write(passedInDef: definitions.DecoratorDefinition, flags: WriteFlags) {
            writer.write(`{decorator:${passedInDef.name}:${flags}}`);
        }
    }

    return new Writer() as writers.DecoratorWriter;
}

export function getDecoratorsWriter(writer: CodeBlockWriter, defs: definitions.DecoratableDefinition[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: definitions.DecoratableDefinition, flags: WriteFlags, separator: string | null = null) {
            expect(passedInDef).to.equal(defs.shift());
            if (separator === " ")
                separator = "space";
            writer.write(`{decorators:${flags}:${separator || "newline"}}`);
        }
    }

    return new Writer() as writers.DecoratorsWriter;
}

export function getEnumMemberWriter(writer: CodeBlockWriter) {
    class Writer {
        write(def: definitions.EnumMemberDefinition) {
            writer.write(`{enum-member:${def.name}}`);
        }
    }

    return new Writer() as writers.EnumMemberWriter;
}

export function getExportableWriter(writer: CodeBlockWriter, def: definitions.ExportableDefinition) {
    class Writer {
        writeExportKeyword(passedInDef: definitions.ExportableDefinition, flags: WriteFlags) {
            expect(passedInDef).to.equal(def);
            writer.write(`{export-keyword:${flags}}`);
        }
    }

    return new Writer() as writers.ExportableWriter;
}

export function getExpressionWriter(writer: CodeBlockWriter, defs: (definitions.ExpressionDefinition | null)[]) {
    defs = [...defs];
    class Writer {
        writeWithEqualsSign(passedInDef: definitions.ExpressionDefinition | null) {
            expect(passedInDef).to.equal(defs.shift());
            if (passedInDef != null)
                writer.write(` = {expression:${passedInDef.text}}`);
            else
                writer.write(" = {expression}");
        }

        write(passedInDef: definitions.ExpressionDefinition | null) {
            expect(passedInDef).to.equal(defs.shift());
            if (passedInDef != null)
                writer.write(`{expression:${passedInDef.text}}`);
            else
                writer.write("{expression}");
        }
    }

    return new Writer() as writers.ExpressionWriter;
}

export function getExtendsImplementsClauseWriter(writer: CodeBlockWriter) {
    class Writer {
        writeExtends(passedInDef: definitions.ClassDefinition | definitions.InterfaceDefinition) {
            writer.write(`{extends-clause:${passedInDef.name}}`);
        }

        writeImplements(passedInDef: definitions.ClassDefinition) {
            writer.write(`{implements-clause:${passedInDef.name}}`);
        }
    }

    return new Writer() as writers.ExtendsImplementsClauseWriter;
}

export function getFunctionBodyWriter(writer: CodeBlockWriter, defs: definitions.FunctionBodyWriteableDefinition[], willWrites: boolean[]) {
    defs = [...defs];
    type NotInterfaceMethod = definitions.FunctionDefinition | definitions.ClassMethodDefinition | definitions.ClassStaticMethodDefinition |
        definitions.ClassConstructorDefinition;

    class Writer {
        willWriteFunctionBody(def: definitions.FunctionBodyWriteableDefinitions, flags: WriteFlags): def is NotInterfaceMethod {
            return willWrites.shift() || false;
        }

        write(passedInDef: definitions.FunctionBodyWriteableDefinitions, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write("{function-body};");
        }
    }

    return new Writer() as writers.FunctionBodyWriter;
}

type SupportedFunctionReturnTypeWriterTypes = definitions.FunctionDefinition | definitions.ClassMethodDefinition |
    definitions.ClassStaticMethodDefinition | definitions.InterfaceMethodDefinition;

export function getFunctionReturnTypeWriter(writer: CodeBlockWriter, defs: SupportedFunctionReturnTypeWriterTypes[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: SupportedFunctionReturnTypeWriterTypes, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write("{function-return-type}");
        }
    }

    return new Writer() as writers.FunctionReturnTypeWriter;
}

export function getFunctionWriter(writer: CodeBlockWriter) {
    class Writer {
        write(def: definitions.FunctionDefinition, flags: WriteFlags) {
            writer.write(`{function:${def.name}:${flags}}`);
        }
    }

    return new Writer() as writers.FunctionWriter;
}

export function getImportWriter(writer: CodeBlockWriter, defs: definitions.ImportDefinition[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: definitions.ImportDefinition) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{import}`);
        }
    }

    return new Writer() as writers.ImportWriter;
}

export function getIndexSignatureWriter(writer: CodeBlockWriter) {
    class Writer {
        write(passedInDef: definitions.IndexSignatureDefinition) {
            writer.write(`{index-signature:${passedInDef.keyName}}`);
        }
    }

    return new Writer() as writers.IndexSignatureWriter;
}

export function getInterfaceWriter(writer: CodeBlockWriter) {
    class Writer {
        write(passedInDef: definitions.InterfaceDefinition, flags: WriteFlags) {
            writer.write(`{interface:${passedInDef.name}:${flags}}`);
        }
    }

    return new Writer() as writers.InterfaceWriter;
}

export function getNamedImportPartWriter(writer: CodeBlockWriter, ...defs: definitions.NamedImportPartDefinition[]) {
    class Writer {
        write(passedInDef: definitions.NamedImportPartDefinition) {
            const def = defs.shift();
            expect(passedInDef).to.equal(def);
            writer.write(`{named-import-part:${def!.name}}`);
        }
    }

    return new Writer() as writers.NamedImportPartWriter;
}

export function getNamedImportPartsWriter(writer: CodeBlockWriter, defs: definitions.NamedImportPartDefinition[]) {
    class Writer {
        write(passedInDefs: definitions.NamedImportPartDefinition[]) {
            expect(passedInDefs).to.equal(defs);
            writer.write(`{named-import-parts}`);
        }
    }

    return new Writer() as writers.NamedImportPartsWriter;
}

export function getParameterWriter(writer: CodeBlockWriter, defs: (definitions.ParameterDefinitions | null)[]) {
    defs = defs.filter(d => (d as definitions.ClassMethodParameterDefinition).destructuringProperties.length === 0);
    class Writer {
        write(passedInDef: definitions.ParameterDefinitions, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{parameter:${flags}}`);
        }
    }

    return new Writer() as writers.ParameterWriter;
}

export function getParametersWriter(writer: CodeBlockWriter, defs: definitions.ParameteredDefinitions[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: definitions.ParameteredDefinition<definitions.BaseParameterDefinition, any>, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`({parameters:${flags}})`);
        }
    }

    return new Writer() as writers.ParametersWriter;
}

export function getPropertyWriter(writer: CodeBlockWriter, willWriteAccessorBodies: boolean[]) {
    class Writer {
        willWriteAccessorBody(def: definitions.PropertyDefinitions): def is definitions.ClassPropertyDefinition {
            return willWriteAccessorBodies.shift() || false;
        }

        write(passedInDef: definitions.PropertyDefinitions, flags: WriteFlags) {
            writer.write(`{property:${passedInDef.name}:${flags}}`);
        }
    }

    return new Writer() as writers.PropertyWriter;
}

export function getTypeWriter(writer: CodeBlockWriter, defs: (definitions.TypeDefinition | null)[]) {
    defs = [...defs];
    class Writer {
        writeWithColon(passedInDef: definitions.TypeDefinition | null, fallbackType: string) {
            writer.write(": ");
            this.write(passedInDef, fallbackType);
        }

        writeWithEqualsSign(passedInDef: definitions.TypeDefinition | null, fallbackType: string) {
            writer.write(" = ");
            this.write(passedInDef, fallbackType);
        }

        write(passedInDef: definitions.TypeDefinition | null, fallbackType: string) {
            writer.write("{");
            writer.write("type");
            if (passedInDef != null)
                writer.write(`:${passedInDef.text}`);
            writer.write(`:${fallbackType}`);
            writer.write("}");
        }
    }

    return new Writer() as writers.TypeWriter;
}

type typeWithDefault = definitions.TypedDefinition & definitions.DefaultExpressionedDefinition;

export function getTypeWithDefaultExpressionWriter(writer: CodeBlockWriter, defs: (typeWithDefault | null)[]) {
    defs = [...defs];
    class Writer {
        write(passedInDef: typeWithDefault, flags: WriteFlags, fallbackType: string) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{type-with-default:${flags}:${fallbackType}}`);
        }

        writeWithOptionalCheck(passedInDef: typeWithDefault & definitions.AmbientableDefinition, flags: WriteFlags, fallbackType: string) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{type-with-default-optional-check:${flags}:${fallbackType}}`);
        }
    }

    return new Writer() as any as writers.TypeWithDefaultExpressionWriter;
}

export function getParameterWithDestructuringWriter(writer: CodeBlockWriter, defs: (definitions.ParameterDefinitions | null)[]) {
    defs = defs.filter(d => (d as definitions.ClassMethodParameterDefinition).destructuringProperties.length > 0);
    class Writer {
        write(passedInDef: definitions.ParameterDefinitions, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            writer.write(`{destructuring-param:${flags}}`);
        }
    }

    return new Writer() as writers.ParameterWithDestructuringWriter;
}

export function getDefaultExpressionedWriter(writer: CodeBlockWriter, defs: (definitions.DefaultExpressionedDefinition | null)[], shouldWrites: boolean[]) {
    defs = [...defs];
    shouldWrites = [...shouldWrites];

    class Writer {
        writeWithEqualsSign(passedInDef: definitions.DefaultExpressionedDefinition, flags: WriteFlags) {
            writer.write(` = {default-expression:${flags}}`);
        }

        getShouldWriteDefaultExpression(passedInDef: definitions.DefaultExpressionedDefinition, flags: WriteFlags) {
            expect(passedInDef).to.equal(defs.shift());
            return shouldWrites.shift();
        }
    }

    return new Writer() as any as writers.DefaultExpressionedWriter;
}

export function getScopeWriter(writer: CodeBlockWriter, scopes: definitions.Scope[]) {
    scopes = [...scopes];
    class Writer {
        writeScope(passedInScope: definitions.Scope) {
            expect(passedInScope).to.equal(scopes.shift());
            writer.write(`{scope}`);
        }
    }

    return new Writer() as writers.ScopeWriter;
}

export function getTypeParameterWriter(writer: CodeBlockWriter) {
    class Writer {
        write(passedInDef: definitions.TypeParameterDefinition) {
            writer.write(`{type-parameter:${passedInDef.name}}`);
        }
    }

    return new Writer() as writers.TypeParameterWriter;
}

export function getTypeParametersWriter(writer: CodeBlockWriter, defs: definitions.TypeParameterDefinition[]) {
    defs = [...defs];
    class Writer {
        write(passedInDefs: definitions.TypeParameterDefinition[]) {
            expect(passedInDefs).to.deep.equal(defs);
            writer.write(`{type-parameters}`);
        }
    }

    return new Writer() as writers.TypeParametersWriter;
}

export function getVariableDeclarationWriter(writer: CodeBlockWriter, type: definitions.VariableDeclarationType) {
    class Writer {
        writeDeclarationType(passedInType: definitions.VariableDeclarationType) {
            expect(passedInType).to.equal(type);
            writer.write(`{var-declaration-type}`);
        }
    }

    return new Writer() as writers.VariableDeclarationTypeWriter;
}

export function getVariableWriter(writer: CodeBlockWriter) {
    class Writer {
        write(passedInDef: definitions.VariableDefinition, flags: WriteFlags) {
            writer.write(`{variable:${passedInDef.name}:${flags}}`);
        }
    }

    return new Writer() as writers.VariableWriter;
}
