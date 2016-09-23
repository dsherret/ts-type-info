import {ReturnTypedTestStructure} from "./../../testStructures";
import {ReturnTypedDefinition} from "./../../../../definitions";
import {runTypeNodeDefinitionTests} from "./../expression";

export function runReturnTypedDefinitionTests(definition: ReturnTypedDefinition, structure: ReturnTypedTestStructure) {
    describe("return type", () => {
        structure.returnType = structure.returnType || { text: "void" };

        runTypeNodeDefinitionTests(definition.returnType, structure.returnType);
    });
}
