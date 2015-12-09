import {ClassMethod} from "./../structures";
import {ClassMethodDefinition} from "./../../../definitions/class/class-method-definition";
import {runNamedDefinitionTests} from "./../base/run-named-definition-tests";
import {runReturnTypedDefinitionTests} from "./../function/run-return-typed-definition-tests";
import {runParameteredDefinitionTests} from "./../function/run-parametered-definition-tests";

export function runStaticMethodDefinitionTests(definition: ClassMethodDefinition, method: ClassMethod) {
    if (definition == null) {
        throw "Definition should not be null.";
    }

    describe(`static method ${method.name}`, () => {
        runNamedDefinitionTests(definition, method.name);
        runReturnTypedDefinitionTests(definition, method.returnType);
        runParameteredDefinitionTests(definition, method.parameters);
    });
}
