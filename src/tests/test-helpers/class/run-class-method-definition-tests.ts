import {ClassMethod} from "./../structures";
import {ClassMethodDefinition} from "./../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";

export function runClassMethodDefinitionTests(definition: ClassMethodDefinition, method: ClassMethod) {
    if (definition == null) {
        throw "Class method definition should not be null.";
    }

    describe(`method ${method.name}`, () => {
        runBaseClassMethodDefinitionTests(definition, method);
    });
}
