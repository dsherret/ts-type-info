import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ParameterDefinitions, ClassMethodParameterDefinition, ClassConstructorParameterDefinition, TypeFunctionParameterDefinition,
    InterfaceMethodParameterDefinition, FunctionParameterDefinition, ClassConstructorParameterScope, CallSignatureParameterDefinition} from "./../../definitions";
import {ParameterWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(ParameterWriter), () => {
    function createObjects(def: ParameterDefinitions) {
        const writer = new CodeBlockWriter();
        const defWriter = new ParameterWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDecoratorsWriter(writer, [def as ClassMethodParameterDefinition]),
            mocks.getTypeWithDefaultExpressionWriter(writer, [def]),
            mocks.getClassConstructorParameterScopeWriter(writer, [(def as ClassConstructorParameterDefinition).scope]));
        return {writer, defWriter};
    }

    describe(nameof<ParameterWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out the parameter", () => {
            const def = new ClassMethodParameterDefinition();
            def.name = "Name";
            def.setType("string");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}{decorators:0:space}Name{type-with-default:0:any}${suffix}`);
        });

        it("should write out rest parameter", () => {
            const def = new ClassMethodParameterDefinition();
            def.name = "Name";
            def.setType("string");
            def.isRestParameter = true;
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}...Name{type-with-default:0:any[]}${suffix}`);
        });

        it("should write out optional when optional", () => {
            const def = new ClassMethodParameterDefinition();
            def.name = "Name";
            def.isOptional = true;
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}{decorators:0:space}Name?{type-with-default:0:any}${suffix}`);
        });

        it("should not write out optional when optional and is a rest parameter", () => {
            const def = new ClassMethodParameterDefinition();
            def.name = "Name";
            def.isRestParameter = true;
            def.isOptional = true;
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}...Name{type-with-default:0:any[]}${suffix}`);
        });

        it("should not write out optional when there is a default expression", () => {
            const def = new ClassMethodParameterDefinition();
            def.name = "Name";
            def.isOptional = true;
            def.setDefaultExpression("3");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}{decorators:0:space}Name{type-with-default:0:any}${suffix}`);
        });

        it("should write out optional when there is a default expression, but the write flags have hide expressions", () => {
            const def = new ClassMethodParameterDefinition();
            def.name = "Name";
            def.isOptional = true;
            def.setDefaultExpression("3");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.HideExpressions);
            expect(writer.toString()).to.equal(`${prefix}{decorators:1:space}Name?{type-with-default:1:any}${suffix}`);
        });

        it("should write out readonly and scope for class constructor parameters", () => {
            const def = new ClassConstructorParameterDefinition();
            def.name = "Name";
            def.isReadonly = true;
            def.scope = ClassConstructorParameterScope.Private;
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}{decorators:0:space}{class-constructor-parameter-scope}readonly Name{type-with-default:0:any}${suffix}`);
        });

        it(`should not write scope for class constructor parameters when ${WriteFlags.HideScopeOnParameters} is set`, () => {
            const def = new ClassConstructorParameterDefinition();
            def.name = "Name";
            def.scope = ClassConstructorParameterScope.Private;
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.HideScopeOnParameters);
            expect(writer.toString()).to.equal(`${prefix}{decorators:16:space}Name{type-with-default:16:any}${suffix}`);
        });

        it("should write interface method parameters", () => {
            const def = new InterfaceMethodParameterDefinition();
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}Name{type-with-default:0:any}${suffix}`);
        });

        it("should write function parameters", () => {
            const def = new FunctionParameterDefinition();
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}Name{type-with-default:0:any}${suffix}`);
        });

        it("should write call signature parameters", () => {
            const def = new CallSignatureParameterDefinition();
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}Name{type-with-default:0:any}${suffix}`);
        });

        it("should write type function parameters", () => {
            const def = new TypeFunctionParameterDefinition();
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}Name{type-with-default:0:any}${suffix}`);
        });
    });
});
