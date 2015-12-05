import {Method} from "./structures";
import {MethodDefinition} from "./../../definitions/method-definition";
import {runNamedDefinitionTests} from "./run-named-definition-tests";
import {runReturnTypedDefinitionTests} from "./run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./run-parametered-definition-tests";

export function runMethodDefinitionTests(definition: MethodDefinition, method: Method) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`method ${method.name}`, () => {
        runNamedDefinitionTests(definition, method.name);
        runReturnTypedDefinitionTests(definition, method.returnType);
        runParameteredDefinitionTests(definition, method.parameters);
    });
}
