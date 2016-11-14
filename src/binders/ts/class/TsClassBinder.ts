import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {ClassBinder, ClassMemberContainer} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinderByNode, TsExportableBinder, TsAmbientableBinder, TsAbstractableBinder, TsTypeParameteredBinderByNode,
    TsDecoratableBinder, TsNodedBinder, TsDocumentationedBinder} from "./../base";

export class TsClassBinder extends ClassBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsAbstractableBinder(node),
            new TsDecoratableBinder(factory, node),
            new TsNodedBinder(factory, node),
            new TsDocumentationedBinder(node)
        );
    }

    getExtendsTypes() {
        // todo: not the most efficient thing to loop through all the children each time
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageTypeNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(typeNode => this.factory.getTypeFromTypeNode(typeNode));
    }

    getImplementsTypes() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasImplementsKeyword())
            .map(node => node.getHeritageTypeNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(typeNode => this.factory.getTypeFromTypeNode(typeNode));
    }

    getMembers() {
        const container = new ClassMemberContainer();
        const constructors: TsNode[] = [];
        // because there can be multiple method signatures, the last one needs to be used
        const methods: { [nameKey: string]: TsNode[]; } = {};
        const staticMethods: { [nameKey: string]: TsNode[]; } = {};
        // because there can be set and get accessor nodes
        const properties: { [nameKey: string]: TsNode[]; } = {};

        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (childNode.isMethodDeclaration()) {
                    const key = childNode.getNameKey();
                    if (childNode.hasStaticKeyword()) {
                        if (typeof staticMethods[key] === "undefined")
                            staticMethods[key] = [];
                        staticMethods[key].push(childNode);
                    }
                    else {
                        if (typeof methods[key] === "undefined")
                            methods[key] = [];
                        methods[key].push(childNode);
                    }
                }
                else if (childNode.isPropertyDeclaration() || childNode.isGetAccessor() || childNode.isSetAccessor()) {
                    if (childNode.hasStaticKeyword()) {
                        container.staticProperties.push(this.factory.getClassStaticProperty(childNode));
                    }
                    else {
                        const key = childNode.getNameKey();
                        if (typeof properties[key] === "undefined")
                            properties[key] = [];
                        properties[key].push(childNode);
                    }
                }
                else if (childNode.isConstructor()) {
                    constructors.push(childNode);
                }
                else if (childNode.isSetAccessor()) {
                    // ignore, GetAccessor is the one that will be handled
                }
                else if (childNode.isIdentifier()) {
                    // ignore, it's the class identifier
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
                else if (childNode.isAbstractKeyword()) {
                    // ignore, handled elsewhere
                }
                else {
                    Logger.warn(`Unknown class child kind: ${childNode.nodeKindToString()}`);
                }
            });
        });

        if (constructors.length > 0) {
            tryGet(constructors[constructors.length - 1], () => {
                container.constructorDef = this.factory.getClassConstructor(constructors);
            });
        }

        Object.keys(methods).forEach(nameKey => {
            const childNodes = methods[nameKey];
            tryGet(childNodes[childNodes.length - 1], () => {
                container.methods.push(this.factory.getClassMethod(childNodes));
            });
        });

        Object.keys(staticMethods).forEach(nameKey => {
            const childNodes = staticMethods[nameKey];
            tryGet(childNodes[childNodes.length - 1], () => {
                container.staticMethods.push(this.factory.getClassStaticMethod(childNodes));
            });
        });

        Object.keys(properties).forEach(nameKey => {
            const childNodes = properties[nameKey];
            tryGet(childNodes[childNodes.length - 1], () => {
                container.properties.push(this.factory.getClassProperty(childNodes));
            });
        });

        return container;
    }
}
