import {BaseDefinition, FileDefinition, ModuleMemberDefinitions} from "./../definitions";
import {renameDefinitionInText} from "./renameDefinitionInText";

export class DefinitionRenamer {
    private lookedAtObjects: { [uniqueID: string]: boolean; } = {};
    private newName: string;

    constructor(private files: FileDefinition[], private definition: ModuleMemberDefinitions) {
    }

    renameAs(newName: string) {
        this.newName = newName;

        this.files.forEach(file => {
            this.iterateObj(file);
        });

        this.definition.name = newName;
        this.lookedAtObjects = {};
    }

    private iterateObj(obj: any) {
        const def = obj as BaseDefinition;

        if (obj instanceof Array) {
            this.handleArray(obj);
        }
        else if (def != null && typeof def === "object" && typeof def.__uniqueID === "number" && this.lookedAtObjects[def.__uniqueID] !== true) {
            this.handleObject(def);
        }
    }

    private handleArray(obj: any[]) {
        obj.forEach(item => this.iterateObj(item));
    }

    private handleObject(def: BaseDefinition) {
        this.lookedAtObjects[def.__uniqueID] = true;

        Object.keys(def).forEach(key => {
            this.iterateObj((def as any)[key]);
        });

        if (def.isTypeDefinition() || def.isExpressionDefinition()) {
            def.text = renameDefinitionInText(def.text, this.definition.name, this.newName);
        }
    }
}
