import {ReturnTypedTestStructure} from "./../../testStructures";
import {ReturnTypedDefinition} from "./../../../../definitions";
import {runTypeDefinitionTests} from "./../expression";

export function runReturnTypedDefinitionTests(definition: ReturnTypedDefinition, structure: ReturnTypedTestStructure) {
    describe("return type", () => {
        structure.returnType = structure.returnType || { text: "void" };

        runTypeDefinitionTests(definition.returnType, structure.returnType);
    });
}
