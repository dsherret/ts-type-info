import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {InterfaceBinder, InterfaceMemberContainer} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsTypeParameteredBinderByNode} from "./../base";

export class TsInterfaceBinder extends InterfaceBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node)
        );
    }

    getExtendsTypeExpressions() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getTypeExpressionFromNode(node));
    }

    getMembers() {
        const container = new InterfaceMemberContainer();
        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (childNode.isMethodSignature()) {
                    container.methods.push(this.factory.getInterfaceMethod(childNode));
                }
                else if (childNode.isPropertySignature()) {
                    container.properties.push(this.factory.getInterfaceProperty(childNode));
                }
                else if (childNode.isConstructSignature()) {
                    container.newSignatures.push(this.factory.getCallSignature(childNode));
                }
                else if (childNode.isCallSignature()) {
                    container.callSignatures.push(this.factory.getCallSignature(childNode));
                }
                else if (childNode.isIdentifier()) {
                    // ignore, it's the interface identifier
                }
                else if (childNode.isTypeParameter()) {
                    // ignore, handled elsewhere
                }
                else if (childNode.isExportKeyword()) {
                    // ignore, handled elsewhere
                }
                else if (childNode.isDefaultKeyword()) {
                    // ignore, handled elsewhere
                }
                else if (childNode.isHeritageClause()) {
                    // ignore, handled elsewhere
                }
                else {
                    Logger.warn(`Unknown interface child kind: ${childNode.nodeKindToString()}`);
                }
            });
        });
        return container;
    }
}
