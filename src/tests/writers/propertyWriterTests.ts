import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {PropertyWriter} from "./../../writers";
import {PropertyDefinitions} from "./../../definitions";
import {getInfoFromString} from "./../../main";
import {WriteFlags} from "./../../WriteFlags";

function getPropertyAsString(prop: PropertyDefinitions) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new PropertyWriter(codeBlockWriter);

    writer.write(prop, WriteFlags.Default);

    return codeBlockWriter.toString();
}

describe("PropertyWriter", () => {
    const code = `
class MyClass {
    nonOptionalString = "text";
    optionalNumber?: number;
    protected protectedString: string;
    private privateString: string;
}
`;
    const myClass = getInfoFromString(code).classes[0];

    describe("write()", () => {
        describe("nonOptionalString", () => {
            it("should contain the property written out with the default expression", () => {
                assert.equal(getPropertyAsString(myClass.properties[0]), `nonOptionalString = "text";\n`);
            });
        });

        describe("optionalNumber", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[1]), "optionalNumber?: number;\n");
            });
        });

        describe("protectedString", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[2]), "protected protectedString: string;\n");
            });
        });

        describe("privateString", () => {
            it("should contain the property written out", () => {
                assert.equal(getPropertyAsString(myClass.properties[3]), "private privateString: string;\n");
            });
        });
    });
});
