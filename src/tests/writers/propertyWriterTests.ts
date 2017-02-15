import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {PropertyDefinitions, ClassPropertyDefinition, ClassStaticPropertyDefinition, InterfacePropertyDefinition, ClassPropertyKind} from "./../../definitions";
import {PropertyWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(PropertyWriter), () => {
    function createObjects(def: PropertyDefinitions) {
        const writer = new CodeBlockWriter();
        const defWriter = new PropertyWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def, def]),
            mocks.getDecoratorsWriter(writer, [def as ClassPropertyDefinition, def as ClassPropertyDefinition]),
            mocks.getTypeWriter(writer, [def.type]),
            mocks.getScopeWriter(writer, [(def as ClassPropertyDefinition).scope]),
            mocks.getTypeWithDefaultExpressionWriter(writer, [def as ClassPropertyDefinition]));
        return {writer, defWriter};
    }

    describe(nameof<PropertyWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";
        const propertyPrefix = "{doc-comment}{decorators:0:newline}";

        describe("normal properties", () => {
            it("should write out a property", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}Name{type-with-default-optional-check:0:any};${suffix}`);
            });

            it("should write out abstract, readonly, and optional", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.isAbstract = true;
                def.isReadonly = true;
                def.isOptional = true;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}abstract readonly Name?{type-with-default-optional-check:0:any};${suffix}`);
            });

            it("should write out a static property", () => {
                const def = new ClassStaticPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}static Name{type-with-default-optional-check:0:any};${suffix}`);
            });

            it(`should write out the type for ${nameof(InterfacePropertyDefinition)}s`, () => {
                const def = new InterfacePropertyDefinition();
                def.name = "Name";
                def.setType("string");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}Name: {type:string:any};${suffix}`);
            });
        });

        describe("get accessors", () => {
            it("should write out a normal property if no get body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.GetAccessor;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}Name{type-with-default-optional-check:0:any};${suffix}`);
            });

            it("should write out a get accessor if a body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.GetAccessor;
                def.isReadonly = true; // should not write out readonly for accessors
                def.onWriteGetBody = writer => writer.write("body");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}get Name(): {type:string:any} {\n    body\n}\n${suffix}`);
            });

            it("should not write out an abstract get accessor if abstract", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.isAbstract = true;
                def.kind = ClassPropertyKind.GetAccessor;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}abstract get Name(): {type:string:any};${suffix}`);
            });
        });

        describe("set accessors", () => {
            it("should write out a normal property if no set body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.SetAccessor;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}Name{type-with-default-optional-check:0:any};${suffix}`);
            });

            it("should write out a set accessor if a body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.SetAccessor;
                def.isReadonly = true; // should not write out readonly for accessors
                def.onWriteSetBody = writer => writer.write("body");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}set Name(value: {type:string:any}) {\n    body\n}\n${suffix}`);
            });

            it("should not write out an abstract set accessor if abstract", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.isAbstract = true;
                def.kind = ClassPropertyKind.SetAccessor;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}abstract set Name(value: {type:string:any});${suffix}`);
            });
        });

        describe("get and set accessors", () => {
            it("should write out a normal property if no get or set body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.GetSetAccessor;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}${propertyPrefix}{scope}Name{type-with-default-optional-check:0:any};${suffix}`);
            });

            it("should write out the accessors if abstract", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.isAbstract = true;
                def.kind = ClassPropertyKind.GetSetAccessor;
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}${propertyPrefix}{scope}abstract get Name(): {type:string:any};\n` +
                    `{scope}abstract set Name(value: {type:string:any});${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it("should write out an accessor if only set accessor body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.GetSetAccessor;
                def.onWriteSetBody = writer => writer.write("body");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}${propertyPrefix}{scope}get Name(): {type:string:any} {\n}\n\n` +
                    `{scope}set Name(value: {type:string:any}) {\n    body\n}\n${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it("should write out an accessor if only get accessor body is set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.GetSetAccessor;
                def.onWriteGetBody = writer => writer.write("body");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}${propertyPrefix}{scope}get Name(): {type:string:any} {\n    body\n}\n\n` +
                    `{scope}set Name(value: {type:string:any}) {\n}\n${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it("should write out an accessor if both get accessor bodies are set", () => {
                const def = new ClassPropertyDefinition();
                def.name = "Name";
                def.setType("string");
                def.kind = ClassPropertyKind.GetSetAccessor;
                def.onWriteGetBody = writer => writer.write("get body");
                def.onWriteSetBody = writer => writer.write("set body");
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}${propertyPrefix}{scope}get Name(): {type:string:any} {\n    get body\n}\n\n` +
                    `{scope}set Name(value: {type:string:any}) {\n    set body\n}\n${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });
        });
    });
});
