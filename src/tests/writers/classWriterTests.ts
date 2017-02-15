import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ClassDefinition} from "./../../definitions";
import {createClass} from "./../../createFunctions";
import {ClassWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

// todo: tests for properties, methods and constructor

describe(nameof(ClassWriter), () => {
    function createObjects(def: ClassDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new ClassWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def]),
            mocks.getDecoratorsWriter(writer, [def]),
            mocks.getExportableWriter(writer, def),
            mocks.getAmbientableWriter(writer, def),
            mocks.getTypeParametersWriter(writer, def.typeParameters),
            mocks.getPropertyWriter(writer, [true]),
            mocks.getFunctionWriter(writer),
            mocks.getClassConstructorWriter(writer, def.constructorDef, false),
            mocks.getExtendsImplementsClauseWriter(writer),
            mocks.getFunctionBodyWriter(writer, [...def.methods, ...def.staticMethods], [true]));
        return {writer, defWriter};
    }

    describe(nameof<ClassWriter>(w => w.write), () => {
        const prefix = "{start}{doc-comment}{decorators:0:newline}{export-keyword:0}{declare-keyword}";
        const suffix = "{end}";

        it("should write out the class", () => {
            const def = createClass({
                name: "Name"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            const expected = `${prefix}class Name{type-parameters}{extends-clause:Name}{implements-clause:Name} {\n}\n${suffix}`;
            expect(writer.toString()).to.equal(expected);
        });

        it("should write out the abstract keyword when abstract", () => {
            const def = createClass({
                name: "Name",
                isAbstract: true
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            const expected = `${prefix}abstract class Name{type-parameters}{extends-clause:Name}{implements-clause:Name} {\n}\n${suffix}`;
            expect(writer.toString()).to.equal(expected);
        });
    });
});
