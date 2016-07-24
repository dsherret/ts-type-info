﻿import {ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {NamedImportPartStructure} from "./../../../structures";
import {NamedImportPartBinder} from "./../../base";
import {StructureBaseDefinitionBinder} from "./../base";

export class StructureNamedImportPartBinder extends NamedImportPartBinder {
    constructor(private structure: NamedImportPartStructure) {
        super(new StructureBaseDefinitionBinder(structure));
    }

    getName() {
        return this.structure.name;
    }

    getAlias() {
        return this.structure.alias;
    }

    getDefinitions() {
        return [] as ExportableDefinitions[];
    }

    getExpression() {
        return null as ExpressionDefinition;
    }
}
