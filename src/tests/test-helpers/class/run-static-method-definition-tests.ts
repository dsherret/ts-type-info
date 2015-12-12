import {StaticMethod} from "./../structures";
import {StaticMethodDefinition} from "./../../../definitions";
import {runBaseClassMethodDefinitionTests} from "./base";

export function runStaticMethodDefinitionTests(definition: StaticMethodDefinition, method: StaticMethod) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`static method ${method.name}`, () => {
        runBaseClassMethodDefinitionTests(definition, method);
    });
}
