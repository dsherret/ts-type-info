import {NodeDefinitions} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {tryGet, Logger} from "./../../../utils";
import {TsNode} from "./../../../compiler";
import {ModuledBinder} from "./../../base";

export class TsModuledBinder extends ModuledBinder {
    constructor(private tsFactory: TsFactory, private node: TsNode) {
        super();
    }

    getMembers() {
        return this.node.getChildren()
            .map(childNode => tryGet(childNode, () => this.getMemberDefinition(childNode)))
            .filter(n => n != null);
    }

    private getMemberDefinition(childNode: TsNode): NodeDefinitions {
        const def = this.tsFactory.getDefinitionByNode(childNode);

        if (def == null) {
            const symbol = this.node.getSymbol();
            const isKnownTypeToIgnore = (symbol != null && symbol.isDefaultExport()) || childNode.isExportDeclaration() || childNode.isExportAssignment() || childNode.isImport();

            if (!isKnownTypeToIgnore) {
                Logger.warn(`Node is not handled for: ${childNode.getName()}`);
            }
        }

        return def;
    }
}
