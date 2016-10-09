import {NodeDefinitions} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {tryGet, Logger} from "./../../../utils";
import {TsNode} from "./../../../compiler";
import {ModuledBinder} from "./../../base";

export class TsModuledBinder extends ModuledBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getMembers() {
        const members: NodeDefinitions[] = [];
        // because there can be multiple function signatures, the last one needs to be used
        let currentFunction: { name: string; nodes: TsNode[]; } | undefined;

        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (currentFunction != null && (!childNode.isFunction() || childNode.getName() !== currentFunction.name)) {
                    members.push(this.factory.getFunctionDefinitionByNodes(currentFunction.nodes)!);
                    currentFunction = undefined;
                }

                if (childNode.isFunction()) {
                    if (currentFunction == null)
                        currentFunction = { name: childNode.getName(), nodes: [childNode] };
                    else
                        currentFunction.nodes.push(childNode);
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

        if (currentFunction != null) {
            tryGet(currentFunction.nodes[currentFunction.nodes.length - 1], () => {
                members.push(this.factory.getFunctionDefinitionByNodes(currentFunction!.nodes)!);
            });
        }

        return members;
    }
}
