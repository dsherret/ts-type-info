import {OverloadSignaturedDefinition, ParameteredDefinition, ReturnTypedDefinition, BaseParameterDefinition} from "./../../../definitions";
import {BaseParameterStructure} from "./../../../structures";

export function overloadsToImplementationSignature(def: OverloadSignaturedDefinition & ParameteredDefinition<BaseParameterDefinition, BaseParameterStructure> & ReturnTypedDefinition) {
    def.parameters.length = 0;
    const maxParamsCount = Math.max(...def.overloadSignatures.map(s => s.parameters.length));

    for (let i = 0; i < maxParamsCount; i++) {
        const params = def.overloadSignatures.map(s => s.parameters[i]).filter(p => p != null);
        const allHaveSameName = params.every(p => p.name === params[0].name);
        const allSignaturesHaveParam = params.length === def.overloadSignatures.length;
        const paramDef = def.addParameter({
            name: allHaveSameName ? params[0].name! : `param${i + 1}`,
            isOptional: !allSignaturesHaveParam || params.some(p => p.isOptional)
        });
        paramDef.type = params[0].type.clone();
        params.forEach((p, i) => {
            if (i === 0)
                return;

            paramDef.type.addUnionType(p.type.clone());
        });
    }

    // set method return type
    def.returnType = def.overloadSignatures[0].returnType.clone();
    def.overloadSignatures.forEach((s, i) => {
        if (i === 0)
            return;

        def.returnType.addUnionType(s.returnType.clone());
    });
}
