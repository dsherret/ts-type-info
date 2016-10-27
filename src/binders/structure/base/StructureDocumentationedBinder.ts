import {DocumentationedStructure} from "./../../../structures";
import {DocumentationedBinder} from "./../../base";

export class StructureDocumentationedBinder extends DocumentationedBinder {
    constructor(private readonly structure: DocumentationedStructure) {
        super();
    }

    getDocumentationComment() {
        return this.structure.documentationComment || "";
    }
}
