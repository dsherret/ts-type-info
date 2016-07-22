import {BaseDefinition, ModuledDefinition} from "./../../definitions";
import {renameDefinitionInText} from "./renameDefinitionInText";
import {StringHashSet} from "./../StringHashSet";
import {RenameInfo} from "./RenameInfo";

export class ModuleBodyRenamer {
    private lookedAtObjectsByName = new StringHashSet();

    // todo: mark as private in TS 2.0
    constructor(private renameInfo: RenameInfo, private moduleDef: ModuledDefinition) {
    }

    static renameInModule(renameInfo: RenameInfo, moduleDef: ModuledDefinition) {
        new ModuleBodyRenamer(renameInfo, moduleDef).rename();
    }

    rename() {
        this.iterateObj(this.moduleDef);
    }

    private iterateObj(obj: any) {
        const def = obj as BaseDefinition;

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

    private handleObject(def: BaseDefinition) {
        this.lookedAtObjectsByName.add(def.__uniqueID.toString());

        Object.keys(def).forEach(key => {
            const isNamespacesProperty = (def.isNamespaceDefinition() || def.isFileDefinition()) && key === "namespaces";

            if (!isNamespacesProperty) {
                this.iterateObj((def as any)[key]);
            }
        });

        if (def.isTypeDefinition() || def.isExpressionDefinition()) {
            def.text = renameDefinitionInText(def.text, this.renameInfo.fullNameFrom, this.renameInfo.fullNameTo);
        }
    }
}
