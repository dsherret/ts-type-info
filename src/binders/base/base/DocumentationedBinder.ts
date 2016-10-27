import {DocumentationedDefinition} from "./../../../definitions";

export abstract class DocumentationedBinder {
    abstract getDocumentationComment(): string;

    bind(def: DocumentationedDefinition) {
        def.documentationComment = this.getDocumentationComment();
    }
}
