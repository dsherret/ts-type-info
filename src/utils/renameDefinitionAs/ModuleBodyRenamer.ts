import * as definitions from "./../../definitions";
import {renameDefinitionInText} from "./renameDefinitionInText";
import {StringHashSet} from "./../StringHashSet";
import {RenameInfo} from "./RenameInfo";

export class ModuleBodyRenamer {
    private lookedAtObjectsByName = new StringHashSet();

    private constructor(private renameInfo: RenameInfo, private moduleDef: definitions.ModuledDefinition) {
    }

    static renameInModule(renameInfo: RenameInfo, moduleDef: definitions.ModuledDefinition) {
        new ModuleBodyRenamer(renameInfo, moduleDef).rename();
    }

    rename() {
        this.iterateObj(this.moduleDef);
    }

    private iterateObj(obj: any) {
        const def = obj as definitions.BaseDefinition;

        if (obj instanceof Array) {
            this.handleArray(obj);
        }
        else if (def != null && typeof def === "object" && typeof def.__uniqueID === "number" && !this.lookedAtObjectsByName.contains(def.__uniqueID.toString())) {
            this.handleObject(def);
        }
    }

    private handleArray(obj: any[]) {
        obj.forEach(item => this.iterateObj(item));
    }

    private handleObject(def: definitions.BaseDefinition) {
        this.lookedAtObjectsByName.add(def.__uniqueID.toString());

        Object.keys(def).forEach(key => {
            const isNamespacesProperty = (def instanceof definitions.NamespaceDefinition || def instanceof definitions.FileDefinition) && key === "namespaces";

            if (!isNamespacesProperty) {
                this.iterateObj((def as any)[key]);
            }
        });

        if (def instanceof definitions.TypeDefinition || def instanceof definitions.TypeNodeDefinition || def instanceof definitions.ExpressionDefinition) {
            def.text = renameDefinitionInText(def.text, this.renameInfo.fullNameFrom, this.renameInfo.fullNameTo);
        }
    }
}
