import * as typeConstants from "./../../typeConstants";
import {MainFactory} from "./../../factories";
import {NamedImportPartStructure} from "./../../structures";
import {DefinitionUtils, applyMixins} from "./../../utils";
import {WriteOptions} from "./../../WriteOptions";
import {BaseDefinition, NodedDefinition} from "./../base";
import {DefaultImportPartDefinition} from "./DefaultImportPartDefinition";
import {StarImportPartDefinition} from "./StarImportPartDefinition";
import {NamedImportPartDefinition} from "./NamedImportPartDefinition";

export class ImportDefinition extends BaseDefinition implements NodedDefinition {
    fileName: string;
    moduleSpecifier: string;
    starImportName: string | null;
    defaultImport: DefaultImportPartDefinition | null;
    namedImports: NamedImportPartDefinition[] = [];
    starImports: StarImportPartDefinition[] = [];

    addNamedImport(structure: NamedImportPartStructure) {
        const def = new MainFactory().createStructureFactory().getNamedImportPart(structure);
        this.namedImports.push(def);
        return def;
    }

    getNamedImport(searchFunction: (importPart: NamedImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.namedImports, searchFunction);
    }

    getStarImport(searchFunction: (importPart: StarImportPartDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.starImports, searchFunction);
    }

    setDefaultImport(importName: string) {
        const factory = new MainFactory().createStructureFactory();
        this.defaultImport = factory.getDefaultImportPartByName(importName);
        return this;
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const importWriter = MainFactory.createWriteFactory(writer).getImportWriter();
        importWriter.write(this);
        return writer.toString();
    }

    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
}

applyMixins(ImportDefinition, BaseDefinition, [NodedDefinition]);
