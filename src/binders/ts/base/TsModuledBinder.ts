import {NodeDefinitions} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {tryGet, Logger} from "./../../../utils";
import {TsNode} from "./../../../wrappers";
import {ModuledBinder} from "./../../base";

export class TsModuledBinder extends ModuledBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super();
    }

    getMembers() {
        return this.node.getChildren()
            .map(node => tryGet(node, () => this.getMemberDefinition(node)))
            .filter(n => n != null);
    }

    private getMemberDefinition(childNode: TsNode): NodeDefinitions {
        const def = this.mainFactory.getDefinitionByNode(this.node);

        if (def == null) {
            const symbol = this.node.getSymbol();
            const isKnownTypeToIgnore = (symbol != null && symbol.isDefaultExport()) || this.node.isExportDeclaration() || this.node.isExportAssignment() || this.node.isImport();

            if (!isKnownTypeToIgnore) {
                Logger.warn(`Node is not handled for: ${this.node.getName()}`);
            }
        }

        return def;
    }
}
