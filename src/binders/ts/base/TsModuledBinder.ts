import {NodeDefinitions} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {tryGet, Logger} from "./../../../utils";
import {TsNode} from "./../../../compiler";
import {ModuledBinder} from "./../../base";

export class TsModuledBinder extends ModuledBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super();
    }

    getMembers() {
        const members: NodeDefinitions[] = [];
        // because there can be multiple function signatures, the last one needs to be used
        const functions: { [name: string]: TsNode } = {};

        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (childNode.isFunction()) {
                    functions[childNode.getName()] = childNode;
                    return;
                }

                const def = this.factory.getDefinitionByNode(childNode);

                if (def == null) {
                    const symbol = this.node.getSymbol();
                    const isKnownTypeToIgnore = (symbol != null && symbol.isDefaultExport()) ||
                        childNode.isExportDeclaration() ||
                        childNode.isExportAssignment() ||
                        childNode.isImport();

                    if (!isKnownTypeToIgnore) {
                        Logger.warn(`Node is not handled for: ${childNode.getName()}`);
                    }
                }
                else {
                    members.push(def);
                }
            });
        });

        Object.keys(functions).forEach(name => {
            const childNode = functions[name];
            tryGet(childNode, () => {
                members.push(this.factory.getDefinitionByNode(childNode));
            });
        });

        return members;
    }
}
