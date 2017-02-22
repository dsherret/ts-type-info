import * as path from "path";
import * as fs from "fs";
import {getInfoFromFiles, GlobalDefinition, ModuledDefinition, Options, BaseExpressionDefinition} from "./../main";

export function generateDefinitionFile() {
    const result = getInfoFromFiles([
        path.join(__dirname, "../../src/main.ts")
    ], {
        showDebugMessages: false,
        tsConfigFilePath: path.join(__dirname, "../../tsconfig.json")
    });
    const fileInfo = result.getFile("main.ts")!;

    removeInternalProperties(result);
    fixSetType(result);

    const definitionFileText = fileInfo.writeExportsAsDefinitionFile({
        imports: [{
            defaultImportName: "CodeBlockWriter",
            moduleSpecifier: "code-block-writer"
        }, {
            starImportName: "ts",
            moduleSpecifier: "typescript"
        }]
    });

    fs.writeFile(path.join(__dirname, "../../ts-type-info.d.ts"), definitionFileText);
}

function removeInternalProperties(result: GlobalDefinition) {
    const baseDefClass = result.getFile("BaseDefinition.ts")!.getClass("BaseDefinition")!;
    baseDefClass.properties = baseDefClass.properties.filter(p => p.name !== "___uniqueID");

    const moduledDefinition = result.getFile(`${nameof(ModuledDefinition)}.ts`)!.getClass(nameof(ModuledDefinition))!;
    moduledDefinition.staticMethods = moduledDefinition.staticMethods.filter(p => p.name !== nameof(ModuledDefinition.initialize));

    const optionsInterface = result.getFile("options.ts")!.getInterface(nameof<Options>())!;
    optionsInterface.properties = optionsInterface.properties.filter(p => p.name !== nameof<Options>(o => o.getTypesFromTypeNodes));

    const baseExpressionDefinition = result.getFile("BaseExpressionDefinition.ts")!.getInterface(nameof(BaseExpressionDefinition))!;
    baseExpressionDefinition.properties = baseExpressionDefinition.properties.filter(p => p.name !== nameof<BaseExpressionDefinition>(t => t._text));
}

function fixSetType(result: GlobalDefinition) {
    result.files.forEach(f => {
        f.classes.forEach(c => {
            if (c.properties.some(p => p.name === "setType")) {
                c.properties = c.properties.filter(p => p.name !== "setType");
                c.addMethod({
                    name: "setType",
                    returnType: "this",
                    overloadSignatures: [{
                        parameters: [
                            { name: "definition", type: "NamedDefinition" },
                            { name: "typeArguments", type: "string[]", isOptional: true }
                        ],
                        returnType: "this"
                    }, {
                        parameters: [{ name: "text", type: "string" }],
                        returnType: "this"
                    }]
                });
            }
        });
    });
}
